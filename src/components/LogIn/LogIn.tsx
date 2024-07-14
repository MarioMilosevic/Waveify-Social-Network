import logo from "../../assets/logo.png"
import styles from "./LogIn.module.css"
import Input from "./Input/Input"
const LogIn = () => {
  return (
    <div className={styles.container}>
      <img src={logo} alt={logo} className={styles.logo} />
      <Input placeholder={"Enter your email here"} title={"Email"}/>
      <Input placeholder={"Enter your password here"} title={"Password"}/>
    </div>
  )
}

export default LogIn
