import styles from "./NewPost.module.css";
import Input from "../Input/Input";
import AudioPlayer from "../../Audio/AudioPlayer/AudioPlayer";
import DeleteButton from "../DeleteButton/DeleteButton";
import { useUserSlice } from "../../hooks/useUserSlice";
import { FaMicrophone } from "react-icons/fa6";
import { useState } from "react";
import { createNewPost } from "../../utils/api";
import { textSchema, StatusValue } from "../../utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addPostFromState } from "../../redux/features/posts.Slice";
import { NewPostDetails } from "../../utils/types";
import { initialNewPostState } from "../../utils/constants";

const NewPost = () => {
  const { user } = useUserSlice();
  const [newPostDetails, setNewPostDetails] =
    useState<NewPostDetails>(initialNewPostState);
  const [isRecordingAudio, setIsRecordingAudio] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm<StatusValue>({
    defaultValues: { text: "" },
    resolver: zodResolver(textSchema),
  });

  const newPostAudioHandler = (newAudio: string) => {
    setNewPostDetails((prev) => ({ ...prev, audio: newAudio }));
  };

  const onSubmit = async () => {
    const { post } = await createNewPost(newPostDetails);
    dispatch(addPostFromState(post));
    setNewPostDetails(initialNewPostState);
    setIsRecordingAudio(false)
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
            value={newPostDetails.text}
            changeHandler={(e) =>
              setNewPostDetails((prev) => ({
                ...prev,
                text: e.target.value,
              }))
            }
            zod={{ ...register("text") }}
          />
        </form>
      </div>
      {isRecordingAudio && (
        <AudioPlayer
          audio={newPostDetails.audio}
          newPostAudioHandler={newPostAudioHandler}
          isRecording={true}
        />
      )}
      <div className={styles.microphone_container}>
        {isRecordingAudio ? (
          <DeleteButton removeHandler={() => setIsRecordingAudio(false)} />
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
