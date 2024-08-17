import { FaTrash } from "react-icons/fa6";
import styles from "./DeleteButton.module.css"
import { dateIconSize } from "../../utils/constants";
import { DeleteButtonProps } from "../../utils/types";
const DeleteButton = ({removeHandler}:DeleteButtonProps) => {
  return (
    <div className={styles.button_container} onClick={removeHandler}>
      <FaTrash size={dateIconSize}/>
      <button>Delete</button>
    </div>
  );
}

export default DeleteButton
