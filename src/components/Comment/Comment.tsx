import styles from "./Comment.module.css";
import UserHeader from "../UserHeader/UserHeader";
import { formatDate } from "../../utils/helperFunction";
import { SingleCommentType } from "../../utils/types";
import { FaTrash } from "react-icons/fa";

const Comment = ({ comment }: SingleCommentType) => {
  console.log(comment);
  const { created_at, text } = comment;
  const formattedDate = formatDate(created_at);
  return (
    <div className={styles.container}>
      <UserHeader user={comment} formattedDate={formattedDate} />
      <div className={styles.text_container}>
        <p>{text}</p>
        <div className={styles.button_container}>
          <FaTrash />
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
