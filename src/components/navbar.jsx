// Navbar.jsx
import { Menu, Search, Bell, User } from "lucide-react";
import styles from "./navbar.module.css";

const Navbar = ({ onMenuClick }) => {
  return (
    <header className={styles.header}>
      <span
        style={{}}
        onClick={() => {
          console.log("Hamburger clicked");
          onMenuClick();
        }}
      >
        <Menu size={20} />
      </span>
      <div className={styles.searchBar}>
        <Search size={18} className={styles.searchIcon} />
        <input type="text" placeholder="Search" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Bell size={20} />
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <User size={20} />
          <span style={{ fontSize: "14px", fontWeight: "500" }}>Moni Roy</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
