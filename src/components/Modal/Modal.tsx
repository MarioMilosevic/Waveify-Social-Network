import { ModalProps } from "../../utils/types";
import styles from "./Modal.module.css";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ closeModal, children }:ModalProps) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <AiOutlineClose
          className={styles.close_button}
          onClick={closeModal}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
