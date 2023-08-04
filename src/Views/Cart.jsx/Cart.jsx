// import Stripe from "stripe"
// import axios from "axios";
// import { useEffect, useState } from "react";


// const stripe = new Stripe('sk_test_51NXqBWJvp7x1gGxjTsCAhgScRFFvesnqbhSCoQh5TaTKIplC1acinnXfRefCDS0FvadXBW9cx5l9pjDtdRTd7GFx008SkUSzUD')
// console.log(stripe);
// const customer = await stripe.customers.create({
//     email: 'custoasasdasdasdasdasdasddasdmer@example.com',
// });

// const Cart = () => {
//     const [payLink, setPayLink] = useState('')
//     const payCart = async (data) => {
//         try {
//             const response = await axios.post('http://localhost:8000/create-checkout-session', data)
//             const paymentLink = response.data.url
//             setPayLink(paymentLink)
//             window.open(paymentLink, '_blank')
//         } catch (error) {
//             console.log('Error', error);
//         }
//     }

//     const data = {
//         "items": [{
//             "idBook": "4d3c558e-d17d-4687-a47c-affe1e2d70c6",
//             "name": "Libro n1",
//             "typeMoney": "USD",
//             "price": 1000,
//             "quantity": 1
//         }
//         ],
//         "idBook": "4d3c558e-d17d-4687-a47c-affe1e2d70c6",
//         "user": "Enzo Magurno",
//         "userId": "33b96758-ba03-4d13-b7fd-a384580215b8",
//         "email": "magurnoenzo31602@gmail.com"
//     }
//     return (
//         <>
//             <h1>ESTO ES CARRITO:</h1>
//             <button onClick={() => payCart(data)}>Pagar carrito</button>
//         </>
//     )
// }
// export default Cart
import React, { useEffect, useState } from "react";
import axios from "axios";
//import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";
import { removeCart } from "../../redux/actions/actions";

//importando icon del boton cerrar
import close_button from "../../assets/icons/close_button.svg";
import delete_icon from "../../assets/icons/delete_icon.svg";





const Cart = ({ isOpen, onRequestClose }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();
  const genericCover =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhRKhJb1aLmjwGX_ox0TA6eTxCv_5g3Nlr6w&usqp=CAU";

  
  const modalStyles = {
    overlay: {
      backgroundColor: "transparent", // Fondo translúcido oscuro detrás del modal
      zIndex: 100,
    },
  };

  const handleCart = (id)=>{
    dispatch(removeCart(id))
  }
{/*
const dataPay = {
	ip: "Stripe Default",
	orderNumber: "Stripe Default",
	metodo: "Stripe Aprovado",
	currentOperation: "Stripe Default",
	net_received_amount: session.amount_total,
	amount: '00.00',
	paymentStatus:"Pending",
	email:email,
	order:idBook,
	name:user,
	idpay:session.id,
	total_paid_amount:session.amount_total,
	operationType:session.currency,
	orderType:session.mode,
	data_aprove:session.payment_status,
	pqyment_method_option: session.payment_method_options,
	userId: userId,
	bookId: idBook,
	bookIds: session.metadata.idBooks.split(","),
	bookTitle: lineItems?.map((item) => item.price_data.product_data.name),
	quantity: lineItems?.map((item) => item.quantity),
	price: lineItems?.map((item) => item.price_data.unit_amount),
    typeMoney: lineItems?.map((item) => item.price_data.currency),

	
	}
*/}
const totalPrice = cart.reduce((total, book) => total + book.price, 0);

  const datapay = {

    email: user.email,
    name: user.name,
    bookIds: cart.map((book) => book.id),
    bookTitle: cart.map((book) => book.title),
    quantity: 1,
    price: cart.map((book) => book.price),
    typeMoney: cart.map((book) => "ARG"),
    totalPrice: totalPrice,
    total_paid_amount:totalPrice
  }
 
  const handlerfreebooks = async () => {
    try {
      const response = await axios.post(
        "https://book-store-client-coral.vercel.app/freeBooks",
        datapay
      );
      const sureThing = response.data;
      console.log(sureThing);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
  return (
    <Modal style={modalStyles} className={styles.modal} isOpen={isOpen} onRequestClose={onRequestClose} >
      <div>
        <div className={styles.titleContainer}>
          <img className={styles.buttonClose} src={close_button} onClick={onRequestClose} alt='x' />
          <h3 className={styles.title}>Your Cart</h3>
        </div>

        <div className={styles.cartContainer}>
          {cart.length !== 0 ? (
            cart.map((book) => (
              <div key={book.id} className={styles.bookContainer}>
                <Link className={styles.bookLink} to={`/detail/${book.id}`}>
                  <img
                    className={styles.bookImage}
                    src={book.image !== "Image not Available" ? book.image : genericCover}
                    alt={`${book.title}`}
                  />
                </Link>
                <div className={styles.textContainer}>
                  <div className={styles.bookTitle}>{book.title}</div>
                  {book.price && book.price ? (
                    <div className={styles.bookPrice}>$ {book.price}</div>
                    ) : (
                      <div className={styles.bookPrice}>Free</div>
                      )}
                </div>
                
                <img className={styles.deleteBtn} src={delete_icon} alt="x"  onClick={()=>{handleCart(book.id)}}/>
              </div>
            ))
          ) : (
            <p className={styles.empty}>Empty Cart</p>
          )}
        </div>
        <div className={styles.infoContainer}>
          <h4 className={styles.title}>{cart.length} books</h4>
          <h4 className={styles.price}>${totalPrice}</h4>
        </div>
        {
        totalPrice !== 0 ?(
        <Link to={`/payment`}>
          <button className={styles.buyBtn} onClick={onRequestClose} >Buy Now</button>
        </Link>
        ):
        (
        <Link to={`/freeBookacquisition`}>
          <button className={styles.buyBtn} onClick={handlerfreebooks} >Buy Now</button>
            
        </Link>
        )
        }
            </div>
        </Modal>
    );
};

export default Cart;
