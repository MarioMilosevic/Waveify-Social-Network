import styles from "./Input.module.css";
import { InputProps } from "../../../utils/types";
const Input = ({ title, placeholder }:InputProps) => {
  return (
    <div className={styles.container}>
      <p>{title}</p>
      <input type="text" placeholder={placeholder}/>
    </div>
  );
};

export default Input;
