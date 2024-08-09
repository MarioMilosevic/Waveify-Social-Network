import styles from "./Post.module.css";
import Modal from "../Modal/Modal";
import PostButton from "../PostButton/PostButton";
import UserHeader from "../UserHeader/UserHeader";
import { useState } from "react";
import { formatDate} from "../../utils/helperFunction";
import { createPortal } from "react-dom";
import { like } from "../../utils/api";

const Post = ({ post }) => {
  const { created_at, user, image, likes, comments, liked, text, post_id } = post;
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [postLiked, setPostLiked] = useState<boolean>(liked)
  const [likesNumber, setLikesNumber] = useState<number>(likes)
  
  const formattedDate = formatDate(created_at);

  const likeHandler = () => {
    like(post_id)
    if (postLiked) {
      setLikesNumber((prev) => prev - 1)
    } else {
      setLikesNumber((prev) => prev + 1)
    }
    setPostLiked(prev => !prev)
  };

  const modalHandler = (isOpen:boolean) => {
    setModalActive(isOpen);
  };


  return (
    <div className={styles.container}>
      <UserHeader user={user} formattedDate={formattedDate } />
      <div className={styles.image_container}>
        {image && <img src={image} alt={image} className={styles.image} />}
        <p>{text}</p>
      </div>
      <div className={styles.post_buttons }>
      <PostButton
        likes={likesNumber}
        comments={comments}
        liked={postLiked}
        likeHandler={likeHandler}
        commentHandler={() => modalHandler(true)}
        />
        </div>
      {modalActive &&
        createPortal(
          <Modal postId={post_id} modalHandler={modalHandler} />,
          document.body
        )}
    </div>
  );
};

export default Post;

