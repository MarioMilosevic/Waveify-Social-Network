import logo from "../../assets/logo.png"
import styles from "./LogIn.module.css"
const LogIn = () => {
  return (
    <div className={styles.container}>
      <img src={logo} alt={logo} className={styles.logo} />
    </div>
  )
}

export default LogIn
