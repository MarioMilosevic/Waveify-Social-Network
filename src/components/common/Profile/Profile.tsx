import { CgProfile } from "react-icons/cg";
import styles from "./Profile.module.css"
const Profile = () => {
  return (
    <div className={styles.profile_div}>
      <CgProfile className={styles.profile_icon} />
      <span>My profile</span>
    </div>
  );
}

export default Profile
