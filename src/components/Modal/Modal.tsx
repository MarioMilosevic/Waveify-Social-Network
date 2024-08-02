import styles from "./Modal.module.css";
import PostButton from "../PostButton/PostButton";
import Input from "../Input/Input";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { CommentValue, commentSchema } from "../../utils/zod";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FiSend } from "react-icons/fi";
import { formatDate } from "../../utils/helperFunction";
import { LiaCalendarWeekSolid } from "react-icons/lia";
import { dateIconSize } from "../../utils/constants";
import Comment from "../Comment/Comment";
import { AiOutlineClose } from "react-icons/ai";
import UserHeader from "../UserHeader/UserHeader";

const Modal = ({ setModalActive, postDetails }) => {
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  // console.log(postDetails);

  const {
    post: {
      audio,
      comments: postComments,
      created_at,
      image,
      liked,
      likes,
      post_id,
      text,
      user,
      user_id,
    },
    comments,
  } = postDetails;
  // console.log(likes);
  // console.log(comments);
  // console.log(postComments)

  const { register, handleSubmit } = useForm<CommentValue>({
    defaultValues: { comment: "" },
    resolver: zodResolver(commentSchema),
  });

  // if (loading) {
  //   return <LoadingSpinner />;
  // }

  const formattedDate = formatDate(created_at);

  const likeHandler = () => {
    console.log("like from modal");
  };

  const commentHandler = () => {
    console.log("comment from modal");
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const onSubmit = (data) => {
    console.log("submit comment", data);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <AiOutlineClose className={styles.close_button} onClick={closeModal} />
        <UserHeader user={user} formattedDate={formattedDate} />
        {/* <div className={styles.header}>
          <div className={styles.user_container}>
            <img src={picture} alt={username} className={styles.profileImage} />
            <div className={styles.userInfo}>
              <h3>{`@${username}`}</h3>
              <h2>{full_name}</h2>
            </div>
          </div>
          <div className={styles.calendar_container}>
            <LiaCalendarWeekSolid size={dateIconSize} />
            <p>{formattedDate}</p>
          </div>
        </div> */}
        <div className={styles.image_container}>
          {image && <img src={image} alt={text} className={styles.image} />}
          <p>{text}</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.comment}>
            <Input
              placeholder="Write a comment"
              type="text"
              title=""
              value={comment}
              changeHandler={(e) => setComment(e.target.value)}
              zod={{ ...register("comment") }}
            />
            <button type="submit" className={styles.comment_button}>
              <FiSend />
            </button>
          </div>
          <PostButton
            likes={likes}
            comments={postComments}
            liked={liked}
            likeHandler={likeHandler}
            commentHandler={commentHandler}
          />
          <span>{postComments} comments</span>
          {comments.map((comment) => <Comment comment={comment} />)}
        </form>
      </div>
    </div>
  );
};

export default Modal;
