// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/transactionHistory.module.css";
import logo from "../../assets/splash.png";
import {
  LayoutDashboard,
  Zap,
  HelpCircle,
  Settings,
  LogOut,
  Receipt,
  Search,
  Bell,
  Menu,
  User,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";

// Example navItems with paths for routing
const navItems = [
  {
    icon: <LayoutDashboard size={18} />,
    label: "Dashboard",
    path: "/dashboard",
  },
  { icon: <Zap size={18} />, label: "Services", path: "/services" },
  {
    icon: <Receipt size={18} />,
    label: "Transaction History",
    path: "/transactions",
  },
  { icon: <HelpCircle size={18} />, label: "Support", path: "/support" },
  { icon: <Settings size={18} />, label: "Settings", path: "/settings" },
];

// Dummy data for demonstration
const dummyTransactions = [
  {
    id: "TXN001",
    customerId: "CUST001",
    customerName: "John Doe",
    date: "2024-06-24",
    operator: "Airtel",
    status: "Completed",
  },
  // ...add more transactions as needed
];

const getStatusClass = (status) => {
  switch (status) {
    case "Completed":
      return styles.statusCompleted;
    case "Processing":
      return styles.statusProcessing;
    case "Failed":
      return styles.statusFailed;
    case "On Hold":
      return styles.statusOnHold;
    case "In Transit":
      return styles.statusInTransit;
    default:
      return "";
  }
};

const TransactionHistory = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("All");
  const [dateFilter, setDateFilter] = useState("Date");
  const [fromDate, setFromDate] = useState("From Date");
  const [toDate, setToDate] = useState("To Date");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  // Pagination logic
  const itemsPerPage = 10;
  const filteredTransactions = dummyTransactions.filter((transaction) => {
    // Add your filtering logic here
    return (
      (searchTerm === "" ||
        transaction.id.includes(searchTerm) ||
        transaction.customerId.includes(searchTerm)) &&
      (filterBy === "All" || transaction.status === filterBy)
    );
  });
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(true); // Always show sidebar on desktop
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className={styles.sidebar}>
          <div className={styles.logoSection}>
            <img src={logo} alt="logo" className={styles.logoImage} />
          </div>

          <nav className={styles.nav}>
            {navItems.map((item, i) => (
              <div
                key={i}
                className={`${styles.navItem} ${
                  location.pathname === item.path ? styles.active : ""
                }`}
                onClick={() => navigate(item.path)}
                style={{ cursor: "pointer" }}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </nav>

          <div className={styles.logout}>
            <LogOut size={18} />
            <span>Logout</span>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className={styles.main}>
        {/* Top Bar */}
        <header className={styles.header}>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu size={20} />
          </button>
          <div className={styles.searchBar}>
            <Search size={18} className={styles.searchIcon} />
            <input type="text" placeholder="Search" />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Bell size={20} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <User size={20} />
              <span style={{ fontSize: "14px", fontWeight: "500" }}>
                Moni Roy
              </span>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by Transaction Ref ID/Customer ID..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.filterGroup}>
            <select
              className={styles.filterSelect}
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Processing">Processing</option>
              <option value="Failed">Failed</option>
              <option value="On Hold">On Hold</option>
              <option value="In Transit">In Transit</option>
            </select>

            <select
              className={styles.filterSelect}
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option>Date</option>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>Custom Range</option>
            </select>

            <select
              className={styles.filterSelect}
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            >
              <option>From Date</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>

            <select
              className={styles.filterSelect}
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            >
              <option>To Date</option>
              <option>Today</option>
              <option>Yesterday</option>
              <option>Custom</option>
            </select>

            <button
              className={styles.exportBtn}
              onClick={() => console.log("Exporting...")}
            >
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>Transaction ID</th>
                <th>Customer ID</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Operator</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction) => (
                <tr key={transaction.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{transaction.id}</td>
                  <td className={styles.tableCell}>{transaction.customerId}</td>
                  <td className={styles.tableCell}>
                    {transaction.customerName}
                  </td>
                  <td className={styles.tableCell}>{transaction.date}</td>
                  <td className={styles.tableCell}>{transaction.operator}</td>
                  <td className={styles.tableCell}>
                    <span
                      className={`${styles.status} ${getStatusClass(
                        transaction.status
                      )}`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <p className={styles.paginationInfo}>
            Page {currentPage} of {totalPages}
          </p>
          <div className={styles.paginationControls}>
            <button
              className={styles.paginationBtn}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <button
              className={styles.paginationBtn}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransactionHistory;
