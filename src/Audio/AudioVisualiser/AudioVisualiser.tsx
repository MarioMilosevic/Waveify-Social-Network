import { useEffect, useRef } from "react";
import styles from "./AudioVisualiser.module.css"
import sound from "./acoustic-guitar-short-intro-ish-live-recording-163329.mp3";

const AudioVisualizer = () => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let audioSource;
    let analyser;

    const handleAudio = () => {
      const audio1 = audioRef.current;
      audio1.src = `${sound}`;
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audio1.play();
      audioSource = audioCtx.createMediaElementSource(audio1);
      analyser = audioCtx.createAnalyser();
      audioSource.connect(analyser);
      analyser.connect(audioCtx.destination);
      analyser.fftSize = 64;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const barWidth = canvas.width / bufferLength;
      let barHeight;
      let x = 0;

      const animate = () => {
        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i];
          ctx.fillStyle = "white";
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth;
        }
        requestAnimationFrame(animate);
      };

      animate();
    };

    const container = containerRef.current;
    container.addEventListener("click", handleAudio);

    // Cleanup on component unmount
    return () => {
      container.removeEventListener("click", handleAudio);
    };
  }, []);

  return (
    <div ref={containerRef} id="container" className={styles.container}>
      <canvas ref={canvasRef} id="canvas1" className={styles.canvas1}></canvas>
      <audio ref={audioRef} id="audio1" className={styles.audio1} />
    </div>
  );
};

export default AudioVisualizer;
