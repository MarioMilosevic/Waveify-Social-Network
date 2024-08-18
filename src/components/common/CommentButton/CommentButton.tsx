import { FaComment } from "react-icons/fa6";
import styles from "./CommentButton.module.css"
import { buttonIconSize } from "../../../utils/constants";
import { CommentButtonProps } from "../../../utils/types";

const CommentButton = ({onClick, comments}:CommentButtonProps) => {
  return (
    <button className={styles.comment} onClick={onClick}>
      <FaComment size={buttonIconSize} className="comment-icon" />
      <span>{comments}</span>
    </button>
  );
}

export default CommentButton
