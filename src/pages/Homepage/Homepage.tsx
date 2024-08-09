import styles from "./Homepage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Main from "../../components/Main/Main";
import Profile from "../../components/Profile/Profile";
const Homepage = () => {
  return <div className={styles.container}>
    <Sidebar />
    <Main />
    <Profile />
  </div>;
};

export default Homepage;
