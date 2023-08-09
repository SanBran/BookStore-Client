import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Views/Home/Home";
import BooksDetail from "./Views/BooksDetail/BooksDetail";
import "./App.css";
import Access from "./Views/Access/Access";
import Navbar from "./Components/Navbar/Navbar";
import Profile from "./Views/Profile/Profile";
import Wishlist from "./Components/Wishlist/Wishlist";
import History from "./Components/History/History";
import Settings from "./Views/Settings/Settings";
import Filters from "./Components/Filters/Filters";
import Results from "./Views/Results/Results";
import NotFound from "./Views/NotFound/NotFound";
import AdminDashboard from "./Views/Admin/AdminDashboard";

import EmailVerification from "./Views/EmailVerification";

import { useDispatch, useSelector } from "react-redux";
import Cart from "./Views/Cart.jsx/Cart";
import { PaymentDetails } from "./Views/Cart.jsx/PaymentDetails/PaymentDetails";
import SucessfulPay from "./Views/Cart.jsx/SuccesfulPay/SucessfulPay";
import SuccessfulAcquisition from "./Views/Cart.jsx/FreeBooks/Freebooks";

import { useEffect, useState } from "react";
import PendingPay from "./Views/Cart.jsx/PendingPay/PendingPay";
import FailurePay from "./Views/Cart.jsx/FailurePay/FailurePay";

//pasos para el deploy
import axios from "axios";
//-------local
axios.defaults.baseURL = "http://localhost:8000/";
//-------deployado
// axios.defaults.baseURL = "https://bookstorepf-production.up.railway.app";

//-------Manejando cookies para mantener sesiones
import Cookies from 'js-cookie';
import { accessUser, getUserById, validateSession } from "./redux/actions/actions";



function App() {
  const showOverlayPerfile = useSelector(state => state.overlayProfile);
  const location = useLocation();
  const dispatch = useDispatch();

  const [server, setServer] = useState(true);

  const token = localStorage.getItem('token');

  

  useEffect(() => {
    const token = Cookies.get('valToken');
    const email = Cookies.get('email');
    if (token && email) {
      (async () => {
        const user = await dispatch(validateSession(email, token));
        await dispatch(accessUser(true, user.id));
        await dispatch(getUserById(user.id))
      })()
    }
  }, [])

  useEffect(() => {
    (async () => {
      try {
        await axios.post('/getBooks');
      } catch (error) {
        setServer(false);
      }
    })()
  }, [])


  return (
    <>
      {!server
        ? (<NotFound />)
        : (<>
          {showOverlayPerfile && <Profile />}
          <div >
            {location.pathname !== "/admin" && location.pathname !== "/profile" && location.pathname !== "/access" && (location.pathname !== "/results") && (location.pathname !== "/")
              ? (<Navbar />)
              : (<></>)
            }
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/access" element={<Access />} />
              <Route path="/detail/:id" element={ <BooksDetail />} />
              <Route path="/profile" element={token? <Profile />:<Access/>} />
              <Route path="/wishlist" element={token? <Wishlist />:<Access/>} />
              <Route path="/history" element={token? <History />:<Access/>} />
              <Route path="/settings" element={token? <Settings />:<Access/>} />
              <Route path="/Filters" element={<Filters />} />
              <Route path="/Results" element={<Results />} />
              <Route path="/access/validate" element={<EmailVerification />} />
              <Route path="/cart" element={token? <Cart />: <Access/>} />
              <Route path="/payment" element={ token? <PaymentDetails />:<Access/>} />
              <Route path="/payment/:id" element={token? <PaymentDetails /> : <Access/>} />
              <Route path="/payment/sucessfulpay" element={token? <SucessfulPay />:<Access/>} />
              <Route path="/payment/pendingpay" element={token? <PendingPay />:<Access/>} />
              <Route path="/payment/failurepay" element={token?<FailurePay />:<Access/>} />
              <Route path="/freeBookacquisition" element={token?<SuccessfulAcquisition />:<Access/>} />
              <Route path="/admin" element={token?<AdminDashboard />:<NotFound/>}/>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </>)
      }

    </>
  );
}

export default App;
