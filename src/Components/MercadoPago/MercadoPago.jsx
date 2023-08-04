import axios from "axios";

const MercadoPago = ({ cart, userInfo ,styles}) => {
  //esto para el carrito
  const cartInfo = cart?.map((books) => {
    return {
      IdBook: books.id,
      nombre: books.title,
      precio: books.price,
      cantidad: 1,
      typeMoney: books.currency || "MXN",
      description: "Ok, aquí va una descripcion breve: Pásate a Premium",
    };
  });
  console.log(cartInfo);
  // Esto de aquí será para el user
  const userData = {
    userId: userInfo.id,
    name: userInfo.name,
    email: userInfo.email,
  };

  //const realResults = {...userData, carrito: [...cartInfo]};
  // const [pref, setPref]= useState(null);
  //Some practice
  const attemptObject = {
    userId: userData.userId,
    IdBook: cartInfo[0].IdBook,
    name: userData.name,
    email: userData.email,

    carrito: cartInfo,
  };
  const handlePaymentMErcadoPago = async () => {
    try {
      console.log(attemptObject);
      const response = await axios.post(
        "/mercadoPago",
        attemptObject
      );
      const sureThing = response.data;
      console.log(sureThing.linkPago);
      window.location.href = sureThing.linkPago;
      if (Object.keys(sureThing).length > 0 || sureThing.length > 0)
        return { ...sureThing };
    } catch (error) {
      console.log(error.message);
      throw Error(error.message);
    }
  };

  return (
    <div>
      <button
        onClick={handlePaymentMErcadoPago}
        className={styles.Back}
      >
        MercadoPago
      </button>
    </div>
  );
};

export default MercadoPago;
