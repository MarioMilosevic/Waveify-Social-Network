import { useEffect, useRef, useState } from "react";
import styles from "./AudioVisualiser.module.css";

const AudioVisualiser = ({startRecording}) => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  const [mediaRecorder, setMediaRecorder] = useState()
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let audioSource;
    let analyser;

    const handleAudio = async () => {
      try {
        const audioCtx = new (window.AudioContext ||
          window.webkitAudioContext)();
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioSource = audioCtx.createMediaStreamSource(stream);
        analyser = audioCtx.createAnalyser();

        audioSource.connect(analyser);

        // ovo je novo
        const audioElement = audioRef.current;
        audioElement.srcObject = stream;
        // audioElement.play()
        const newMediaRecorder = new MediaRecorder(stream)
        setMediaRecorder(newMediaRecorder)
        //
        analyser.fftSize = 64;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const barWidth = canvas.width / bufferLength;
        const barSpacing = 40;
        let barHeight;
        let x = 0;

        const scalingFactor = 3;

        const animate = () => {
          x = 0;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          analyser.getByteFrequencyData(dataArray);
          for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * scalingFactor;
            ctx.fillStyle = "red";
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
    startRecording()
  }, [startRecording]);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
      <audio ref={audioRef} className={styles.audio} />
    </div>
  );
};

export default AudioVisualiser;
