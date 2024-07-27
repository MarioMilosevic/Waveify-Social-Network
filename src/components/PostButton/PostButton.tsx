import { PostButtonProps } from "../../utils/types";
import styles from "./PostButton.module.css";
import { FaHeart, FaComment } from "react-icons/fa";

const PostButton = ({ likes, comments, liked }: PostButtonProps) => {
  const likeClass = liked ? styles.liked : styles.not_liked;

  return (
    <div className={styles.container}>
      <div className={`${styles.like} ${likeClass}`}>
        <FaHeart size={18} className="heart-icon" />
        <span>{likes}</span>
      </div>
      <div className={styles.comment}>
        <FaComment size={18} className="comment-icon" />
        <span>{comments}</span>
      </div>
    </div>
  );
};

export default PostButton;
