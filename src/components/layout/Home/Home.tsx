import styles from "./Home.module.css";
import { IoHomeSharp } from "react-icons/io5";

const Home = () => {
  return (
    <div className={styles.home}>
      <IoHomeSharp className={styles.icon} />
      <p className={styles.paragraph}>Home</p>
    </div>
  );
};

export default Home;
