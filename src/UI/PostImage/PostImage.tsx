import { PostImageProps } from "../../utils/types";
import styles from "./PostImage.module.css";

const PostImage = ({ children, image }: PostImageProps) => {
  return (
    <div className={styles.image_container}>
      {image && <img src={image} alt={image} className={styles.image} />}
      {children}
    </div>
  );
};

export default PostImage;
