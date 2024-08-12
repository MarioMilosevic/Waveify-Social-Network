import { PostsProps } from "../../utils/types"
import styles from "./Posts.module.css"
const Posts = ({children}:PostsProps) => {
  return (
    <ul className={styles.list}>
      {children}
    </ul>
  )
}

export default Posts
