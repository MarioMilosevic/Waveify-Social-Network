import styles from "./Comment.module.css";
import UserHeader from "../UserHeader/UserHeader";
import { formatDate } from "../../utils/helperFunction";
import { SingleCommentType } from "../../utils/types";
const Comment = ({ comment }: SingleCommentType) => {
  const { created_at, text } = comment;
  const formattedDate = formatDate(created_at);
  return (
    <div className={styles.container}>
      <UserHeader user={comment} formattedDate={formattedDate} />
      <p>{text}</p>
    </div>
  );
};

export default Comment;
