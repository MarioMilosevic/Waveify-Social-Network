import styles from "./MainContainer.module.css"
import { MainContainerProps } from "../../utils/types"
const MainContainer = ({ children }:MainContainerProps) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default MainContainer
