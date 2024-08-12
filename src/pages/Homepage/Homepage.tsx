import styles from "./Homepage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Main from "../../components/Main/Main";
import ProfileContainer from "../../components/ProfileContainer/ProfileContainer";
const Homepage = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <Main />
      <ProfileContainer />
    </div>
  );
};

export default Homepage;
