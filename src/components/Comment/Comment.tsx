import styles from "./Comment.module.css"
const Comment = ({ comment }) => {
  const { comment_id, created_at, full_name, picture, text, username } = comment

  return (
    <div className={styles.container}>
      Comment
    </div>
  )
}

export default Comment
