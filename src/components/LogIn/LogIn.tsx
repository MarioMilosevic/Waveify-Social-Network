import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { authenticationSchema, FormValues } from '../../utils/zod';
import logo from "../../assets/logo.png"
import styles from "./LogIn.module.css"
import Input from "../Input/Input"
import Button from "../Button/Button"

const LogIn = () => {
  return (
    <div className={styles.container}>
      <img src={logo} alt={logo} className={styles.logo} />
      <form action="" className={styles.form}>
      <Input placeholder={"Enter your email here"} title={"Email"} type={"text"} />
      <Input placeholder={"Enter your password here"} title={"Password"} type={"password"} />
      </form>

      <Button text="Confirm"/>
    </div>
  )
}

export default LogIn
