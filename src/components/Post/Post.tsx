import { LiaCalendarWeekSolid } from "react-icons/lia";
import { dateIconSize } from "../../utils/constants";
import styles from "./Post.module.css";
import Modal from "../Modal/Modal";
import PostButton from "../PostButton/PostButton";
import { useState } from "react";
import { formatDate, getPostComments } from "../../utils/helperFunction";
import { createPortal } from "react-dom";

const Post = ({ post }) => {
  const { created_at, user, image, likes, comments, liked, text, post_id } = post;
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [postDetails, setPostDetails] = useState({post:"", comments:[]})
  const formattedDate = formatDate(created_at);

  const likeHandler = () => {
    console.log("lajk");
  };

  const commentHandler = async () => {
    const response = await getPostComments(post_id)
    setPostDetails(response)
    setModalActive(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.user_container}>
          <img
            src={user.picture}
            alt={user.picture}
            className={styles.profile_image}
          />
          <div className={styles.user_info}>
            <h3>{`@${user.username}`}</h3>
            <h2>{user.full_name}</h2>
          </div>
        </div>
        <div className={styles.calendar_container}>
          <LiaCalendarWeekSolid size={dateIconSize} />
          <p>{formattedDate}</p>
        </div>
      </div>
      <div className={styles.image_container}>
        {image && <img src={image} alt={image} className={styles.image} />}
        <p>{text}</p>
      </div>
      <PostButton
        likes={likes}
        comments={comments}
        liked={liked}
        likeHandler={likeHandler}
        commentHandler={commentHandler}
      />
      {modalActive &&
        createPortal(
          <Modal postDetails={postDetails} setModalActive={setModalActive} />,
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
