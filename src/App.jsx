import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login/Login";
import Home from "./Views/Home/Home";
import BooksDetail from "./Views/BooksDetail/BooksDetail";
import "./App.css";
import SignUp from "./Components/Signup/Signup";
import Access from "./Views/Access/Access";

function App() {
  const location = useLocation();
  return (
    <>
      {/* <h1>Book Store</h1> */}
      {location.pathname !== "/" ? <Dashboard /> : <Access />}
      <Routes>
        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/details:id" element={<BooksDetail />} />
      </Routes>
    </>
  );
}

export default App;
