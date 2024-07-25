import styles from "./Post.module.css";
import { useUserSlice } from "../../hooks/useUserSlice";
import { FaMicrophone } from "react-icons/fa6";

const Post = () => {
  const { user } = useUserSlice();
  console.log(user);
  return (
    <div className={styles.post}>
      <img src={user.picture} alt={user.picture} />
      <div>
        <div className={styles.status}>What's happening</div>
        <div className={styles.microphone}>
          <FaMicrophone />
          <button>New Post</button>
        </div>
      </div>
    </div>
  );
};

export default Post;
