import styles from "./ProfileContainer.module.css";
import marioImage from "../../../assets/images/mariomilosevic.jpg"
import LogOut from "../../common/LogOut/LogOut";
import Profile from "../../common/Profile/Profile";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

const ProfileContainer = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const windowRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        windowRef.current &&
        !windowRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logOut = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <div className={styles.container} ref={windowRef}>
      <div className={styles.image_container}>
        <img
          src={marioImage}
          alt="Profile"
          className={styles.profile_image}
          onClick={() => setIsVisible((prev) => !prev)}
        />
        <div className={isVisible ? styles.visible : styles.not_visible}>
          <Profile />
          <LogOut logOut={logOut} />
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
