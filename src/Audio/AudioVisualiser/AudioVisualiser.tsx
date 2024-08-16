import { useEffect, useRef, useState } from "react";
import styles from "./AudioVisualiser.module.css";

const AudioVisualiser = () => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  
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
  }, []);

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start()
      mediaRecorder.ondataavailable = e => {
        setAudioChunks((prev) => [...prev, e.data])
      }
    }
  }

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop()
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" })
        const audioUrl = URL.createObjectURL(audioBlob)
        console.log("audioUrl", audioUrl)
        setAudioURL(audioUrl)
        setAudioChunks([])
      }
    }
  }

  const playRecording = () => {
    if (audioURL) {
      const audio = new Audio(audioURL)
      audio.play()
    }
  }

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
      <audio ref={audioRef} className={styles.audio} />
    </div>
  );
};

export default AudioVisualiser;
