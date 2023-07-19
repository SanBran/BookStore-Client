import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Home from "./Views/Home/Home";
import BooksDetail from "./Views/BooksDetail/BooksDetail";
import "./App.css";
import Access from "./Views/Access/Access";

function App() {
  const location = useLocation();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Access />} />

        <Route path="/details:id" element={<BooksDetail />} />
      </Routes>
    </>
  );
}

export default App;
