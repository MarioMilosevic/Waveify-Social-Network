import styles from "./Post.module.css";
import Modal from "../../UI/Modal/Modal";
import UserHeader from "../UserHeader/UserHeader";
import SinglePost from "../SinglePost/SinglePost";
import { useState } from "react";
import { formatDate } from "../../utils/helperFunction";
import {
  toggleLike,
  removePostFromState,
} from "../../redux/features/posts.Slice";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { like, removePostFromServer } from "../../utils/api";
import { PostProps } from "../../utils/types";
import DeleteButton from "../DeleteButton/DeleteButton";
import ButtonWrapper from "../../UI/ButtonWrapper/ButtonWrapper";
import LikeButton from "../../UI/LikeButton/LikeButton";
import CommentButton from "../../UI/CommentButton/CommentButton";
import { useUserSlice } from "../../hooks/useUserSlice";
import PostInfo from "../../UI/PostInfo/PostInfo";
import { showToast } from "../../utils/toasts";

import AudioPlayer from "../../Audio/AudioPlayer/AudioPlayer";

const Post = ({ post }: PostProps) => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { user: stateUser } = useUserSlice();
  const {
    audio,
    created_at,
    user,
    image,
    likes,
    comments,
    liked,
    text,
    post_id,
  } = post;

  const formattedDate = formatDate(created_at);

  const likeHandler = () => {
    like(post_id, liked ? "DELETE" : "POST");
    dispatch(toggleLike(post_id));
  };

  const removePostHandler = async () => {
    try {
      await removePostFromServer(post_id);
      dispatch(removePostFromState(post_id));
      showToast("Post successfully removed!");
    } catch (error) {
      console.error("Failed to remove post:", error);
      showToast("Failed to remove post. Please try again.", "error");
    }
  };

  return (
    <div className={styles.container}>
      <UserHeader user={user} formattedDate={formattedDate} />
      <PostInfo image={image} text={text}>
        <div>
          {user.username === stateUser.username && (
            <DeleteButton removeHandler={removePostHandler} />
          )}
        </div>
      </PostInfo>
      {audio && <AudioPlayer audio={audio} isRecording={false} />}

      <ButtonWrapper>
        <LikeButton likes={likes} liked={liked} onClick={likeHandler} />
        <CommentButton
          comments={comments}
          onClick={() => setModalActive(true)}
        />
      </ButtonWrapper>
      {modalActive &&
        createPortal(
          <Modal closeModal={() => setModalActive(false)}>
            <SinglePost postId={post_id} />
          </Modal>,
          document.body
        )}
    </div>
  );
};

export default Post;
