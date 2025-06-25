import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/dashboard.module.css";
import Navbar from "../navbar";
import Sidebar from "../sidebar";
import dashboard1 from "../../assets/dashboard1.svg";
import dashboard2 from "../../assets/dashboard2.svg";
import dashboard3 from "../../assets/dashboard3.svg";
import dashboard4 from "../../assets/dashboard4.svg";
import dashboardCard1 from "../../assets/dashboard-card1.svg";
import dashboardCard2 from "../../assets/dashboard-card2.svg";

const stats = [
  { label: "Total Transactions", value: 0, img: dashboard1 },
  { label: "Successful Transaction", value: 0, img: dashboard2 },
  { label: "Failed Transactions", value: 0, img: dashboard3 },
  { label: "Hold Transactions", value: 0, img: dashboard4 },
];

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobile={isMobile}
        onClose={toggleSidebar}
      />

      {/* Main Content */}
      <main
        className={`${styles.main} ${!isSidebarOpen ? styles.mainFull : ""}`}
      >
        {/* Navbar */}
        <Navbar onMenuClick={toggleSidebar} />

        {/* Dashboard Body */}
        <section className={styles.dashboardContent}>
          <h2>Dashboard</h2>
          <div className={styles.statsGrid}>
            {stats.map((s, i) => (
              <div key={i} className={styles.statCard}>
                <div className={styles.statHeader}>{s.label}</div>
                <div className={styles.statValue}>{s.value}</div>
                {s.img && (
                  <div className={styles.statIcon}>
                    <img
                      src={s.img}
                      alt={s.label}
                      style={{ width: 32, height: 32 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <h2 style={{ padding: "10px 10px" }}>Category</h2>
          <div className={styles.categoryGrid}>
            <div className={styles.categoryCard}>
              <img src={dashboardCard1} alt="Bharat BillPay" />
              <span
                className={styles.gradientText}
                onClick={() => navigate("/services")}
              >
                view services
              </span>
            </div>

            <div className={styles.categoryCard}>
              <img src={dashboardCard2} alt="Recharge" />
              <span
                className={styles.gradientText}
                onClick={() => navigate("/services")}
              >
                view services
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
