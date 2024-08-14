import styles from "./NewPost.module.css";
import Input from "../Input/Input";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import { useUserSlice } from "../../hooks/useUserSlice";
import { FaMicrophone } from "react-icons/fa6";
import { useState } from "react";
import { createNewPost } from "../../utils/api";
import { textSchema, StatusValue } from "../../utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addPostFromState } from "../../redux/features/posts.Slice";
import DeleteButton from "../DeleteButton/DeleteButton";

const NewPost = () => {
  const { user } = useUserSlice();
  const [text, setText] = useState<string>("");
  const [isRecordingAudio, setIsRecordingAudio] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm<StatusValue>({
    defaultValues: { text: "" },
    resolver: zodResolver(textSchema),
  });

  const onSubmit = async () => {
    const { post } = await createNewPost(text);
    dispatch(addPostFromState(post));
    setText("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <img src={user.picture} alt={user.picture} className={styles.picture} />
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
      {isRecordingAudio && <AudioPlayer audio="" />}
      <div className={styles.microphone_container}>
        {isRecordingAudio ? (
          <DeleteButton removeHandler={() => setIsRecordingAudio(false)}/>
        ) : (
          <FaMicrophone
            className={styles.microphone_icon}
            onClick={() => setIsRecordingAudio(true)}
          />
        )}

        <button className={styles.new_post_button} onClick={onSubmit}>
          New Post
        </button>
      </div>
    </div>
  );
};

export default NewPost;
