import React from "react";
import { Link } from "react-router-dom";

const SucessfulPay = () => {
  return (
    <div>
      <div>
        <Link to={`/`}>
          <button>Back to Home</button>
        </Link>
      </div>
      <h1>Succesful Purchase</h1>
      <h4>Go to your purchases to download the book</h4>
    </div>
  );
};

export default SucessfulPay;
