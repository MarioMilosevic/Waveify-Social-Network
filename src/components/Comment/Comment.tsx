import styles from "./Comment.module.css";
import UserHeader from "../UserHeader/UserHeader";
import { formatDate } from "../../utils/helperFunction";
import { CommentProps } from "../../utils/types";
import { removeUserComment } from "../../utils/api";
import { FaTrash } from "react-icons/fa";
// import { failure } from "../../utils/toasts";

const Comment = ({
  comment,
  postId,
  removeUserCommentHandler,
}: CommentProps) => {
  console.log(comment)
  const { created_at, text, username, comment_id } = comment;
  const formattedDate = formatDate(created_at);

  const removeComment = async () => {
    try {
      const response = await removeUserComment(postId, comment_id);
      if (response) {
        removeUserCommentHandler(comment_id);
        // failure(); 
      }
    } catch (error) {
      console.error("Error removing comment:", error);
    }
  };

  return (
    <div className={styles.container}>
      <UserHeader user={comment} formattedDate={formattedDate} />
      <div className={styles.text_container}>
        <p>{text}</p>
        {username === "nemanja_malesija" && (
          <div className={styles.button_container}>
            <FaTrash />
            <button onClick={removeComment}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;

