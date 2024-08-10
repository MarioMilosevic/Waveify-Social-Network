import styles from "./SinglePost.module.css";
import UserHeader from "../UserHeader/UserHeader";
import Input from "../Input/Input";
import PostButton from "../PostButton/PostButton";
import Comment from "../Comment/Comment";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate } from "../../utils/helperFunction";
import { postComment } from "../../utils/api";
import { commentSchema } from "../../utils/zod";
import { CommentValue } from "../../utils/zod";
import { IoIosSend } from "react-icons/io";
import { buttonIconSize } from "../../utils/constants";
import { ToastContainer } from "react-toastify";
import { success, failure } from "../../utils/toasts";
import { useSinglePost } from "../../hooks/useSinglePost";
import "react-toastify/dist/ReactToastify.css";

const SinglePost = ({ postId }) => {
  const { loading, postDetails, setPostDetails } = useSinglePost(postId);
  console.log(postDetails);
  const [comment, setComment] = useState("");
  const { register, handleSubmit } = useForm<CommentValue>({
    defaultValues: { comment: "" },
    resolver: zodResolver(commentSchema),
  });

  if (loading) return <LoadingSpinner size="normal" />;

  const { comments, post } = postDetails;
  const {
    created_at,
    image,
    liked,
    likes,
    text,
    user: postUser,
    post_id,
  } = post;
  const formattedDate = formatDate(created_at);

  const onSubmit = async (data) => {
    try {
      const { comment: postedComment } = await postComment(post_id, {
        text: data.comment,
      });
      setComment("");
      if (postedComment) {
        setPostDetails((prev) => {
          const updatedComments = [...prev?.comments, postedComment];
          return {
            ...prev,
            comments: updatedComments,
          };
        });
        success();
      }
    } catch (error) {
      console.error("Error posting comment");
    }
  };

  const removeUserCommentHandler = async (commentId: string) => {
    setPostDetails((prev) => {
      const updatedComments = prev?.comments.filter(
        (comment) => comment.comment_id !== commentId
      );
      return {
        ...prev,
        comments: updatedComments,
      };
    });

    failure();
  };

  return (
    <>
      <UserHeader user={postUser} formattedDate={formattedDate} />
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
      </form>
      <div className={styles.post_buttons}>
        <PostButton
          likes={likes}
          comments={comments.length}
          liked={liked}
          likeHandler={() => console.log("like from modal")}
          commentHandler={() => console.log("comment from modal")}
        />
      </div>
      <div className={styles.comments_number}>
        {comments.length ? comments.length : "No"} comments
        {comments.map((comment) => (
          <Comment
            key={comment.comment_id}
            comment={comment}
            postId={post_id}
            removeUserCommentHandler={removeUserCommentHandler}
          />
        ))}
      </div>
      <ToastContainer />
    </>
  );
};

export default SinglePost;
