// src/pages/Support.jsx
import { useState, useEffect } from "react";
import Navbar from "../navbar";
import Sidebar from "../sidebar";
import styles from "../styles/support.module.css";
import { Download } from "lucide-react";

const Support = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

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
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobile={isMobile}
        onClose={toggleSidebar}
      />

      <main
        className={`${styles.main} ${!isSidebarOpen ? styles.mainFull : ""}`}
      >
        <Navbar onMenuClick={toggleSidebar} />

        <section className={styles.supportContent}>
          <h2 className={styles.heading}>Support</h2>

          <div className={styles.formCard}>
            <h3>Raise your query</h3>
            <div className={styles.formGrid}>
              <div>
                <label>Type Of Complaint</label>
                <select>
                  <option>Choose Your Type</option>
                </select>
              </div>
              <div>
                <label>Mobile Number</label>
                <input type="text" placeholder="Enter Mobile Number" />
              </div>
              <div>
                <label>Complaint Reason</label>
                <select>
                  <option>Choose Your Reason</option>
                </select>
              </div>
              <div>
                <label>From Date</label>
                <input type="date" />
              </div>
              <div>
                <label>To Date</label>
                <input type="date" />
              </div>
              <div>
                <label>B Connect Transaction ID</label>
                <input type="text" placeholder="Type your ID..." />
              </div>
              <div className={styles.fullWidth}>
                <label>Complaint Description</label>
                <input type="text" placeholder="Type your description..." />
              </div>
            </div>
            <button className={styles.submitButton}>SUBMIT</button>
          </div>

          <div className={styles.historySection}>
            <h3>Complaints History</h3>
            <div className={styles.historyActions}>
              <input
                type="text"
                placeholder="Search by Transaction Ref ID..."
              />
              <select>
                <option>Filter By</option>
              </select>
              <input type="date" />
              <input type="date" />
              <button className={styles.exportButton}>
                <Download size={16} /> Export
              </button>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Complaint Reason</th>
                  <th>B Connect Transaction ID</th>
                  <th>Mobile No</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Transaction</td>
                  <td>C100001</td>
                  <td>Sahil Kadam</td>
                  <td>+91 868632434</td>
                  <td>04 Sep 2019</td>
                  <td>
                    <span className={styles.badgeSuccess}>Completed</span>
                  </td>
                </tr>
                <tr>
                  <td>Transaction</td>
                  <td>C100002</td>
                  <td>Vishwas Sopale</td>
                  <td>+91 868632434</td>
                  <td>04 Sep 2019</td>
                  <td>
                    <span className={styles.badgeProcessing}>Processing</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Support;
