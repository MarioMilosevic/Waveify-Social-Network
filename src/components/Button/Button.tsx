import { ButtonProps } from "../../utils/types"
import styles from "./Button.module.css"
const Button = ({text}:ButtonProps) => {
  return (
    <button className={styles.button}>
      {text}
    </button>
  )
}

export default Button
