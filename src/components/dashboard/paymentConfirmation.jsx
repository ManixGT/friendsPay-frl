// src/components/PaymentSuccessModal.jsx
import styles from "../styles/payment.module.css";
import { CheckCircle, X } from "lucide-react";

const PaymentSuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.paymentModalOverlay}>
      <div className={styles.paymentModal}>
        <button className={styles.closeButton} onClick={onClose}>
          <X />
        </button>

        <div className={styles.successIcon}>
          <CheckCircle size={36} color="#10b981" />
        </div>

        <h3>Payment Success!</h3>
        <p>Your payment was successful.</p>

        <div className={styles.paymentDetails}>
          <div>
            <span>Amount</span>
            <strong>₹ 100</strong>
          </div>
          <div>
            <span>Status</span>
            <span style={{ color: "#10b981", fontWeight: 600 }}>Success</span>
          </div>
          <div>
            <span>Operator Name</span>
            <span>Electricity</span>
          </div>
          <div>
            <span>B Connect Transaction ID</span>
            <span>CC0450671HE78</span>
          </div>
          <div>
            <span>Customer Name</span>
            <span>Moni Roy</span>
          </div>
          <div>
            <span>Biller ID</span>
            <span>MAHA00456001189B4AH</span>
          </div>
          <div>
            <span>Biller Name</span>
            <span>Maharashtra State Electricity Board Pvt.Ltd</span>
          </div>
          <div>
            <span>Customer Convenience Fee</span>
            <span>0.0</span>
          </div>
          <div>
            <span>Bill Date</span>
            <span>2024-06-24 10:45 PM</span>
          </div>
          <div>
            <span>Due Date</span>
            <span>2024-06-24 10:45 PM</span>
          </div>
          <div>
            <span>Mobile/Customer ID</span>
            <span>021545367890</span>
          </div>
          <div>
            <span>Transaction Date & Time</span>
            <span>May 27, 2025, 15:26:10</span>
          </div>
        </div>

        <button className={styles.downloadButton}>Download Receipt</button>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
