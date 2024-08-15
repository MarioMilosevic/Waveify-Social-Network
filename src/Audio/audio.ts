// let canRecord = false;
// let isRecording = false;

// let recorder = null;

// let chunks = [];

// export const setupAudio = () => {
//   console.log("setup");
//   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//     navigator.mediaDevices
//       .getUserMedia({
//         audio: true,
//       })
//       .then(SetupStream)
//       .catch((err) => {
//         console.error(err);
//       });
//   }
// };

// const SetupStream = (stream) => {
//   recorder = new MediaRecorder(stream);
//   recorder.ondataavailable = (e) => {
//     chunks.push(e.data);
//   };

//   recorder.onstop = (e) => {
//     const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
//     chunks = [];
//     const audioURL = window.URL.createObjectURL(blob);
//     // playback.src = audioURL
//   };
//   canRecord = true;
// };

// export const toggleMic = () => {
//   if (!canRecord) return;
//   isRecording = !isRecording;
//   if (isRecording) {
//     recorder.start();
//   } else {
//     recorder.stop();
//   }
// };
