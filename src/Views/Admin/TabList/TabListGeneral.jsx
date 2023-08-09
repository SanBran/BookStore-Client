import {
  BarChart,
  Card,
  Col,
  Grid,
  Metric,
  TabPanel,
  Text,
  Title,
} from "@tremor/react";
import styles from '../AdminDashboar.module.css'

import { useSelector } from "react-redux";

const TabListGeneral = () => {
  const data = useSelector((state) => state.allPayments);
  const totalUser = useSelector((state) => state.totalUsers);
  const totalBook = useSelector((state) => state.booksObject);

  console.log(data);
  // Crear un objeto para almacenar las ventas por mes
  const salesByMonth = {};
  // Crear un objeto para almacenar la cantidad de libros por género
  const booksByGender = {};

  // Crear un objeto para almacenar las ventas por día de la semana
  const salesByDayOfWeek = {};

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let totalSell = 0;
  data.forEach((item) => {
    const paymentDate = item.updatedAt.split("T")[0];
    totalSell += item.total_paid_amount;
    // Recorrer los datos y calcular la cantidad de libros por género

    item.books.forEach((book) => {
      const gender = book.gender;
      if (gender) {
        if (booksByGender[gender]) {
          booksByGender[gender].sales++;
        } else {
          booksByGender[gender] = { gender, sales: 1 };
        }
      }
    });
    console.log("fecha: ", paymentDate);
    // Recorrer los datos y calcular las ventas por dia
    if (paymentDate) {
      const paymentDate2 = new Date(paymentDate);
      const dayOfWeek = paymentDate2.getDay();

      const key = `${dayOfWeek}`;

      if (!salesByDayOfWeek[key]) {
        salesByDayOfWeek[key] = 0;
      }

      salesByDayOfWeek[key] += 1;
    }

    // Recorrer los datos y calcular las ventas por mes
    if (paymentDate) {
      const [day, month, year] = paymentDate.split("-"); // Dividir la fecha en partes

      // Crear la clave en el formato "mm/yyyy"
      const key = `${year}-${month}`;

      if (!salesByMonth[key]) {
        salesByMonth[key] = 0;
      }

      salesByMonth[key] += 1;
    }
  });
  // Construir el arreglo de objetos con el formato deseado
  const salesArray = Object.entries(salesByMonth).map(([key, value]) => {
    const [month] = key.split("-");

    return {
      mes: `${monthNames[Number(month)]}`,

      sales: value,
    };
  });

  // Obtener los resultados en un array
  const salesByDayArray = Object.entries(salesByDayOfWeek).map(
    ([key, value]) => {
      return {
        dia: dayNames[Number(key)],

        sales: value,
      };
    }
  );

  const filteredBooksByGender = Object.values(booksByGender).filter(
    (genre) => genre.sales > 0
  );

  console.log("venta por dia", salesByDayArray);
  console.log("venta por mes", salesArray);
  console.log("venta por genero", booksByGender);
  return (
    <TabPanel>
      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-2">
        <Col numColSpan={1} numColSpanLg={1}>
          <Card className="">
            <Title>Total Users</Title>
            <Metric>{totalUser}</Metric>
          </Card>
        </Col>
        <Col numColSpan={1} numColSpanLg={1}>
          <Card className="" decorationColor="amber">
            <Title>Total Books</Title>
            <Metric>{totalBook}</Metric>
          </Card>
        </Col>
        <Col numColSpan={1} numColSpanLg={1}>
          <Card className="" decorationColor="amber">
            <Title>Total Sold</Title>
            <Metric>${totalSell}</Metric>
          </Card>
        </Col>
        <Col numColSpan={1} numColSpanLg={3}>
          <Card className="max-w-lg">
            <Title>Sales by gender:</Title>
            <BarChart
              className="mt-6"
              data={filteredBooksByGender}
              index="gender"
              categories={["sales"]}
              colors={["orange"]}
              yAxisWidth={48}
            />
          </Card>
        </Col>
        <Col numColSpan={1} numColSpanLg={3}>
          <Card className="max-w-lg">
            <Title>Sales by day:</Title>
            <BarChart
              className="mt-6"
              data={salesByDayArray}
              index="dia"
              categories={["sales"]}
              colors={["blue"]}
              yAxisWidth={40}
            />
          </Card>
        </Col>

        <Col numColSpan={1} numColSpanLg={3}>
          <Title>Number of sales per month:</Title>
          <BarChart
            className="mt-6"
            data={salesArray}
            index="mes"
            categories={["sales"]}
            colors={["green"]}
            yAxisWidth={48}
          />
        </Col>
      </Grid>
    </TabPanel>
  );
};

export default TabListGeneral;
