import Stripe from "stripe"
import axios from "axios";




//({ items, email, idBook, user, userId })
// const lineItems = items.map((item) => ({
//     price_data: {
//       product_data: {
//             name: item.name,	  
//       },
//       currency: item.typeMoney,
//       unit_amount: item.price,


//     },
//       quantity: item.quantity,

const stripe = new Stripe('sk_test_51NXqBWJvp7x1gGxjTsCAhgScRFFvesnqbhSCoQh5TaTKIplC1acinnXfRefCDS0FvadXBW9cx5l9pjDtdRTd7GFx008SkUSzUD')
console.log(stripe);
const customer = await stripe.customers.create({
    email: 'customer@example.com',
});


console.log(customer);



const Cart = () => {
    const payCart = async (data) => {
        await axios.post('http://localhost:8000/create-checkout-session', data)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }



    const data = {
        "items": [{
            "idBook": "4d3c558e-d17d-4687-a47c-affe1e2d70c6",
            "name": "Libro n1",
            "typeMoney": "USD",
            "price": 1000,
            "quantity": 1
        }
        ],
        "idBook": "4d3c558e-d17d-4687-a47c-affe1e2d70c6",
        "user": "Enzo Magurno",
        "userId": "33b96758-ba03-4d13-b7fd-a384580215b8",
        "email": "magurnoenzo31602@gmail.com"
    }
    return (
        <>
            <h1>ESTO ES CARRITO:</h1>
            <button onClick={() => payCart(data)}>Pagar carrito</button>
        </>
    )
}

export default Cart