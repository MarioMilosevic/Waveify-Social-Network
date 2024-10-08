import styles from "./Sidebar.module.css";
import logo from "../../../assets/images/logo.png"
import Home from "../Home/Home";
const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <img src={logo} alt={logo} className={styles.logo} />
      <Home />
    </aside>
  );
};

export default Sidebar;
