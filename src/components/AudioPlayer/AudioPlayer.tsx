import { AudioPlayerProps } from "../../utils/types";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import styles from "./AudioPlayer.module.css";
import { useState, useRef, useEffect } from "react";
import { formatTime } from "../../utils/helperFunction";

const AudioPlayer = ({ audio }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<string>("0:00");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audio);
    }

    const handleAudioEnd = () => {
      setIsPlaying(false);
      setProgress(0);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleAudioEnd);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleAudioEnd);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audio]);

  const updateProgress = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      const audioDuration =
        duration === Infinity ? "0:00" : `${formatTime(duration)}`;
      setAudioDuration(audioDuration);
      const progressPercentage = (currentTime / duration) * 100;
      setProgress(progressPercentage);

      animationRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      // setMario(formatTime(audioRef.current.currentTime));
      audioRef.current.play();
      setIsPlaying(true);
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  return (
    <div className={styles.container}>
      {isPlaying ? (
        <FaPauseCircle className={styles.pause_icon} onClick={pauseAudio} />
      ) : (
        <FaPlayCircle className={styles.play_icon} onClick={playAudio} />
      )}
      <input
        type="range"
        className={styles.range}
        min={0}
        max={100}
        value={progress}
        readOnly
      />
      <div className={styles.duration_container}>
        <span>
          {audioRef.current ? formatTime(audioRef.current.currentTime) : "0:00"}
        </span>
        <span>/</span>
        <span>{audioDuration}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
