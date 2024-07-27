import styles from "./PostButton.module.css";
import { FaHeart, FaComment } from "react-icons/fa";
const PostButton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.like}>
        <FaHeart size={18} />
        <span>2</span>
      </div>
      <div className={styles.comment}>
        <FaComment size={18} />
        <span>2</span>
      </div>
    </div>
  );
};

export default PostButton;
