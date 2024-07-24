import styles from "./Homepage.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useUserSlice } from "../../hooks/useUserSlice";
const Homepage = () => {
  const { user } = useUserSlice()
  console.log("Renderovan HOME", user);
  return <div className={styles.container}>
    <Sidebar/>
  </div>;
};

export default Homepage;
