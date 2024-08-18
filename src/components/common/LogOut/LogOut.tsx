import { IoMdExit } from "react-icons/io";
import styles from "./LogOut.module.css"
import { LogOutProps } from "../../../utils/types";
const LogOut = ({logOut}:LogOutProps) => {
  return (
    <div className={styles.log_out} onClick={logOut}>
      <IoMdExit className={styles.log_out_icon} />
      <span>Log out</span>
    </div>
  );
}

export default LogOut
