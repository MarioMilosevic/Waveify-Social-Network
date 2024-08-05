import styles from "./Post.module.css";
import Modal from "../Modal/Modal";
import PostButton from "../PostButton/PostButton";
import UserHeader from "../UserHeader/UserHeader";
import { useState } from "react";
import { formatDate} from "../../utils/helperFunction";
import { createPortal } from "react-dom";

const Post = ({ post }) => {
  const { created_at, user, image, likes, comments, liked, text, post_id } = post;
  const [modalActive, setModalActive] = useState<boolean>(false);
  const formattedDate = formatDate(created_at);

  const likeHandler = () => {
    console.log("lajk");
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
        likes={likes}
        comments={comments}
        liked={liked}
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




// open postModal kroz comment button (reuzat postojeci button)
// otvori modal kroz React Portal
// 1 useState za post (objekat)
// bice 2 requesta 1 za post 1 za comments
