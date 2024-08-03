import styles from "./Modal.module.css";
import PostButton from "../PostButton/PostButton";
import Input from "../Input/Input";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { setLoading } from "../../redux/features/loadingSlice";
import { getPostComments } from "../../utils/helperFunction";
import { CommentValue, commentSchema } from "../../utils/zod";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoIosSend } from "react-icons/io";
import { formatDate } from "../../utils/helperFunction";
import Comment from "../Comment/Comment";
import { AiOutlineClose } from "react-icons/ai";
import UserHeader from "../UserHeader/UserHeader";
import { buttonIconSize } from "../../utils/constants";
import { useDispatch } from "react-redux";

const Modal = ({ setModalActive, postId }) => {
  // const { loading } = useLoadingSlice();
  const [loading, setLoading] = useState(true);
  // const dispatch = useDispatch();
  const [postDetails, setPostDetails] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchPostComments = async () => {
      try {
        const response = await getPostComments(postId);
        setPostDetails(response);
      } catch (error) {
        console.error("Error fetching post comments:", error);
      }
      // finally {
      // setLoading(false);
      // }
    };

    fetchPostComments();
  }, [postId]);

  const { register, handleSubmit } = useForm<CommentValue>({
    defaultValues: { comment: "" },
    resolver: zodResolver(commentSchema),
  });

  // if (loading) {
  //   return <LoadingSpinner />;
  // }

  if (!postDetails) {
    return null;
  }

  const { comments, post } = postDetails;
  const { created_at, image, liked, likes, text, user } = post;

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
      {loading && <LoadingSpinner kurac="kurac"/>}
      {/* {postDetails ? (
        <div className={styles.modal}>
          <AiOutlineClose
            className={styles.close_button}
            onClick={closeModal}
          />
          <UserHeader user={user} formattedDate={formattedDate} />
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
                <IoIosSend size={buttonIconSize} />
              </button>
            </div>
            <div className={styles.post_buttons}>
              <PostButton
                likes={likes}
                comments={comments.length}
                liked={liked}
                likeHandler={likeHandler}
                commentHandler={commentHandler}
              />
            </div>
            <span className={styles.comments_number}>
              {comments.length} comments
            </span>
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </form>
        </div>
      ) : (
        <LoadingSpinner kurac="mario"/>
      )} */}
    </div>
  );
};

export default Modal;
