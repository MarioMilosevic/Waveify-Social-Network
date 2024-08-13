import { AudioPlayerProps } from "../../utils/types";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import styles from "./AudioPlayer.module.css";
import { useState, useRef } from "react";

const AudioPlayer = ({ audio }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audio);
    }
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={styles.container}>
      {isPlaying ? (
        <FaPauseCircle className={styles.pause_icon} onClick={handlePause} />
      ) : (
        <FaPlayCircle className={styles.play_icon} onClick={handlePlay} />
      )}
      <input type="range" className={styles.range} min={0.0} max={0.0} />
      <div className={styles.duration_container}>
        <span>0:02</span>
        <span>/</span>
        <span>0:02</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
