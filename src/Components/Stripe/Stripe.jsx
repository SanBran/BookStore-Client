import axios from "axios";
import stripe_icon from '../../assets/icons/stripe_icon.svg'

const Stripe = ({ cart, userInfo, styles }) => {
  //esto para el carrito
  const cartInfo = cart?.map((books) => {
    return {
      idBook: books.id,
      name: books.title,
      price: parseInt(books.price),
      quantity: 1,
      typeMoney: books.currency || "MXN",
      pdfLink: books.pdfLink
      //description: "Ok, aquí va una descripcion breve: Pásate a Premium",
    };
  });
  console.log(cartInfo);
  // Esto de aquí será para el user
  const userData = {
    userId: userInfo.id,
    user: userInfo.name,
    email: userInfo.email,
  };

  //const realResults = {...userData, carrito: [...cartInfo]};
  // const [pref, setPref]= useState(null);
  //Some practice
  const attemptObject = {
    userId: userData.userId,
    idBook: cartInfo[0].idBook,
    user: userData.name,
    email: userData.email,

    items: cartInfo,
  };
  const handlePaymentStripe = async () => {
    try {
      console.log(attemptObject);
      const response = await axios.post(
        "/create-checkout-session",
        attemptObject
      );
      const sureThing = response.data;
      console.log(sureThing.url);
     window.location.href = sureThing.url;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  return (
    <div>
      <button
        onClick={handlePaymentStripe}
        className={styles.payBtn}
      >
        <img src={stripe_icon} alt="icon" />
        Stripe
      </button>
    </div>
  );
};

export default Stripe;
