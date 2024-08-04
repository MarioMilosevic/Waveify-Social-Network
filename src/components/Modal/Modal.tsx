import styles from "./Modal.module.css";
import PostButton from "../PostButton/PostButton";
import Input from "../Input/Input";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
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
import { PostResponseType } from "../../utils/types";
import { useSinglePost } from "../../hooks/useSinglePost";

// function useSinglePost(postId) {
//   const [loading, setLoading] = useState(true);
//   const [postDetails, setPostDetails] = useState<PostResponseType>();
//   useEffect(() => {
//     const fetchPostComments = async () => {
//       try {
//         const response = await getPostComments(postId);
//         setPostDetails(response);
//       } catch (error) {
//         console.error("Error fetching post comments:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPostComments();
//   }, [postId]);
//   return {
//     loading,
//     postDetails,
//   };
// }

const Modal = ({ setModalActive, postId }) => {
  // const [loading, setLoading] = useState(true);
  // const [postDetails, setPostDetails] = useState<PostResponseType>();
  const [comment, setComment] = useState("");

  const { loading, postDetails } = useSinglePost(postId);

  // useEffect(() => {
  //   const fetchPostComments = async () => {
  //     try {
  //       const response = await getPostComments(postId);
  //       setPostDetails(response);
  //     } catch (error) {
  //       console.error("Error fetching post comments:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPostComments();
  // }, [postId]);

  const { register, handleSubmit } = useForm<CommentValue>({
    defaultValues: { comment: "" },
    resolver: zodResolver(commentSchema),
  });

  const closeModal = () => {
    setModalActive(false);
  };

  const onSubmit = (data) => {
    console.log("submit comment", data);
  };

  if (loading) {
    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <LoadingSpinner size="normal" />
        </div>
      </div>
    );
  }

  const { comments, post } = postDetails;
  const { created_at, image, liked, likes, text, user } = post;
  const formattedDate = formatDate(created_at);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <AiOutlineClose className={styles.close_button} onClick={closeModal} />
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
            {comments.map((comment) => (
              <Comment comment={comment} />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;


/** 
 U post trebam da napravim logiku za otvaranje i zatvaranje MODALA 
 U MODAL samo da renderujem children
 Children da bude <SinglePost/> u njoj sva logika koja je trenutno u MODAL-u

 
 
*/
