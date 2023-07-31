
import { Link } from "react-router-dom";

const PendingPay = () => {
  return (
    <div>
      <div>
        <Link to={`/`}>
          <button>Back to Home</button>
        </Link>
      </div>
      <h1>Pending payment</h1>
      <h4>Be attentive to the email to verify the result of the payment</h4>
    </div>
  );
};

export default PendingPay;
