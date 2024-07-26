import styles from "./Post.module.css";
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
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.image_container}>
          <img src={user.picture} alt={user.picture} />
          <div className={styles.user_info}>
            <h3>{`@${user.username}`}</h3>
            <h2>{user.full_name}</h2>
          </div>
        </div>
        <div>nesto</div>
      </div>
    </div>
  );
};

export default Post;
