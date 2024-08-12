import styles from "./SinglePost.module.css";
import UserHeader from "../UserHeader/UserHeader";
import Input from "../Input/Input";
import PostButton from "../PostButton/PostButton";
import Comment from "../Comment/Comment";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate, /*updateUser*/ } from "../../utils/helperFunction";
import { postComment } from "../../utils/api";
import { commentSchema } from "../../utils/zod";
import { CommentValue } from "../../utils/zod";
import { IoIosSend } from "react-icons/io";
import { buttonIconSize } from "../../utils/constants";
import { success } from "../../utils/toasts";
import { useSinglePost } from "../../hooks/useSinglePost";
import { useDispatch } from "react-redux";
import { updateComment, toggleLike } from "../../redux/features/userSlice";
import { like } from "../../utils/api";
import { SinglePostProps } from "../../utils/types";

const SinglePost = ({ postId }: SinglePostProps) => {
  const { loading, postDetails, setPostDetails } = useSinglePost(postId);
  const [comment, setComment] = useState("");
  const { register, handleSubmit } = useForm<CommentValue>({
    defaultValues: { comment: "" },
    resolver: zodResolver(commentSchema),
  });
  const dispatch = useDispatch();

  if (loading) return <LoadingSpinner size="normal" />;

  if (!postDetails) return;

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
  const formattedDate = formatDate(created_at || "");

  const onSubmit = async (data: { comment: string }) => {
    try {
      const { comment: postedComment } = await postComment(post_id, {
        text: data.comment,
      });
      // const updatedComment = updateUser(postedComment)

      setComment("");
      if (postedComment) {
        dispatch(updateComment({ postId, action: "increment" }));
        setPostDetails((prev) => {
          if (!prev) return prev;
          // const updatedComments = [...prev.comments, updatedComment];
          const updatedComments = [...prev.comments, postedComment];
          return {
            ...prev,
            comments: updatedComments,
          };
        });
      }
    } catch (error) {
      console.error("Error posting comment");
    }
  };

  const removeUserCommentHandler = async (commentId: string) => {
    dispatch(updateComment({ postId, action: "decrement" }));
    setPostDetails((prev) => {
      if (!prev) return prev;
      const updatedComments = prev?.comments.filter(
        (comment) => comment.comment_id !== commentId
      );
      success();
      return {
        ...prev,
        comments: updatedComments,
      };
    });
  };

  const likeHandler = () => {
    like(post_id, liked ? "DELETE" : "POST");
    dispatch(toggleLike(post_id));
    setPostDetails((prev) => {
      if (!prev) return prev;
      const updatedLiked = !prev.post.liked;
      const updatedLikes = updatedLiked
        ? prev.post.likes + 1
        : prev.post.likes - 1;

      return {
        ...prev,
        post: {
          ...prev.post,
          liked: updatedLiked,
          likes: updatedLikes,
        },
      };
    });
  };

  return (
    <>
      <UserHeader user={postUser} formattedDate={formattedDate} />
      {/* napravit reusable komponentu USERiNFO ili userHandler sta god  props={small, normal itd}*/}
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
          likeHandler={likeHandler}
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
    </>
  );
};

export default SinglePost;


