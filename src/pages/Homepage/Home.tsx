import styles from "./Homepage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Main from "../../components/Main/Main";
import { useUserSlice } from "../../hooks/useUserSlice";
const Homepage = () => {
  const { user } = useUserSlice()
  console.log("Renderovan HOME", user);
  return <div className={styles.container}>
    <Sidebar />
    <Main />
  </div>;
};

export default Homepage;
