import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate, postComment } from "../../utils/helperFunction";
import { commentSchema } from "../../utils/zod";
import { CommentValue } from "../../utils/zod";
import styles from "./SinglePost.module.css";
import UserHeader from "../UserHeader/UserHeader";
import Input from "../Input/Input";
import PostButton from "../PostButton/PostButton";
import Comment from "../Comment/Comment";
import { IoIosSend } from "react-icons/io";
import { buttonIconSize } from "../../utils/constants";
import { addComment, findUserPost } from "../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import useFindPost from "../../hooks/useFindPost";

const SinglePost = ({ postDetails }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm<CommentValue>({
    defaultValues: { comment: "" },
    resolver: zodResolver(commentSchema),
  });

  const { comments, post } = postDetails;
  console.log(post);
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

  const foundPost = useFindPost(post_id)
  console.log(foundPost)

  const onSubmit = async (data) => {
    console.log("submit comment", data);
    try {
      const mario = await postComment(post_id, { text: data.comment });
      console.log(mario);
      if (mario) {
        dispatch(addComment({ post_id, data }))
      }
    } catch (error) {
      console.error("Error posting comment");
    }
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
          {comments.map((comment) => (
            <Comment key={comment.comment_id} comment={comment} />
          ))}
        </div>
      </form>
    </>
  );
};

export default SinglePost;
