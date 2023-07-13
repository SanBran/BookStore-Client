import Home from "./components/home/Home";
import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <h1>Book Store</h1>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
