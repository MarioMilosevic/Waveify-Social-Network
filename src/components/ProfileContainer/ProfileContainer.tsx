import styles from "./ProfileContainer.module.css";
import marioImage from "../../assets/mariomilosevic.jpg";
import { useState } from "react";
import { useNavigate } from "react-router";
import LogOut from "../../UI/LogOut/LogOut";
import Profile from "../../UI/Profile/Profile";

const ProfileContainer = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem('jwt')
    navigate('/login')
  }
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
          <Profile/>
          <LogOut logOut={logOut}/>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
