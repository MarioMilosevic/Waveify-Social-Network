import styles from "./Input.module.css";
import { InputProps } from "../../utils/types";
const Input = ({ title, placeholder, type }: InputProps) => {
  return (
    <div className={styles.container}>
      <p>{title}</p>
      <input type={type} placeholder={placeholder}/>
    </div>
  );
};

export default Input;
