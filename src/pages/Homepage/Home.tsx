import styles from "./Homepage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Main from "../../components/Main/Main";
const Homepage = () => {
  return <div className={styles.container}>
    <Sidebar />
    <Main />
  </div>;
};

export default Homepage;
