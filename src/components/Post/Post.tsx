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
      <div>
        <img src={image} alt={image} />
        <div>
          <p>{`@${user.username}`}</p>
        </div>
        <div>nesto</div>
      </div>
    </div>
  );
};

export default Post;
