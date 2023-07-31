
import { Link } from "react-router-dom";

const FailurePay = () => {
  return (
    <div>
      <div>
        <Link to={`/payment`}>
          <button>Back to Payment</button>
        </Link>
      </div>
      <h1>Failed to make the payment</h1>
      <h4>Try again</h4>
    </div>
  );
};

export default FailurePay;
