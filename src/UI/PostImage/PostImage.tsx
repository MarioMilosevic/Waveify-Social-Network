import { PostImageProps } from "../../utils/types";
import styles from "./PostImage.module.css";

const PostImage = ({ children, image, text }: PostImageProps) => {
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

export default PostImage;
