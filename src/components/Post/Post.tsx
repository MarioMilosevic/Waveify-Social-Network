import styles from "./Post.module.css";
import { LiaCalendarWeekSolid } from "react-icons/lia";
import PostButton from "../PostButton/PostButton";
const Post = ({
  audio,
  comments,
  created_at,
  image,
  liked,
  likes,
  post_id,
  text,
  user,
  user_id,
}) => {
  const formattedDate = new Date(created_at)
    .toLocaleDateString("en-GB")
    .replace(/\//g, ".");
  return (
    <li className={styles.container}>
      {/*  */}
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
          <LiaCalendarWeekSolid size={25} />
          <p>{formattedDate}</p>
        </div>
      </div>
      <div className={styles.image_container}>
        {image && <img src={image} alt={image} className={styles.image} />}
        <p>{text}</p>
      </div>
      {/*  */}
      <PostButton likes={likes} comments={comments} liked={liked} />
    </li>
  );
};

export default Post;
