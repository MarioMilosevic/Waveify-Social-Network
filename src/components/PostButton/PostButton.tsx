import { PostButtonProps } from "../../utils/types";
import styles from "./PostButton.module.css";
import { FaHeart, FaComment } from "react-icons/fa";
import { buttonIconSize } from "../../utils/constants";

const PostButton = ({
  likes,
  comments,
  liked,
  likeHandler,
  commentHandler,
}: PostButtonProps) => {
  const likeClass = liked ? styles.liked : styles.not_liked;

  // like button i comment button u UI folder

  return (
    <div className={styles.container}>
      <button className={`${styles.like} ${likeClass}`} onClick={likeHandler}>
        <FaHeart size={buttonIconSize} className="heart-icon" />
        <span>{likes}</span>
      </button>
      <button className={styles.comment} onClick={commentHandler}>
        <FaComment size={buttonIconSize} className="comment-icon" />
        <span>{comments}</span>
      </button>
    </div>
  );
};

export default PostButton;
