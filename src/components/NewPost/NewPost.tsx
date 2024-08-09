import styles from "./NewPost.module.css";
import { useUserSlice } from "../../hooks/useUserSlice";
import { FaMicrophone } from "react-icons/fa6";
import { createNewPost } from "../../utils/api";

const NewPost = () => {
  const { user } = useUserSlice();
  return (
    <div className={styles.post}>
      <div className={styles.container}>
        <div className={styles.status}>
          <img
            src={user.picture}
            alt={user.picture}
            className={styles.picture}
          />
          <h2>What's happening</h2>
        </div>
        <div className={styles.microphone_container}>
          <FaMicrophone className={styles.microphone_icon} />
          <button onClick={() => console.log("")}>New Post</button>
          {/* <button onClick={() => createNewPost(text)}>New Post</button> */}
        </div>
      </div>
    </div>
  );
};

export default NewPost;
