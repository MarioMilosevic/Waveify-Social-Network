import styles from "./Profile.module.css";
import marioImage from "../../assets/mariomilosevic.jpg";
import { CgProfile } from "react-icons/cg";
import { IoMdExit } from "react-icons/io";
import { useState } from "react";
const Profile = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img
          src={marioImage}
          alt={marioImage}
          className={styles.profile_image}
          onClick={() => setIsVisible((prev) => !prev)}
        />
        <div className={isVisible ? styles.visible : styles.not_visible}>
          <div className={styles.profile_div}>

            <CgProfile className={styles.profile_icon} />
            <span>My profile</span>
          </div>
          <div className={styles.log_out}>
            <IoMdExit className={styles.log_out_icon} />
            <span>Log out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
