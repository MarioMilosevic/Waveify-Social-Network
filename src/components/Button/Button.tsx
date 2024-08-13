import { ButtonProps } from "../../utils/types";
import styles from "./Button.module.css";

const Button = ({ text, isActive }: ButtonProps) => {
  const buttonClass = isActive
  ? styles["button-active"]
  : styles["button-inactive"];
  
  return <button className={`${styles.button} ${buttonClass}`}>{text}</button>;
};

export default Button;
