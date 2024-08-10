import styles from "./Post.module.css";
import Modal from "../Modal/Modal";
import PostButton from "../PostButton/PostButton";
import UserHeader from "../UserHeader/UserHeader";
import { useState } from "react";
import { formatDate } from "../../utils/helperFunction";
import { createPortal } from "react-dom";
import { like } from "../../utils/api";
import SinglePost from "../SinglePost/SinglePost";
import { useSinglePost } from "../../hooks/useSinglePost";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
//napravit mali context
const Post = ({ post }) => {
  const { created_at, user, image, likes, comments, liked, text, post_id } =
    post;
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const formattedDate = formatDate(created_at);

  const likeHandler = () => {
    like(post_id, liked ? "DELETE" : "POST");
  };

  const modalHandler = (isOpen: boolean) => {
    setModalActive(isOpen);
  };

  return (
    <div className={styles.container}>
      <UserHeader user={user} formattedDate={formattedDate} />
      <div className={styles.image_container}>
        {image && <img src={image} alt={image} className={styles.image} />}
        <p>{text}</p>
      </div>
      <div className={styles.post_buttons}>
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
          <Modal
            modalHandler={modalHandler}
          >
            {<SinglePost postId={post_id} />}
          </Modal>,
          document.body
        )}
    </div>
  );
};

export default Post;
