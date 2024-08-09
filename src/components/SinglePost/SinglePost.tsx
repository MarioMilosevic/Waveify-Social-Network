import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate } from "../../utils/helperFunction";
import { postComment } from "../../utils/api";
import { commentSchema } from "../../utils/zod";
import { CommentValue } from "../../utils/zod";
import styles from "./SinglePost.module.css";
import UserHeader from "../UserHeader/UserHeader";
import Input from "../Input/Input";
import PostButton from "../PostButton/PostButton";
import Comment from "../Comment/Comment";
import { IoIosSend } from "react-icons/io";
import { buttonIconSize } from "../../utils/constants";
// import { toast, ToastContainer } from "react-toastify";
// import { success } from "../../utils/toasts";


const SinglePost = ({ postDetails }) => {
  const { comments, post } = postDetails;
  const [commentsArr, setCommentsArr] = useState(comments);

  const [comment, setComment] = useState("");

  const { register, handleSubmit } = useForm<CommentValue>({
    defaultValues: { comment: "" },
    resolver: zodResolver(commentSchema),
  });

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
      // const updatedComment = updateUser(postedComment);
      if (postedComment) {
        // setCommentsArr([...commentsArr, updatedComment]);
        setCommentsArr([...commentsArr, postedComment]);
        // success()
        // const notify = () => toast('Mariooo')
        // notify()
      }

    } catch (error) {
      console.error("Error posting comment");
    }
  };

  const removeUserCommentHandler = async (commentId: string) => {
    setCommentsArr(
      commentsArr.filter((comment) => comment.comment_id !== commentId)
    );


    // failure();
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
            <IoIosSend size={buttonIconSize} onClick={handleSubmit(onSubmit)} />
          </button>
        </div>
      </form>

      <div className={styles.post_buttons}>
        <PostButton
          likes={likes}
          comments={commentsArr.length}
          liked={liked}
          likeHandler={() => console.log("like from modal")}
          commentHandler={() => console.log("comment from modal")}
        />
      </div>
      <div className={styles.comments_number}>
        {commentsArr ? commentsArr.length : "No"} comments
        {commentsArr.map((comment) => (
          <Comment
            key={comment.comment_id}
            comment={comment}
            postId={post_id}
            removeUserCommentHandler={removeUserCommentHandler}
          />
        ))}
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default SinglePost;
