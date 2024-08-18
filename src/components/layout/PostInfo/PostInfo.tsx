import { PostInfoProps } from "../../../utils/types";
import styles from "./PostInfo.module.css";

const PostInfo = ({ children, image, text }: PostInfoProps) => {
  return (
    <div className={styles.image_container}>
      {image && <img src={image} alt={image} className={styles.image} />}
      <div className={styles.text_children_container}>
        <p className={styles.text}>{text}</p>
        {children}
      </div>
    </div>
  );
};

export default PostInfo;
