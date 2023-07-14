import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Views/Login";
import Home from "./Views/Home";
import BooksDetail from "./Views/BooksDetail";
import "./App.css";
import SignUp from "./Views/Signup";

function App() {
  const location = useLocation();
  return (
    <>
      <h1>Book Store</h1>
      {location.pathname !== "/" ? <Dashboard /> : <Login />}
      <Routes>
        <Route path="/home">
          <Home />
        </Route>

        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>

        <Route path="/details:id">
          <BooksDetail />
        </Route>
      </Routes>
    </>
  );
}

export default App;

