import styles from "./LikeButton.module.css"
import { FaHeart } from "react-icons/fa6";
import { buttonIconSize } from "../../utils/constants";
import { LikeButtonProps } from "../../utils/types";


const LikeButton = ({ onClick, liked, likes }:LikeButtonProps) => {
  const likeClass = liked ? styles.liked : styles.not_liked;
    
  return (
    <button className={`${styles.like} ${likeClass}`} onClick={onClick}>
      <FaHeart size={buttonIconSize}/>
      <span>{likes}</span>
    </button>
  );
}

export default LikeButton
