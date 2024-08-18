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
import { showToast } from "../../utils/toasts";
import { updateUserFromPost } from "../../utils/helperFunction";
import Button from "../Button/Button";

const NewPost = () => {
  const { user } = useUserSlice();
  const [newPostDetails, setNewPostDetails] =
    useState<NewPostDetails>(initialNewPostState);
  const [isRecordingAudio, setIsRecordingAudio] = useState<boolean>(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<StatusValue>({
    defaultValues: { text: "" },
    resolver: zodResolver(textSchema),
  });

  const newPostAudioHandler = (newAudio: string) => {
    setNewPostDetails((prev) => ({ ...prev, audio: newAudio }));
  };

const onSubmit = async () => {
  if (!newPostDetails.text) {
    showToast("Text cannot be empty!", "warning");
    return;
  }

  try {
    const { post } = await createNewPost(newPostDetails);
    const updatedUserPost = updateUserFromPost(post);
    dispatch(addPostFromState(updatedUserPost));
    setNewPostDetails(initialNewPostState);
    setIsRecordingAudio(false);
  } catch (error) {
    showToast("Error creating post", "error");
  }
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
          <div className={styles.delete_button_container}>
            <DeleteButton removeHandler={() => setIsRecordingAudio(false)} />
          </div>
        ) : (
          <div
            className={styles.microphone}
            onClick={() => setIsRecordingAudio(true)}
          >
            <FaMicrophone className={styles.microphone_icon} />
            <span className={styles.record_audio}>Record audio</span>
          </div>
        )}
        <div className={styles.new_post_button}>
        <Button text="New Post" isActive={isValid} clickHandler={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default NewPost;
