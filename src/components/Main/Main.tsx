import styles from "./Main.module.css";
import NewPost from "../NewPost/NewPost";
import Post from "../Post/Post";
import { useUserSlice } from "../../hooks/useUserSlice";
import { ToastContainer } from "react-toastify";
const Main = () => {
  const { user } = useUserSlice();
  console.log(user)
  return (
    <div className={styles.container}>
      <NewPost />
      <div className={styles.list}>
        {user.posts.map((post) => (
          <Post key={post.post_id} post={post} />
        ))}
        <ToastContainer className={styles.toast} />
      </div>
    </div>
  );
};

export default Main;
