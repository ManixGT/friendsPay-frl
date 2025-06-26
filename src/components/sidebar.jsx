import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Zap,
  Receipt,
  HelpCircle,
  Settings,
  LogOut,
} from "lucide-react";
import styles from "./sidebar.module.css";
import logo from "../assets/splash.png";

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

const Sidebar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!isSidebarOpen) return null;

  return (
    <aside
      className={`${styles.sidebar} ${
        !isSidebarOpen ? styles.sidebarHidden : ""
      }`}
    >
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
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      <div className={styles.logout}>
        <LogOut size={18} color="black" />
        <span>Logout</span>
      </div>
    </aside>
  );
};

export default Sidebar;
