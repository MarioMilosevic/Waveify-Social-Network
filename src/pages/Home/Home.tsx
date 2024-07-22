import styles from "./Home.module.css";
import { useUserSlice } from "../../hooks/useUserSlice";
const Home = () => {
  const { user } = useUserSlice()
  console.log("Renderovan HOME", user);
  return <div className={styles.container}>Home</div>;
};

export default Home;
