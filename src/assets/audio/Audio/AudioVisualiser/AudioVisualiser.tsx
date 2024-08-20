import { useEffect, useRef } from "react";
import { AudioVisualiserProps } from "../../../../utils/types";
import styles from "./AudioVisualiser.module.css";

const AudioVisualiser = ({ startRecording }: AudioVisualiserProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      let audioSource: MediaStreamAudioSourceNode | undefined;
      let analyser: AnalyserNode | undefined;

      const handleAudio = async () => {
        try {
          const audioCtx = new window.AudioContext();
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          audioSource = audioCtx.createMediaStreamSource(stream);
          analyser = audioCtx.createAnalyser();

          audioSource.connect(analyser);

          const audioElement = audioRef.current;
          if (audioElement) {
            audioElement.srcObject = stream;
          }

          analyser.fftSize = 64;
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          const barWidth = canvas.width / bufferLength *2;
          const barSpacing = 40;
          let barHeight: number;
          let x = 0;

          const scalingFactor = 5;
          const mainColor = getComputedStyle(document.documentElement)
            .getPropertyValue("--main-color")
            .trim();

          const animate = () => {
            x = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            analyser?.getByteFrequencyData(dataArray);
            for (let i = 0; i < bufferLength; i++) {
              barHeight = dataArray[i] * scalingFactor;
              ctx.fillStyle = mainColor;
              ctx.fillRect(
                x,
                canvas.height - barHeight,
                barWidth - barSpacing,
                barHeight
              );
              x += barWidth;
            }
            requestAnimationFrame(animate);
          };

          animate();
        } catch (err) {
          console.error("Error accessing the microphone", err);
        }
      };

      handleAudio();
      startRecording();
    }
  }, [startRecording]);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
      <audio ref={audioRef} />
    </div>
  );
};

export default AudioVisualiser;
