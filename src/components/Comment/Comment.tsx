import styles from "./Comment.module.css";
import UserHeader from "../UserHeader/UserHeader";
import { formatDate } from "../../utils/helperFunction";
import { SingleCommentType } from "../../utils/types";
import { removeUserComment } from "../../utils/helperFunction";
import { FaTrash } from "react-icons/fa";

const Comment = ({
  comment,
  postId,
  removeUserCommentHandler,
}: SingleCommentType) => {
  const { created_at, text, username, comment_id } = comment;
  const formattedDate = formatDate(created_at);

  const removeComment = async () => {
    const response = await removeUserComment(postId, comment_id);
    console.log(response)
    if (response) {
      removeUserCommentHandler(comment_id);
    }
  };

  return (
    <div className={styles.container}>
      <UserHeader user={comment} formattedDate={formattedDate} />
      <div className={styles.text_container}>
        <p>{text}</p>
        {/* provjerit odje ovo moze li drugacije kako */}
        {username === "nemanja_malesija" ? (
          <div className={styles.button_container}>
            <FaTrash />
            <button onClick={removeComment}>Delete</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Comment;
