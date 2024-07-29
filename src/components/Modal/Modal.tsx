import styles from "./Modal.module.css";
import PostButton from "../PostButton/PostButton";
import { formatDate } from "../../utils/helperFunction";
import { LiaCalendarWeekSolid } from "react-icons/lia";
import { dateIconSize } from "../../utils/constants";
import Post from "../Post/Post";
const Modal = ({ post }) => {
  console.log(post)
const {comments, likes, created_at, image, liked, user:{full_name, picture, username} } = post
const formattedDate = formatDate(created_at)
  
  const likeHandler = () => {
    console.log("lajk iz modala");
  };

  const commentHandler = () => {
    console.log("comment iz modala");
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Post post={post}/>
      </div>
    </div>
  );
};

export default Modal;
