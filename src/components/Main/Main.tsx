import styles from "./Main.module.css";
import NewPost from "../NewPost/NewPost";
import { useUserSlice } from "../../hooks/useUserSlice";
const Main = () => {
  const { user } = useUserSlice()
  console.log(user)
    return <div className={styles.container}>
      <NewPost/>
  </div>;
};

export default Main;
