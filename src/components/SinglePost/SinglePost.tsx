import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate } from "../../utils/helperFunction";
import { commentSchema } from "../../utils/zod";
import { CommentValue } from "../../utils/zod";
import styles from "./SinglePost.module.css";
import UserHeader from "../UserHeader/UserHeader";
import Input from "../Input/Input";
import PostButton from "../PostButton/PostButton";
import Comment from "../Comment/Comment";
import { IoIosSend } from "react-icons/io";
import { buttonIconSize } from "../../utils/constants";

const SinglePost = ({ postDetails }) => {
  const [comment, setComment] = useState("");

  const { register, handleSubmit } = useForm<CommentValue>({
    defaultValues: { comment: "" },
    resolver: zodResolver(commentSchema),
  });

  const onSubmit = (data) => {
    console.log("submit comment", data);
  };
  const { comments, post } = postDetails;
  const { created_at, image, liked, likes, text, user } = post;
  const formattedDate = formatDate(created_at);
  return (
    <>
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
            likeHandler={() => console.log("like from modal")}
            commentHandler={() => console.log("comment from modal")}
          />
        </div>
        <div className={styles.comments_number}>
          {comments ? comments.length : "No"} comments
          {comments.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))}
        </div>
      </form>
    </>
  );
};

export default SinglePost;
