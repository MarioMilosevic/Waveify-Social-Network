import styles from "./Main.module.css";
import NewPost from "../NewPost/NewPost";
import Post from "../Post/Post";
import { useUserSlice } from "../../hooks/useUserSlice";
const Main = () => {
  const { user } = useUserSlice();
  return (
    <div className={styles.container}>
      <NewPost />
      <div className={styles.list}>
        {user.posts.map((post) => (
          <Post key={post.post_id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Main;
