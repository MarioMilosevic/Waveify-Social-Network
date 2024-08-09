import styles from "./Profile.module.css";
import marioImage from "../../assets/mariomilosevic.jpg";
import { useState } from "react";
const Profile = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img
          src={marioImage}
          alt={marioImage}
          className={styles.profile_image}
          onClick={() => setIsVisible(prev => !prev)}
        />
      <div className={isVisible ? styles.visible : styles.not_visible}>
        <div>My profile</div>
        <div>Log out</div>
      </div>
      </div>
    </div>
  );
};

export default Profile;
