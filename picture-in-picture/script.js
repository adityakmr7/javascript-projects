const videoElement = document.getElementById("video");
const button = document.getElementById("button");
const btnRecord = document.getElementById("record");
// Prompt to select the media stream pass to video element then play
let mediaStream;
async function selectMediaStream() {
  try {
    // screen capture
    mediaStream = await navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: {
        mediaSource: "screen",
      },
    });
    
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    console.log(error);
  }
}
// picture in picture
button.addEventListener("click", async () => {
  button.disabled = true;
  // start picture in picture
  await videoElement.requestPictureInPicture();
  button.disabled = false;
});

// on load
selectMediaStream();
