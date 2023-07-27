import Stripe from "stripe"
import axios from "axios";
import { useEffect, useState } from "react";


const stripe = new Stripe('sk_test_51NXqBWJvp7x1gGxjTsCAhgScRFFvesnqbhSCoQh5TaTKIplC1acinnXfRefCDS0FvadXBW9cx5l9pjDtdRTd7GFx008SkUSzUD')
console.log(stripe);
const customer = await stripe.customers.create({
    email: 'custoasasdasdasdasdasdasddasdmer@example.com',
});

const Cart = () => {
    const [payLink, setPayLink] = useState('')
    const payCart = async (data) => {
        try {
            const response = await axios.post('http://localhost:8000/create-checkout-session', data)
            const paymentLink = response.data.url
            setPayLink(paymentLink)
            window.open(paymentLink, '_blank')
        } catch (error) {
            console.log('Error', error);
        }
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