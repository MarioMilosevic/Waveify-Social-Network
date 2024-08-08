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
  console.log(comment);
  const { created_at, text, username, comment_id } = comment;
  const formattedDate = formatDate(created_at);

  const mario = async () => {
    const nesto = await removeUserComment(postId, comment_id);
    removeUserCommentHandler(comment_id);
    console.log(nesto);
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
            {/* <button onClick={() => removeUserComment(postId, comment_id)}> */}
            <button onClick={mario}>Delete</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Comment;
