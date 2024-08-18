import styles from "./Homepage.module.css";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import Main from "../../components/layout/Main/Main";
import ProfileContainer from "../../components/layout/ProfileContainer/ProfileContainer";

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
