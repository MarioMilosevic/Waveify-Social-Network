import styles from "./Modal.module.css";
import PostButton from "../PostButton/PostButton";
import { FiSend } from "react-icons/fi";
import { formatDate } from "../../utils/helperFunction";
import { LiaCalendarWeekSolid } from "react-icons/lia";
import { dateIconSize } from "../../utils/constants";
import { AiOutlineClose } from "react-icons/ai";
const Modal = ({ post, setModalActive }) => {
  console.log(post);
  const {
    comments,
    likes,
    created_at,
    image,
    text,
    liked,
    user: { full_name, picture, username },
  } = post;
  const formattedDate = formatDate(created_at);

  const likeHandler = () => {
    console.log("lajk iz modala");
  };

  const commentHandler = () => {
    console.log("comment iz modala");
  };

  const closeModal = () => {
    setModalActive(false);
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <AiOutlineClose className={styles.close_button} onClick={closeModal} />
        <div className={styles.header}>
          <div className={styles.user_container}>
            <img src={picture} alt={picture} className={styles.profile_image} />
            <div className={styles.user_info}>
              <h3>{`@${username}`}</h3>
              <h2>{full_name}</h2>
            </div>
          </div>
          <div className={styles.calendar_container}>
            <LiaCalendarWeekSolid size={dateIconSize} />
            <p>{formattedDate}</p>
          </div>
        </div>
        <div className={styles.image_container}>
          {image && <img src={image} alt={image} className={styles.image} />}
          <p>{text}</p>
        </div>
        <div className={styles.comment}>
          <input type="text" placeholder="Write a comment" />
          <FiSend className={styles.comment_button} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
