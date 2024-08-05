import styles from "./Modal.module.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { AiOutlineClose } from "react-icons/ai";
import { useSinglePost } from "../../hooks/useSinglePost";
import SinglePost from "../SinglePost/SinglePost";

const Modal = ({ modalHandler, postId }) => {
  const { loading, postDetails } = useSinglePost(postId);

 

  if (loading) {
    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <LoadingSpinner size="normal" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <AiOutlineClose className={styles.close_button} onClick={() => modalHandler(false)} />
        <SinglePost postDetails={postDetails} />
      </div>
    </div>
  );
};

export default Modal;

