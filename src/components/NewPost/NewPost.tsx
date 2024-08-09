import styles from "./NewPost.module.css";
import { useUserSlice } from "../../hooks/useUserSlice";
import { FaMicrophone } from "react-icons/fa6";
import { useState } from "react";
import { createNewPost } from "../../utils/api";
import { statusSchema, StatusValue } from "../../utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "../Input/Input";

const NewPost = () => {
  const { user } = useUserSlice();
  const [status, setStatus] = useState<string>("")

 const { register, handleSubmit } = useForm<StatusValue>({
   defaultValues: { status: "" },
   resolver: zodResolver(statusSchema),
 });

  const onSubmit = () => {
  console.log('kasnije')
}  
  return (
    <div className={styles.post}>
      <div className={styles.container}>
        <div className={styles.status}>
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
              value={status}
              changeHandler={(e) => setStatus(e.target.value)}
              zod={{ ...register("status") }}
            />
          </form>
        </div>
        <div className={styles.microphone_container}>
          <FaMicrophone className={styles.microphone_icon} />
          {/* <button onClick={() => console.log("")}>New Post</button> */}
          <button onClick={() => createNewPost(status)}>New Post</button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
