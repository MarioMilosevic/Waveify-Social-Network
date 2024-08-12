import styles from "./Sidebar.module.css";
import logo from "../../assets/logo.png";
import Home from "../Home/Home";
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <img src={logo} alt={logo} />
      <Home />
    </div>
  );
};

export default Sidebar;
