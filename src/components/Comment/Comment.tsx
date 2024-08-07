import styles from "./Comment.module.css";
import UserHeader from "../UserHeader/UserHeader";
import { formatDate } from "../../utils/helperFunction";
import { SingleCommentType } from "../../utils/types";
import { FaTrash } from "react-icons/fa";

const Comment = ({ comment }: SingleCommentType) => {
  console.log(comment);
  const { created_at, text, username } = comment;
  const formattedDate = formatDate(created_at);

  const removeComment = () => {
    console.log("briss");
  };

  return (
    <div className={styles.container}>
      <UserHeader user={comment} formattedDate={formattedDate} />
      <div className={styles.text_container}>
        <p>{text}</p>
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
