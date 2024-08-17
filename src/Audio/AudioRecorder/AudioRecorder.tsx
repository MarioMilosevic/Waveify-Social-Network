import { useState, useEffect } from "react";

const AudioRecorder = () => {
  const [canRecord, setCanRecord] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  useEffect(() => {
    const setupAudio = () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then(setupStream)
          .catch((err) => console.error("Error accessing microphone: ", err));
      } else {
        console.error("getUserMedia is not supported on this browser");
      }
    };
    const setupStream = (stream: MediaStream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e) =>
        setChunks((prev) => [...prev, e.data]);

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        setChunks([]);
        setAudioURL(window.URL.createObjectURL(blob));
      };

      setRecorder(mediaRecorder);
      setCanRecord(true);
    };
    setupAudio();
    return () => {
      if (recorder) {
        recorder.stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [recorder, chunks]);

  const toggleMic = () => {
    if (!canRecord || !recorder) return;

    if (isRecording) {
      console.log("zaustavi");
      recorder.stop();
      console.log(audioURL);
    } else {
      console.log("pokreni");
      recorder.start();
    }
    setIsRecording(!isRecording);
  };

  return (
    <div>
      <button onClick={toggleMic}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      {audioURL && <audio src={audioURL} controls />}
    </div>
  );
};

export default AudioRecorder;
