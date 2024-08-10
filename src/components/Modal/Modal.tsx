import styles from "./Modal.module.css";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ modalHandler, children }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <AiOutlineClose
          className={styles.close_button}
          onClick={() => modalHandler(false)}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
