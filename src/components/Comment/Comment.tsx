import styles from "./Comment.module.css";
import UserHeader from "../UserHeader/UserHeader";
import DeleteButton from "../DeleteButton/DeleteButton";
import { formatDate } from "../../utils/helperFunction";
import { CommentProps } from "../../utils/types";
import { removeUserComment } from "../../utils/api";
import { useUserSlice } from "../../hooks/useUserSlice";
import { showToast } from "../../utils/toasts";

const Comment = ({
  comment,
  postId,
  removeUserCommentHandler,
}: CommentProps) => {
  const { user } = useUserSlice();
  const { created_at, text, username, comment_id } = comment;
  const formattedDate = formatDate(created_at);

  const removeComment = async () => {
    try {
      const response = await removeUserComment(postId, comment_id);
      if (response) {
        removeUserCommentHandler(comment_id);
      }
    } catch (error) {
      console.error("Error removing comment:", error);
      showToast("Error removing comment", "error");
    }
  };

  return (
    <div className={styles.container}>
      <UserHeader user={comment} formattedDate={formattedDate} />
      <div className={styles.text_container}>
        <p>{text}</p>
        {username === user.username && (
          <div className={styles.comment_delete_button}>
            <DeleteButton removeHandler={removeComment} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
