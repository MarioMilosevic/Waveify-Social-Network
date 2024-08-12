import styles from "./NewPost.module.css";
import Input from "../Input/Input";
import { useUserSlice } from "../../hooks/useUserSlice";
import { FaMicrophone } from "react-icons/fa6";
import { useState } from "react";
import { createNewPost } from "../../utils/api";
import { textSchema, StatusValue } from "../../utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addUserPost } from "../../redux/features/userSlice";

const NewPost = () => {
  const { user } = useUserSlice();
  const [text, setText] = useState<string>("")
  const dispatch = useDispatch()

 const { register, handleSubmit } = useForm<StatusValue>({
   defaultValues: { text: "" },
   resolver: zodResolver(textSchema),
 });

  const onSubmit = async () => {
    const { post } = await createNewPost(text)
    dispatch(addUserPost(post))
    setText("")
  }  
  
  return (
      <div className={styles.container}>
        <div className={styles.text}>
          <img
            src={user.picture}
            alt={user.picture}
            className={styles.picture}
          />
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Input
              placeholder="What's happening"
              title=""
              type="text"
              value={text}
              changeHandler={(e) => setText(e.target.value)}
              zod={{ ...register("text") }}
            />
          </form>
        </div>
        <div className={styles.microphone_container}>
          <FaMicrophone className={styles.microphone_icon} />
          <button onClick={onSubmit}>New Post</button>
        </div>
      </div>
  );
};

export default NewPost;
