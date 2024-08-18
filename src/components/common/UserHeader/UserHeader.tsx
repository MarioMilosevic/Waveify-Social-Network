import styles from "./UserHeader.module.css";
import { LiaCalendarWeekSolid } from "react-icons/lia";
import { dateIconSize } from "../../../utils/constants";
import { UserHeaderProps } from "../../../utils/types";
const UserHeader = ({ user, formattedDate }: UserHeaderProps) => {
  const { picture, full_name, username } = user;
  return (
    <div className={styles.header}>
      <div className={styles.user_container}>
        <img src={picture} alt={picture} className={styles.profile_image} />
        <div className={styles.user_info}>
          <h3>{`@${username}`}</h3>
          <h2>{full_name}</h2>
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
