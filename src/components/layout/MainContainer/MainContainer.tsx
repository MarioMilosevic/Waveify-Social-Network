import styles from "./MainContainer.module.css"
import { MainContainerProps } from "../../../utils/types"
const MainContainer = ({ children }:MainContainerProps) => {
  return (
    <main className={styles.container}>
      {children}
    </main>
  )
}

export default MainContainer
