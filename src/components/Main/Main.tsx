import styles from "./Main.module.css";
import Post from "../Post/Post";
const Main = () => {
    return <div className={styles.container}>
      <Post/>
  </div>;
};

export default Main;
