import styles from "./AudioPlayer.module.css";
import { AudioPlayerProps } from "../../../../utils/types";
import { FaPlayCircle, FaPauseCircle, FaStopCircle } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { formatTime } from "../../../../utils/helperFunction";
import AudioVisualizer from "../AudioVisualiser/AudioVisualiser";

const AudioPlayer = ({
  audio,
  isRecording,
  newPostAudioHandler,
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isRecordingState, setIsRecordingState] =
    useState<boolean>(isRecording);
  const [progress, setProgress] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<string>("0:00");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audio || "");
    }
    if (audioRef.current) {
      audioRef.current.src = audio || "";
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

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);
      if (newPostAudioHandler) {
        newPostAudioHandler(audioUrl);
      }
    };

    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecordingState(false);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
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
      {isRecordingState ? (
        <FaStopCircle className={styles.stop_icon} onClick={stopRecording} />
      ) : isPlaying ? (
        <FaPauseCircle className={styles.pause_icon} onClick={pauseAudio} />
      ) : (
        <FaPlayCircle className={styles.play_icon} onClick={playAudio} />
      )}
      <div className={styles.audio_container}>
        <input
          type="range"
          className={`${styles.range} ${isRecordingState && styles.recording}`}
          min={0}
          max={100}
          value={progress || 0}
          readOnly
        />
        {isRecordingState && (
          <div className={styles.audio_visualiser}>
            <AudioVisualizer startRecording={startRecording} />
          </div>
        )}
      </div>
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
