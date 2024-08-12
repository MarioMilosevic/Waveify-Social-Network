import { ButtonWrapperProps } from "../../utils/types"
import styles from "./ButtonWrapper.module.css"
const ButtonWrapper = ({children}:ButtonWrapperProps) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default ButtonWrapper
