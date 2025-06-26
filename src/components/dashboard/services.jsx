// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import styles from "../styles/services.module.css";
import img from "../../assets/bharatConnect.svg";
import PaymentSuccessModal from "./paymentConfirmation.jsx";
import Sidebar from "../sidebar.jsx";
import Navbar from "../navbar.jsx";
import { Eye, EyeOff } from "lucide-react";

// const navItems = [
//   {
//     icon: <LayoutDashboard size={18} />,
//     label: "Dashboard",
//     path: "/dashboard",
//   },
//   { icon: <Zap size={18} />, label: "Services", path: "/services" },
//   {
//     icon: <Receipt size={18} />,
//     label: "Transaction History",
//     path: "/transactions",
//   },
//   { icon: <HelpCircle size={18} />, label: "Support", path: "/support" },
//   { icon: <Settings size={18} />, label: "Settings", path: "/settings" },
// ];

const Services = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [buValue, setBuValue] = useState(false);
  const [consumerNum, setConsumerNum] = useState(false);
  const [mobileNum, setMobileNum] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    console.log();
    setIsSidebarOpen((prev) => !prev);
    // { onMenuClick = () => {} }
  };

  return (
    <div className={styles.container}>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobile={isMobile}
        onClose={toggleSidebar}
      />

      <main
        className={`${styles.main} ${!isSidebarOpen ? styles.mainFull : ""}`}
      >
        <Navbar onMenuClick={toggleSidebar} />

        {/* Services Body */}
        <h1 style={{ padding: "5px 30px", color: "black", fontWeight: 700 }}>
          Services
        </h1>
        <div className={styles.servicesContainer}>
          <div className={styles.card}>
            <h2
              style={{
                color: "#f59e0b",
                fontSize: "24px",
                textDecoration: "underline",
              }}
            >
              Add Bill Details
            </h2>
            <div className={styles.inputGroup1}>
              <label className={styles.label}>Select Operator</label>
              <select>
                <option>Choose Your Operator</option>
              </select>

              <label className={styles.label}>Select Biller</label>
              <select>
                <option>Choose Your Biller</option>
              </select>

              <label className={styles.label}>BU</label>
              <div className={styles.inputWithIcon}>
                <input
                  type={buValue ? "text" : "password"}
                  placeholder="Enter BU Number"
                />
                <span
                  className={styles.inputIcon}
                  onClick={() => setBuValue((prev) => !prev)}
                >
                  {buValue ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              <label className={styles.label}>Consumer Number</label>
              <div className={styles.inputWithIcon}>
                <input
                  type={consumerNum ? "text" : "password"}
                  placeholder="Enter Consumer Number"
                />
                <span
                  className={styles.inputIcon}
                  onClick={() => setConsumerNum((prev) => !prev)}
                >
                  {consumerNum ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              <label className={styles.label}>Mobile Number</label>
              <div className={styles.inputWithIcon}>
                <input
                  type={mobileNum ? "text" : "password"}
                  placeholder="Enter Mobile Number"
                />
                <span
                  className={styles.inputIcon}
                  onClick={() => setMobileNum((prev) => !prev)}
                >
                  {mobileNum ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>
            </div>
            <button className={styles.primaryButton}>Fetch Bill</button>
          </div>

          <div className={styles.card}>
            <h2
              style={{
                color: "#f59e0b",
                fontSize: "24px",
                textDecoration: "underline",
              }}
            >
              Fetch Bill Details{" "}
              <img
                src={img}
                alt="Bharat Connect"
                style={{ float: "right", height: "24px" }}
              />
            </h2>
            <div className={styles.inputGroup2}>
              <div style={{ display: "flex" }}>
                <div>
                  <label className={styles.label}>Consumer Name</label>
                  <input type="text" value="Moni Roy" disabled />

                  <label className={styles.label}>Payable Amount</label>
                  <input type="text" value="100" disabled />

                  <label className={styles.label}>Consumer Number</label>
                  <input type="text" value="021545367890" disabled />

                  <label className={styles.label}>Pin</label>
                  <input type="password" value="*****" />

                  <label className={styles.label}>Bill Period</label>
                  <input type="text" value="Monthly" disabled />
                </div>
                <div>
                  <label className={styles.label}>Bill Due Date</label>
                  <input type="text" value="2024-06-24 10:45 PM" disabled />

                  <label className={styles.label}>Bill Amount</label>
                  <input type="text" value="100" disabled />

                  <button
                    className={styles.primaryButton}
                    onClick={() => setIsSuccessModalOpen(true)}
                  >
                    Pay Bill
                  </button>
                  <PaymentSuccessModal
                    isOpen={isSuccessModalOpen}
                    onClose={() => setIsSuccessModalOpen(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Services;
