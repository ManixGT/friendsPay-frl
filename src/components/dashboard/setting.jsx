import { useState, useEffect } from "react";
import { ChevronDown, User } from "lucide-react";
import styles from "../styles/settings.module.css";
import Sidebar from "../sidebar";
import Navbar from "../navbar";
import bharatConnect from "../../assets/bharatConnect.svg";

const Settings = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [activeTab, setActiveTab] = useState("Profile Management");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "India",
    state: "",
    mobile: "",
    aadhar: "3965 **** 1678",
  });

  const tabs = [
    "Profile Management",
    "Change Profile Password",
    "Change Tpin Password",
  ];

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
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
        <section style={{ padding: "20px" }}>
          <h1
            style={{
              marginBottom: "10px",
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            Settings
          </h1>

          {/* Profile Header */}
          <div className={styles.profileHeader}>
            <div className={styles.profileInfo}>
              <div className={styles.profileAvatar}>
                <User size={32} />
              </div>
              <div className={styles.profileDetails}>
                <h2 className={styles.profileName}>Moni Roy</h2>
                <p className={styles.profileEmail}>moniroy58@gmail.com</p>
                <p className={styles.profileLocation}>Joda, MH</p>
                <p className={styles.profileEmailLabel}>Email</p>
              </div>
            </div>
            <div className={styles.brandingSection}>
              <img src={bharatConnect} alt="" />
            </div>
          </div>

          {/* Tabs and Form */}
          <div className={styles.formContainer}>
            <div className={styles.tabsContainer}>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${styles.tab} ${
                    activeTab === tab ? styles.activeTab : ""
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Form Content */}
            <div className={styles.formContent}>
              <div className={styles.formGrid}>
                {/* Name Field */}
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={styles.formInput}
                  />
                </div>

                {/* Email Field */}
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={styles.formInput}
                  />
                </div>

                {/* Country Field */}
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Country</label>
                  <div className={styles.selectWrapper}>
                    <select
                      value={formData.country}
                      onChange={(e) =>
                        handleInputChange("country", e.target.value)
                      }
                      className={styles.formSelect}
                    >
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                    </select>
                    <ChevronDown size={16} className={styles.selectIcon} />
                  </div>
                </div>

                {/* State Field */}
                <div className={styles.formField}>
                  <label className={styles.formLabel}>State</label>
                  <div className={styles.selectWrapper}>
                    <select
                      value={formData.state}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                      className={`${styles.formSelect} ${
                        !formData.state ? styles.placeholder : ""
                      }`}
                    >
                      <option value="" disabled>
                        Choose Your State
                      </option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                    </select>
                    <ChevronDown size={16} className={styles.selectIcon} />
                  </div>
                </div>

                {/* Mobile Number Field */}
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Mobile number</label>
                  <input
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={(e) =>
                      handleInputChange("mobile", e.target.value)
                    }
                    className={styles.formInput}
                  />
                </div>

                {/* Aadhar Number Field */}
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Aadhar Number</label>
                  <input
                    type="text"
                    value={formData.aadhar}
                    readOnly
                    className={`${styles.formInput} ${styles.readOnly}`}
                  />
                </div>
              </div>

              {/* Update Profile Button */}
              <button className={styles.updateButton}>Update Profile</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Settings;
