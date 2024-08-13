import { AudioPlayerProps } from "../../utils/types";
import { FaPlayCircle } from "react-icons/fa";
import styles from "./AudioPlayer.module.css";

const AudioPlayer = ({ audio }: AudioPlayerProps) => {
  console.log(audio);

  const playAudio = () => {
    const audioSound = new Audio(audio);
    audioSound.play();
  };

  return (
    <div className={styles.container}>
      <FaPlayCircle className={styles.play_icon} onClick={playAudio} />
      <hr className={styles.hr} />
      {/* <div>
              <span>0:02 /</span>
              <span>0:02</span>
          </div> */}
    </div>
  );
};

export default AudioPlayer;
