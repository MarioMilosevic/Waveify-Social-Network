import styles from "./Modal.module.css";
import PostButton from "../PostButton/PostButton";
const Modal = ({ likes, comments }) => {
  const likeHandler = () => {
    console.log("lajk iz modala");
  };

  const commentHandler = () => {
    console.log("comment iz modala");
  };
  return (
    <div className={styles.container}>
      <PostButton
        likes={likes}
        comments={comments}
        likeHandler={likeHandler}
        commentHandler={commentHandler}
      />
    </div>
  );
};

export default Modal;
