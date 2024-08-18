import { ModalProps } from "../../utils/types";
import styles from "./Modal.module.css";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ closeModal, children }: ModalProps) => {
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal} onClick={handleModalClick}>
        <AiOutlineClose className={styles.close_button} onClick={closeModal} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
