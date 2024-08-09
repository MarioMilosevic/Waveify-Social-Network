import styles from "./Profile.module.css";
import marioImage from "../../assets/mariomilosevic.jpg";
const Profile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img src={marioImage} alt={marioImage} />
      </div>
    </div>
  );
};

export default Profile;
