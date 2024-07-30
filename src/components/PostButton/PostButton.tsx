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

  return (
    <div className={styles.container}>
      <div className={`${styles.like} ${likeClass}`} onClick={likeHandler}>
        <FaHeart size={buttonIconSize} className="heart-icon" />
        <span>{likes}</span>
      </div>
      <div className={styles.comment} onClick={commentHandler}>
        <FaComment size={buttonIconSize} className="comment-icon" />
        <span>{comments}</span>
      </div>
    </div>
  );
};

export default PostButton;
