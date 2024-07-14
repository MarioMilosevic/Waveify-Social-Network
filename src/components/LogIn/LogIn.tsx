import logo from "../../assets/logo.png"
import styles from "./LogIn.module.css"
import Input from "../Input/Input"
import Button from "../Button/Button"
const LogIn = () => {
  return (
    <div className={styles.container}>
      <img src={logo} alt={logo} className={styles.logo} />
      <Input placeholder={"Enter your email here"} title={"Email"} type={"text"} />
      <Input placeholder={"Enter your password here"} title={"Password"} type={"password"} />
      <Button text="Confirm"/>
    </div>
  )
}

export default LogIn
