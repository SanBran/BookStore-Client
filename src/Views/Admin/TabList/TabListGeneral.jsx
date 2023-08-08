import {
  AreaChart,
  BarChart,
  Card,
  Col,
  DonutChart,
  Grid,
  LineChart,
  Metric,
  TabPanel,
  Text,
  Title,
} from "@tremor/react";

import { useSelector } from "react-redux";

const TabListGeneral = () => {
  const data = useSelector((state) => state.allPayments);
  const totalUser = useSelector((state) => state.totalUsers);


  // Crear un objeto para almacenar las ventas por mes
  const salesByMonth = {};
  // Crear un objeto para almacenar la cantidad de libros por género
  const booksByGender = {};

  // Crear un objeto para almacenar las ventas por día de la semana
  const salesByDayOfWeek = {};

  data.forEach((item) => {
    const paymentDate = item.paymentDate;
    const totalAmount = item.total_paid_amount;
    // Recorrer los datos y calcular la cantidad de libros por género

    item.books.forEach((book) => {
      const gender = book.gender;
      if (gender) {
        if (booksByGender[gender]) {
          booksByGender[gender].total++;
        } else {
          booksByGender[gender] = { gender, total: 1 };
        }
      }
    });

    // Recorrer los datos y calcular las ventas por mes
    if (paymentDate) {
      const dateParts = paymentDate.split("/");
      const day = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10);
      const year = parseInt(dateParts[2], 10);
      const date = new Date(year, month - 1, day);
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });

      if (salesByDayOfWeek[dayOfWeek]) {
        salesByDayOfWeek[dayOfWeek].total++;
      } else {
        salesByDayOfWeek[dayOfWeek] = { dia: dayOfWeek, total: 1 };
      }
    }

    // Recorrer los datos y calcular las ventas por mes
    if (paymentDate) {
      const [day, month, year] = paymentDate.split("/"); // Dividir la fecha en partes

      // Crear la clave en el formato "mm/yyyy"
      const monthYearKey = `${month}/${year}`;

      // Sumar el total al mes correspondiente
      if (salesByMonth[monthYearKey]) {
        salesByMonth[monthYearKey] += totalAmount;
      } else {
        salesByMonth[monthYearKey] = totalAmount;
      }
    }
  });
  // Convertir el objeto a un arreglo de objetos en el formato deseado
  const salesArray = Object.entries(salesByMonth).map(([month, total]) => ({
    month,
    total,
  }));

  // función para obtener el número de mes desde el formato "mm/yyyy"
  const getMonthNumber = (monthYearKey) => {
    const [month] = monthYearKey.split("/");
    return parseInt(month, 10);
  };

  // Ordenar el arreglo por número de mes
  salesArray.sort((a, b) => {
    const monthNumberA = getMonthNumber(a.month);
    const monthNumberB = getMonthNumber(b.month);
    return monthNumberA - monthNumberB;
  });

  // Obtener los resultados en un array
  const salesByDayArray = Object.values(salesByDayOfWeek);

  const filteredBooksByGender = Object.values(booksByGender).filter(
    (genre) => genre.total > 0
  );
  
  return (
    <TabPanel>
      <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-2">
        <Col>
          <Card className="max-w-lg">
            <Title>Sales by gender:</Title>
            <DonutChart
              className="mt-6"
              data={filteredBooksByGender}
              category="total"
              index="gender"
              colors={[
                "slate",
                "violet",
                "indigo",
                "rose",
                "cyan",
                "amber",
                "green",
                "lime",
                "orange",
                "pink",
                "emerald",
                "blue",
                "neutral",
                "sky",
                "teal",
              ]}
            />
          </Card>
        </Col>
        <Card>
          <Text>Total de Usuarios</Text>
          <Metric>{totalUser}</Metric>
        </Card>
        <Card>
          <Title>Ventas por dia:</Title>
          <DonutChart
            className="mt-6"
            data={salesByDayArray}
            category="total"
            index="dia"
            colors={[
              "indigo",
              "rose",
              "cyan",
              "amber",
              "green",
              "lime",
              "orange",
              "pink",
            ]}
          />
        </Card>
        <Col numColSpan={1} numColSpanLg={2}>
          <Title>Ventas por mes:</Title>
          <BarChart
            className="mt-6"
            data={salesArray}
            index="month"
            categories={["total"]}
            colors={["red", "blue", "green"]}
            yAxisWidth={48}
          />
        </Col>
      </Grid>
    </TabPanel>
  );
};

export default TabListGeneral;
