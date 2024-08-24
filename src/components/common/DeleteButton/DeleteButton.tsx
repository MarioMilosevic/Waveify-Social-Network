import { FaTrash } from "react-icons/fa6";
import styles from "./DeleteButton.module.css"
import { dateIconSize } from "../../../utils/constants";
import { DeleteButtonProps } from "../../../utils/types";
const DeleteButton = ({removeHandler}:DeleteButtonProps) => {
  return (
    <button className={styles.button} onClick={removeHandler}>
      <FaTrash size={dateIconSize}/>
      <span>Delete</span>
    </button>
  );
}

export default DeleteButton
