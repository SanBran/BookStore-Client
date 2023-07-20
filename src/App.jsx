import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Views/Home/Home";
import BooksDetail from "./Views/BooksDetail/BooksDetail";
import "./App.css";
import SignUp from "./Components/Signup/Signup";
import Access from "./Views/Access/Access";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const location = useLocation();
  return (
    <>
    {location.pathname !== "/profile" ? (
        <Navbar />
      ) : (
        <></>
      )}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/details:id" element={<BooksDetail />} />
      </Routes>
    </>
  );
}

export default App;