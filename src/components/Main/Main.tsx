import styles from "./Main.module.css";
import NewPost from "../NewPost/NewPost";
import Post from "../Post/Post";
import { useUserSlice } from "../../hooks/useUserSlice";
const Main = () => {
  const { user } = useUserSlice()
  console.log(user.posts)
    return <div className={styles.container}>
      <NewPost />
      {user.posts.map((post) => <Post key={post.post_id} {...post} />)}
  </div>;
};

export default Main;
