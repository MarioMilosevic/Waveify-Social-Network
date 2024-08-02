import styles from "./UserHeader.module.css";
import { LiaCalendarWeekSolid } from "react-icons/lia";
import { dateIconSize } from "../../utils/constants";
const UserHeader = ({ user, formattedDate }) => {
  console.log(formattedDate);
  return (
    <div className={styles.header}>
      <div className={styles.user_container}>
        <img
          src={user.picture}
          alt={user.picture}
          className={styles.profile_image}
        />
        <div className={styles.user_info}>
          <h3>{`@${user.username}`}</h3>
          <h2>{user.full_name}</h2>
        </div>
      </div>
      <div className={styles.calendar_container}>
        <LiaCalendarWeekSolid size={dateIconSize} />
        <p>{formattedDate}</p>
      </div>
    </div>
  );
};

export default UserHeader;
