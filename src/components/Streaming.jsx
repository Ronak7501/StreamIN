// import React, { useEffect, useRef, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMicrophone, faVideo, faDesktop,faExpand } from '@fortawesome/free-solid-svg-icons';
// import './Streaming.css';

// const VideoCall = () => {
//   const videoRef = useRef();
//   const canvasRef = useRef();
//   const [localStream, setLocalStream] = useState(null);

//   useEffect(() => {
//     async function startVideoCall() {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         setLocalStream(stream);
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (error) {
//         console.error('Error accessing user media:', error);
//       }
//     }

//     startVideoCall();

//     return () => {
//       if (localStream) {
//         localStream.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, []);

//   const toggleAudio = () => {
//     if (localStream) {
//       localStream.getAudioTracks().forEach(track => {
//         track.enabled = !track.enabled;
//       });
//     }
//   };

//   const toggleVideo = () => {
//     if (localStream) {
//       localStream.getVideoTracks().forEach(track => {
//         track.enabled = !track.enabled;
//       });
//     }
//   };

//   const shareScreen = async () => {
//     try {
//       const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//       if (videoRef.current) {
//         videoRef.current.srcObject = screenStream;
//         setLocalStream(screenStream);
  
//         screenStream.oninactive = () => {
//           // Screen share stopped by the user
//           stopScreenShare();
//         };
//       }
//     } catch (error) {
//       console.error('Error sharing screen:', error);
//     }
//   };

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         setLocalStream(stream);
//       }
//     } catch (error) {
//       console.error('Error accessing camera:', error);
//     }
//   };
  
  
//   const stopScreenShare = () => {
//     if (videoRef.current) {
//       if (localStream) {
//         videoRef.current.srcObject = localStream;
//         setLocalStream(localStream);
//       } else {
//         startCamera(); // If localStream is not available, start the camera stream
//       }
//     }
//   };

// const [isVideoMaximized, setIsVideoMaximized] = useState(false);

// const videoElementClass = isVideoMaximized ? 'fullscreen-video' : '';

// const maximizeVideoFrame = () => {
//   const videoElement = videoRef.current;
//   if (videoElement) {
//     setIsVideoMaximized(!isVideoMaximized);
//   }
// };
  
// return (
 
//   <div className="relative">
//   <div className="video-container">
//     <video ref={videoRef} autoPlay playsInline muted className={videoElementClass} />
//     <canvas ref={canvasRef} width={640} height={480} style={{ display: 'none' }} />
//     <div className="overlay-container">
//       {/* Include your control icons here */}
//       <FontAwesomeIcon icon={faMicrophone} onClick={toggleAudio} className="p-5 text-blue-500 cursor-pointer" />
//       <FontAwesomeIcon icon={faVideo} onClick={toggleVideo} className="p-5 text-red-500 cursor-pointer" />
//       <FontAwesomeIcon icon={faDesktop} onClick={shareScreen} className="p-5 text-green-500 cursor-pointer" />
//       <FontAwesomeIcon icon={faExpand} onClick={maximizeVideoFrame} className="p-5 text-indigo-500 cursor-pointer" />
//     </div>
//   </div>
// </div>

// );}

// export default VideoCall;

import React, { useEffect, useState, useRef } from "react";


const CAMERA_CONSTRAINTS = {
  audio: true,
  video: { width: 960, height: 540 },
};


  const VideoCall = () => {
  const [connected, setConnected] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [streamKey, setStreamKey] = useState(null);
  const [shoutOut, setShoutOut] = useState("");

  const inputStreamRef = useRef();
  const videoRef = useRef();
  const canvasRef = useRef();
  const wsRef = useRef();
  const mediaRecorderRef = useRef();
  const requestAnimationRef = useRef();
  const nameRef = useRef();

  // State variables for video and canvas elements
  // const [videoElement, setVideoElement] = useState(null);
  // const [canvasElement, setCanvasElement] = useState(null);

  // Other state variables and useEffect hooks...

  const enableCamera = async () => {
    // Your existing implementation...
    inputStreamRef.current = await navigator.mediaDevices.getUserMedia(
      CAMERA_CONSTRAINTS
    );

    videoRef.current.srcObject = inputStreamRef.current;

    await videoRef.current.play();

    // We need to set the canvas height/width to match the video element.
    canvasRef.current.height = videoRef.current.clientHeight;
    canvasRef.current.width = videoRef.current.clientWidth;

    requestAnimationRef.current = requestAnimationFrame(updateCanvas);

    setCameraEnabled(true);
  };

  const updateCanvas = () => {
    if (videoRef.current.ended || videoRef.current.paused) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");

    ctx.drawImage(
      videoRef.current,
      0,
      0,
      videoRef.current.clientWidth,
      videoRef.current.clientHeight
    );

    ctx.fillStyle = "#ff0000";
    ctx.font = "40px monospace";
    ctx.fillText(`${nameRef.current}`, 250, 50);

    requestAnimationRef.current = requestAnimationFrame(updateCanvas);
  };

  const stopStreaming = () => {
    // Your existing implementation...
    mediaRecorderRef.current.stop();
    setStreaming(false);
  };

  const startStreaming = () => {
    // Your existing implementation...
    setStreaming(true);

    const protocol = window.location.protocol.replace("http", "ws");
    wsRef.current = new WebSocket(
      `${protocol}//${window.location.host}/rtmp?key=${streamKey}`
    );

    wsRef.current.addEventListener("open", function open() {
      setConnected(true);
    });

    wsRef.current.addEventListener("close", () => {
      setConnected(false);
      stopStreaming();
    });

    const videoOutputStream = canvasRef.current.captureStream(30); // 30 FPS

    // Let's do some extra work to get audio to join the party.
    // https://hacks.mozilla.org/2016/04/record-almost-everything-in-the-browser-with-mediarecorder/
    const audioStream = new MediaStream();
    const audioTracks = inputStreamRef.current.getAudioTracks();
    audioTracks.forEach(function (track) {
      audioStream.addTrack(track);
    });

    const outputStream = new MediaStream();
    [audioStream, videoOutputStream].forEach(function (s) {
      s.getTracks().forEach(function (t) {
        outputStream.addTrack(t);
      });
    });

    mediaRecorderRef.current = new MediaRecorder(outputStream, {
      mimeType: "video/webm",
      videoBitsPerSecond: 3000000,
    });

    mediaRecorderRef.current.addEventListener("dataavailable", (e) => {
      wsRef.current.send(e.data);
    });

    mediaRecorderRef.current.addEventListener("stop", () => {
      stopStreaming();
      wsRef.current.close();
    });

    mediaRecorderRef.current.start(1000);
  };

  useEffect(() => {
    nameRef.current = shoutOut;
  }, [shoutOut]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(requestAnimationRef.current);
    };
  },[]);

  return (
    <div style={{ maxWidth: "980px", margin: "0 auto" }}>
      

      {!cameraEnabled && (
        <button className="button button-outline" onClick={enableCamera}>
          Enable Camera
        </button>
      )}

      {cameraEnabled &&
        (streaming ? (
          <div>
            <span>{connected ? "Connected" : "Disconnected"}</span>
            <button className="button button-outline" onClick={stopStreaming}>
              Stop Streaming
            </button>
          </div>
        ) : (
          <>
            <input
              placeholder="Stream Key"
              type="text"
              onChange={(e) => setStreamKey(e.target.value)}
            />
            <button
              className="button button-outline"
              disabled={!streamKey}
              onClick={startStreaming}
            >
              Start Streaming
            </button>
          </>
        ))}
      <div className="row">
        <div className="column">
          <h2>Input</h2>
          <video
            ref={videoRef}
            controls
            width="100%"
            height="auto"
            muted
          ></video>
        </div>
        <div className="column">
          <canvas ref={canvasRef}></canvas>
          <h2>Output</h2>
          <input
          placeholder="Shout someone out!"
          type="text"
          onChange={(e) => setShoutOut(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
