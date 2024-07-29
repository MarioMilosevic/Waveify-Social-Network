import styles from "./Modal.module.css";
import PostButton from "../PostButton/PostButton";
const Modal = ({ post }) => {
  console.log(post)
const {comments, likes} = post

  const likeHandler = () => {
    console.log("lajk iz modala");
  };

  const commentHandler = () => {
    console.log("comment iz modala");
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
      <PostButton
        likes={likes}
        comments={comments}
        likeHandler={likeHandler}
        commentHandler={commentHandler}
        />
        </div>
    </div>
  );
};

export default Modal;
