import styles from "./Post.module.css";
import { useUserSlice } from "../../hooks/useUserSlice";
import { FaMicrophone } from "react-icons/fa6";

const Post = () => {
  const { user } = useUserSlice();
  console.log(user);
  return (
    <div className={styles.post}>
      <div className={styles.container}>
        <div className={styles.status}>
        <img src={user.picture} alt={user.picture} className={styles.picture} />
          <h2>What's happening</h2>
        </div>
        <div className={styles.microphone_container}>
          <FaMicrophone className={styles.microphone_icon} />
          <button>New Post</button>
        </div>
      </div>
    </div>
  );
};

export default Post;
