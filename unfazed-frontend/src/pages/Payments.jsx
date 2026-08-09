import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/payments.css";

function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await API.get("/payments");
      setPayments(res.data.payments || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="payments-page">
      <h1>Payment History</h1>

      <div className="payment-table">

        <div className="payment-head">
          <span>Client</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Date</span>
        </div>

        {payments.length > 0 ? (
          payments.map((payment) => (
            <div
              className="payment-row"
              key={payment._id}
            >
              <span>{payment.client?.name}</span>

              <span>₹ {payment.amount}</span>

              <span
                className={
                  payment.status === "Paid"
                    ? "paid"
                    : "pending"
                }
              >
                {payment.status}
              </span>

              <span>
                {new Date(payment.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))
        ) : (
          <h3>No Payments Found</h3>
        )}
      </div>
    </div>
  );
}

export default Payments;