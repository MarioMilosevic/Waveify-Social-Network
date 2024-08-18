import { ButtonProps } from "../../../utils/types";
import styles from "./Button.module.css";

const Button = ({ text, isActive, clickHandler }: ButtonProps) => {
  const buttonClass = isActive
  ? styles["button-active"]
  : styles["button-inactive"];
  
  return <button className={`${styles.button} ${buttonClass}`} onClick={clickHandler}>{text}</button>;
};

export default Button;
