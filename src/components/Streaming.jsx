// import React, { useEffect, useState, useRef } from "react";


// const CAMERA_CONSTRAINTS = {
//   audio: true,
//   video: { width: 960, height: 540 },
// };


//   const VideoCall = () => {
//   const [connected, setConnected] = useState(false);
//   const [cameraEnabled, setCameraEnabled] = useState(false);
//   const [streaming, setStreaming] = useState(false);
//   const [streamKey, setStreamKey] = useState("");
//   const [rtmpUrl, setrtmpUrl] = useState("");
//   const [isStreamKeyValid, setIsStreamKeyValid] = useState(false);
//   const [shoutOut, setShoutOut] = useState("");

//   const inputStreamRef = useRef();
//   const videoRef = useRef();
//   const canvasRef = useRef();
//   const wsRef = useRef();
//   const mediaRecorderRef = useRef();
//   const requestAnimationRef = useRef();
//   const nameRef = useRef();

//   // State variables for video and canvas elements
//   // const [videoElement, setVideoElement] = useState(null);
//   // const [canvasElement, setCanvasElement] = useState(null);

//   // Other state variables and useEffect hooks...

//   const enableCamera = async () => {
//     // Your existing implementation...
//     inputStreamRef.current = await navigator.mediaDevices.getUserMedia(
//       CAMERA_CONSTRAINTS
//     );

//     videoRef.current.srcObject = inputStreamRef.current;

//     await videoRef.current.play();

//     // We need to set the canvas height/width to match the video element.
//     canvasRef.current.height = videoRef.current.clientHeight;
//     canvasRef.current.width = videoRef.current.clientWidth;

//     requestAnimationRef.current = requestAnimationFrame(updateCanvas);

//     setCameraEnabled(true);
//   };

//   const updateCanvas = () => {
//     if (videoRef.current.ended || videoRef.current.paused) {
//       return;
//     }

//     const ctx = canvasRef.current.getContext("2d");

//     ctx.drawImage(
//       videoRef.current,
//       0,
//       0,
//       videoRef.current.clientWidth,
//       videoRef.current.clientHeight
//     );

//     ctx.fillStyle = "#ff0000";
//     ctx.font = "40px monospace";
//     ctx.fillText(`${nameRef.current}`, 250, 50);

//     requestAnimationRef.current = requestAnimationFrame(updateCanvas);
//   };

//   const stopStreaming = () => {
//     // Your existing implementation...
//     mediaRecorderRef.current.stop();
//     setStreaming(false);
//   };

//   const startStreaming = () => {
   
//     setStreaming(true)
    
//     const protocol = window.location.protocol.replace("http", "ws");
//     const websocketURL = `${protocol}//${window.location.host}/rtmp?key=${streamKey}&rtmpUrl=${rtmpUrl}`;
//     wsRef.current = new WebSocket(websocketURL);

//     console.log(websocketURL);
   
//     // const protocol = window.location.protocol.replace("http", "ws");
//     // wsRef.current = new WebSocket(
//     //   `${protocol}//${window.location.host}/rtmp?key=${streamKey}`
//     // );

//     wsRef.current.addEventListener("open", function open() {
//       setConnected(true);
//     });

//     wsRef.current.addEventListener("close", () => {
//       setConnected(false);
//       stopStreaming();
//     });

//     const videoOutputStream = canvasRef.current.captureStream(30); // 30 FPS

//     // Let's do some extra work to get audio to join the party.
//     // https://hacks.mozilla.org/2016/04/record-almost-everything-in-the-browser-with-mediarecorder/
//     const audioStream = new MediaStream();
//     const audioTracks = inputStreamRef.current.getAudioTracks();
//     audioTracks.forEach(function (track) {
//       audioStream.addTrack(track);
//     });

//     const outputStream = new MediaStream();
//     [audioStream, videoOutputStream].forEach(function (s) {
//       s.getTracks().forEach(function (t) {
//         outputStream.addTrack(t);
//       });
//     });

//     mediaRecorderRef.current = new MediaRecorder(outputStream, {
//       mimeType: "video/webm",
//       videoBitsPerSecond: 3000000,
//     });

//     mediaRecorderRef.current.addEventListener("dataavailable", (e) => {
//       wsRef.current.send(e.data);
//     });

//     mediaRecorderRef.current.addEventListener("stop", () => {
//       stopStreaming();
//       wsRef.current.close();
//     });

//     mediaRecorderRef.current.start(1000);
//   };

//   useEffect(() => {
//     nameRef.current = shoutOut;
//   }, [shoutOut]);

//   useEffect(() => {
//     return () => {
//       cancelAnimationFrame(requestAnimationRef.current);
//     };
//   },[]);

//   const handleStreamKeyChange = (e) => {
//     const value = e.target.value;
//     setStreamKey(value);

//     if (value.length >= 16) {
//       setIsStreamKeyValid(true);
//       console.log(value);
//     } else {
//       setIsStreamKeyValid(false);
//     }
//   };


//   return (
//     <div style={{ maxWidth: "980px", margin: "0 auto" }}>
      

      // {!cameraEnabled && (
      //   <button className="button button-outline" onClick={enableCamera}>
      //     Enable Camera
      //   </button>
      // )}

      // {cameraEnabled &&
      //   (streaming ? (
      //     <div>
      //       <span>{connected ? "Connected" : "Disconnected"}</span>
      //       <button className="button button-outline ml-2" onClick={stopStreaming}>
      //         Stop Streaming
      //       </button>
      //     </div>
      //   ) : (
      //     <>
      //       <input
      //         required
      //         placeholder="Stream Key"
      //         type="text"
      //         value={streamKey}
      //         onChange={handleStreamKeyChange}
      //         // onChange={(e) => setStreamKey(e.target.value)}
      //       />
      //       <input
      //         required
      //         placeholder="RTMP Link"
      //         type="text"
      //         value={rtmpUrl}
      //         // onChange={handleStreamKeyChange}
      //         onChange={(e) => setrtmpUrl(e.target.value)}
      //       />
      //       <button
      //         className="button button-outline mt-2"
      //         disabled={!streamKey || !isStreamKeyValid}
      //         onClick={startStreaming}
              
      //       >
      //         Start Streaming
      //       </button>
      //     </>
      //   ))}
//       <div className="row">
//         <div className="column">
//           <h2>Input</h2>
//           <video
//             ref={videoRef}
//             controls
//             width="100%"
//             height="auto"
//             muted
//           ></video>
//         </div>
//         <div className="column">
//           <canvas ref={canvasRef}></canvas>
//           <h2>Output</h2>
//           <input
//           placeholder="Enter your message!"
//           type="text"
//           onChange={(e) => setShoutOut(e.target.value)}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoCall;


import React, { useEffect, useState, useRef } from "react";


const CAMERA_CONSTRAINTS = {
  audio: true,
  video: { width: 1280, height: 720, frameRate: { ideal: 30, max: 60 } },
};


  const VideoCall = () => {
  const [connected, setConnected] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [streamKey, setStreamKey] = useState("");
  const [rtmpUrl, setrtmpUrl] = useState("");
  const [isStreamKeyValid, setIsStreamKeyValid] = useState(false);
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
   
    setStreaming(true)
    
    const protocol = window.location.protocol.replace("http", "ws");
    const websocketURL = `${protocol}//${window.location.host}/rtmp?key=${streamKey}&rtmpUrl=${rtmpUrl}`;
    wsRef.current = new WebSocket(websocketURL);

    console.log(websocketURL);
   
    // const protocol = window.location.protocol.replace("http", "ws");
    // wsRef.current = new WebSocket(
    //   `${protocol}//${window.location.host}/rtmp?key=${streamKey}`
    // );

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
      videoBitsPerSecond: 5000000,
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

  const handleStreamKeyChange = (e) => {
    const value = e.target.value;
    setStreamKey(value);

    if (value.length >= 16) {
      setIsStreamKeyValid(true);
      console.log(value);
    } else {
      setIsStreamKeyValid(false);
    }
  };


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
            <button className="button button-outline ml-2" onClick={stopStreaming}>
              Stop Streaming
            </button>
          </div>
        ) : (
          <>
          <label htmlFor="streamName" className="font-bold">
          Enter youtube's Stream Key
        </label>
            <input
              required
              placeholder="Stream Key"
              type="text"
              value={streamKey}
              onChange={handleStreamKeyChange}
              // onChange={(e) => setStreamKey(e.target.value)}
            />
            <label htmlFor="streamName" className="font-bold">
            Enter youtube's Stream URL
              </label>
            <input
              required
              placeholder="RTMP Link"
              type="text"
              value={rtmpUrl}
              // onChange={handleStreamKeyChange}
              onChange={(e) => setrtmpUrl(e.target.value)}
            />
            <button
              className="button button-outline mt-2"
              disabled={!streamKey || !isStreamKeyValid}
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
          placeholder="Enter your message!"
          type="text"
          onChange={(e) => setShoutOut(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCall;


// import React, { useEffect, useState, useRef } from "react";

// const CAMERA_CONSTRAINTS = {
//   audio: true,
//   video: { width: 1280, height: 720, frameRate: { ideal: 30, max: 60 } },
// };

// const VideoCall = () => {
//   const [connected, setConnected] = useState(false);
//   const [cameraEnabled, setCameraEnabled] = useState(false);
//   const [streaming, setStreaming] = useState(false);
//   const [streamKey, setStreamKey] = useState("");
//   const [rtmpUrl, setRtmpUrl] = useState("");
//   const [isStreamKeyValid, setIsStreamKeyValid] = useState(false);
//   const [shoutOut, setShoutOut] = useState("");

//   const inputStreamRef = useRef();
//   const videoRef = useRef();
//   const canvasRef = useRef();
//   const wsRef = useRef();
//   const mediaRecorderRef = useRef();
//   const requestAnimationRef = useRef();
//   const nameRef = useRef();

//   const enableCamera = async () => {
//     inputStreamRef.current = await navigator.mediaDevices.getUserMedia(
//       CAMERA_CONSTRAINTS
//     );

//     videoRef.current.srcObject = inputStreamRef.current;

//     await videoRef.current.play();

//     canvasRef.current.height = videoRef.current.clientHeight;
//     canvasRef.current.width = videoRef.current.clientWidth;

//     requestAnimationRef.current = requestAnimationFrame(updateCanvas);
//     setCameraEnabled(true);
//   };

//   const updateCanvas = () => {
//     if (videoRef.current.ended || videoRef.current.paused) {
//       return;
//     }

//     const ctx = canvasRef.current.getContext("2d");

//     ctx.drawImage(
//       videoRef.current,
//       0,
//       0,
//       videoRef.current.clientWidth,
//       videoRef.current.clientHeight
//     );

//     ctx.fillStyle = "#ff0000";
//     ctx.font = "40px monospace";
//     ctx.fillText(`${nameRef.current}`, 250, 50);

//     requestAnimationRef.current = requestAnimationFrame(updateCanvas);
//   };

//   const stopStreaming = () => {
//     mediaRecorderRef.current.stop();
//     setStreaming(false);
//   };

//   const startStreaming = () => {
//     setStreaming(true);
//     enableCamera();
//     cameraEnabled(true);
//     const protocol = window.location.protocol.replace("http", "ws");
//     const websocketURL = `${protocol}//${window.location.host}/rtmp?key=${streamKey}&rtmpUrl=${rtmpUrl}`;
//     wsRef.current = new WebSocket(websocketURL);

//     wsRef.current.addEventListener("open", function open() {
//       setConnected(true);
//     });

//     wsRef.current.addEventListener("close", () => {
//       setConnected(false);
//       stopStreaming();
//     });

//     const videoOutputStream = canvasRef.current.captureStream(30);

//     const audioStream = new MediaStream();
//     const audioTracks = inputStreamRef.current.getAudioTracks();
//     audioTracks.forEach(function (track) {
//       audioStream.addTrack(track);
//     });

//     const outputStream = new MediaStream();
//     [audioStream, videoOutputStream].forEach(function (s) {
//       s.getTracks().forEach(function (t) {
//         outputStream.addTrack(t);
//       });
//     });

//     mediaRecorderRef.current = new MediaRecorder(outputStream, {
//       mimeType: "video/webm",
//       videoBitsPerSecond: 5000000,
//     });

//     mediaRecorderRef.current.addEventListener("dataavailable", (e) => {
//       wsRef.current.send(e.data);
//     });

//     mediaRecorderRef.current.addEventListener("stop", () => {
//       stopStreaming();
//       wsRef.current.close();
//     });

//     mediaRecorderRef.current.start(1000);
//   };

//   useEffect(() => {
//     nameRef.current = shoutOut;
//   }, [shoutOut]);

//   useEffect(() => {
//     return () => {
//       cancelAnimationFrame(requestAnimationRef.current);
//     };
//   }, []);

//   const handleStreamKeyChange = (e) => {
//     const value = e.target.value;
//     setStreamKey(value);

//     if (value.length >= 16) {
//       setIsStreamKeyValid(true);
//     } else {
//       setIsStreamKeyValid(false);
//     }
//   };

//   const handleStartStreaming = () => {
//     if (streamKey && isStreamKeyValid) {
//       startStreaming();
//       setCameraEnabled(true);
//     } else {
//       alert("Please enter a valid stream key and URL.");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "980px", margin: "0 auto" }}>
//       {cameraEnabled && (
//         <div>
//           <span>{connected ? "Connected" : "Disconnected"}</span>
//           <button className="button button-outline ml-2" onClick={stopStreaming}>
//             Stop Streaming
//           </button>
//         </div>
//       )}

//       {!cameraEnabled && (
//         <div>
//           <label htmlFor="streamKey">Enter YouTube Stream Key:</label>
//           <input
//             id="streamKey"
//             type="text"
//             value={streamKey}
//             onChange={handleStreamKeyChange}
//           />
//           <label htmlFor="rtmpUrl">Enter YouTube RTMP URL:</label>
//           <input
//             id="rtmpUrl"
//             type="text"
//             value={rtmpUrl}
//             onChange={(e) => setRtmpUrl(e.target.value)}
//           />
//           <button onClick={handleStartStreaming}>Start Streaming</button>
//         </div>
//       )}

//       {cameraEnabled && streaming && (
//         <div className="row">
//           <div className="column">
//             <h2>Input</h2>
//             <video
//               ref={videoRef}
//               controls
//               width="100%"
//               height="auto"
//               muted
//             ></video>
//           </div>
//           <div className="column">
//             <canvas ref={canvasRef}></canvas>
//             <h2>Output</h2>
//             <input
//               placeholder="Enter your message!"
//               type="text"
//               onChange={(e) => setShoutOut(e.target.value)}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoCall;

// import React, { useEffect, useState, useRef } from "react";

// const CAMERA_CONSTRAINTS = {
//   audio: true,
//   video: { width: 1280, height: 720, frameRate: { ideal: 30, max: 60 } },
// };

// const VideoCall = () => {
//   const [connected, setConnected] = useState(false);
//   const [cameraEnabled, setCameraEnabled] = useState(false);
//   const [streaming, setStreaming] = useState(false);
//   const [streamKey, setStreamKey] = useState("");
//   const [rtmpUrl, setRtmpUrl] = useState("");
//   const [isStreamKeyValid, setIsStreamKeyValid] = useState(false);
//   const [shoutOut, setShoutOut] = useState("");

//   const inputStreamRef = useRef();
//   const videoRef = useRef();
//   const canvasRef = useRef();
//   const wsRef = useRef();
//   const mediaRecorderRef = useRef();
//   const requestAnimationRef = useRef();
//   const nameRef = useRef();

//   const enableCamera = async () => {
//     inputStreamRef.current = await navigator.mediaDevices.getUserMedia(
//       CAMERA_CONSTRAINTS
//     );

//     videoRef.current.srcObject = inputStreamRef.current;

//     await videoRef.current.play();

//     canvasRef.current.height = videoRef.current.clientHeight;
//     canvasRef.current.width = videoRef.current.clientWidth;

//     requestAnimationRef.current = requestAnimationFrame(updateCanvas);
//     setCameraEnabled(true);
//   };

//   const updateCanvas = () => {
//     if (videoRef.current.ended || videoRef.current.paused) {
//       return;
//     }

//     const ctx = canvasRef.current.getContext("2d");

//     ctx.drawImage(
//       videoRef.current,
//       0,
//       0,
//       videoRef.current.clientWidth,
//       videoRef.current.clientHeight
//     );

//     ctx.fillStyle = "#ff0000";
//     ctx.font = "40px monospace";
//     ctx.fillText(`${nameRef.current}`, 250, 50);

//     requestAnimationRef.current = requestAnimationFrame(updateCanvas);
//   };

//   const stopStreaming = () => {
//     mediaRecorderRef.current.stop();
//     setStreaming(false);
//   };

//   const startStreaming = () => {
//     setStreaming(true);
//     const protocol = window.location.protocol.replace("http", "ws");
//     const websocketURL = `${protocol}//${window.location.host}/rtmp?key=${streamKey}&rtmpUrl=${rtmpUrl}`;
//     wsRef.current = new WebSocket(websocketURL);
  
//     wsRef.current.addEventListener("open", function open() {
//       setConnected(true);
//     });
  
//     wsRef.current.addEventListener("close", () => {
//       setConnected(false);
//       stopStreaming();
//     });
  
//     // Check if canvasRef.current is defined before calling captureStream
//     if (canvasRef.current) {
//       const videoOutputStream = canvasRef.current.captureStream(30);
  
//       const audioStream = new MediaStream();
//       const audioTracks = inputStreamRef.current.getAudioTracks();
//       audioTracks.forEach(function (track) {
//         audioStream.addTrack(track);
//       });
  
//       const outputStream = new MediaStream();
//       [audioStream, videoOutputStream].forEach(function (s) {
//         s.getTracks().forEach(function (t) {
//           outputStream.addTrack(t);
//         });
//       });
  
//       mediaRecorderRef.current = new MediaRecorder(outputStream, {
//         mimeType: "video/webm",
//         videoBitsPerSecond: 5000000,
//       });
  
//       mediaRecorderRef.current.addEventListener("dataavailable", (e) => {
//         wsRef.current.send(e.data);
//       });
  
//       mediaRecorderRef.current.addEventListener("stop", () => {
//         stopStreaming();
//         wsRef.current.close();
//       });
  
//       mediaRecorderRef.current.start(1000);
//     }
//   };
  

//   useEffect(() => {
//     nameRef.current = shoutOut;
//   }, [shoutOut]);

//   useEffect(() => {
//     return () => {
//       cancelAnimationFrame(requestAnimationRef.current);
//     };
//   }, []);

//   const handleStreamKeyChange = (e) => {
//     const value = e.target.value;
//     setStreamKey(value);

//     if (value.length >= 16) {
//       setIsStreamKeyValid(true);
//     } else {
//       setIsStreamKeyValid(false);
//     }
//   };

//   const handleStartStreaming = () => {
//     if (streamKey && isStreamKeyValid && rtmpUrl) {
//       startStreaming();
//       setCameraEnabled(true); // Set cameraEnabled to true here
//       console.log("Start streaming button clicked");
//       console.log("Camera enabled:", cameraEnabled);
//       console.log("Streaming:", streaming);
//     } else {
//       alert("Please enter a valid stream key and URL.");
//     }
//   };

//   console.log("Camera enabled:", cameraEnabled);
//   console.log("Streaming:", streaming);

//   return (
//     <div style={{ maxWidth: "980px", margin: "0 auto" }}>
//       {!cameraEnabled && (
//         <div>
//           <label htmlFor="streamKey">Enter YouTube Stream Key:</label>
//           <input
//             id="streamKey"
//             type="text"
//             value={streamKey}
//             onChange={handleStreamKeyChange}
//           />
//           <label htmlFor="rtmpUrl">Enter YouTube RTMP URL:</label>
//           <input
//             id="rtmpUrl"
//             type="text"
//             value={rtmpUrl}
//             onChange={(e) => setRtmpUrl(e.target.value)}
//           />
//           <button className="button button-outline"onClick={handleStartStreaming}>Start Streaming</button>
//         </div>
//       )}

    
//       {cameraEnabled && streaming && (
        
//         <div className="row">
//           <div className="column">
          
//         <button className="button button-outline" onClick={enableCamera}>
//           Enable Camera
//         </button>
          
//             <h2>Input</h2>
//             <video
//               ref={videoRef}
//               controls
//               width="100%"
//               height="auto"
//               muted
//             ></video>
//           </div>
//           <div className="column">
//             <canvas ref={canvasRef}></canvas>
//             <h2>Output</h2>
//             <input
//               placeholder="Enter your message!"
//               type="text"
//               onChange={(e) => setShoutOut(e.target.value)}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoCall;

// import React, { useEffect, useState, useRef } from "react";

// const CAMERA_CONSTRAINTS = {
//   audio: true,
//   video: { width: 1280, height: 720, frameRate: { ideal: 30, max: 60 } },
// };

// const VideoCall = () => {
//   const [connected, setConnected] = useState(false);
//   const [cameraEnabled, setCameraEnabled] = useState(false);
//   const [streaming, setStreaming] = useState(false);
//   const [streamKey, setStreamKey] = useState("");
//   const [rtmpUrl, setRtmpUrl] = useState("");
//   const [isStreamKeyValid, setIsStreamKeyValid] = useState(false);
//   const [shoutOut, setShoutOut] = useState("");
//   const [cameraIsActive, setCameraIsActive] = useState(false); // New state variable

//   const inputStreamRef = useRef();
//   const videoRef = useRef();
//   const canvasRef = useRef();
//   const wsRef = useRef();
//   const mediaRecorderRef = useRef();
//   const requestAnimationRef = useRef();
//   const nameRef = useRef();

//   const enableCamera = async () => {
//     inputStreamRef.current = await navigator.mediaDevices.getUserMedia(
//       CAMERA_CONSTRAINTS
//     );

//     videoRef.current.srcObject = inputStreamRef.current;

//     await videoRef.current.play();

//     canvasRef.current.height = videoRef.current.clientHeight;
//     canvasRef.current.width = videoRef.current.clientWidth;

//     requestAnimationRef.current = requestAnimationFrame(updateCanvas);
//     setCameraEnabled(true);
//     setCameraIsActive(true); // Set camera active when enabled
//   };

//   const updateCanvas = () => {
//     if (videoRef.current.ended || videoRef.current.paused) {
//       return;
//     }

//     const ctx = canvasRef.current.getContext("2d");

//     ctx.drawImage(
//       videoRef.current,
//       0,
//       0,
//       videoRef.current.clientWidth,
//       videoRef.current.clientHeight
//     );

//     ctx.fillStyle = "#ff0000";
//     ctx.font = "40px monospace";
//     ctx.fillText(`${nameRef.current}`, 250, 50);

//     requestAnimationRef.current = requestAnimationFrame(updateCanvas);
//   };

//   const stopStreaming = () => {
//     mediaRecorderRef.current.stop();
//     setStreaming(false);
//   };

//   const startStreaming = () => {
//     setStreaming(true);
//     const protocol = window.location.protocol.replace("http", "ws");
//     const websocketURL = `${protocol}//${window.location.host}/rtmp?key=${streamKey}&rtmpUrl=${rtmpUrl}`;
//     wsRef.current = new WebSocket(websocketURL);
  
//     wsRef.current.addEventListener("open", function open() {
//       setConnected(true);
//     });
  
//     wsRef.current.addEventListener("close", () => {
//       setConnected(false);
//       stopStreaming();
//     });
  
//     // Check if canvasRef.current is defined before calling captureStream
//     if (canvasRef.current) {
//       const videoOutputStream = canvasRef.current.captureStream(30);
  
//       const audioStream = new MediaStream();
//       const audioTracks = inputStreamRef.current.getAudioTracks();
//       audioTracks.forEach(function (track) {
//         audioStream.addTrack(track);
//       });
  
//       const outputStream = new MediaStream();
//       [audioStream, videoOutputStream].forEach(function (s) {
//         s.getTracks().forEach(function (t) {
//           outputStream.addTrack(t);
//         });
//       });
  
//       mediaRecorderRef.current = new MediaRecorder(outputStream, {
//         mimeType: "video/webm",
//         videoBitsPerSecond: 5000000,
//       });
  
//       mediaRecorderRef.current.addEventListener("dataavailable", (e) => {
//         wsRef.current.send(e.data);
//       });
  
//       mediaRecorderRef.current.addEventListener("stop", () => {
//         stopStreaming();
//         wsRef.current.close();
//       });
  
//       mediaRecorderRef.current.start(1000);
//     }
//   };

//   useEffect(() => {
//     nameRef.current = shoutOut;
//   }, [shoutOut]);

//   useEffect(() => {
//     return () => {
//       cancelAnimationFrame(requestAnimationRef.current);
//     };
//   }, []);

//   const handleStreamKeyChange = (e) => {
//     const value = e.target.value;
//     setStreamKey(value);

//     if (value.length >= 16) {
//       setIsStreamKeyValid(true);
//     } else {
//       setIsStreamKeyValid(false);
//     }
//   };

//   const handleStartStreaming = () => {
//     if (streamKey && isStreamKeyValid && rtmpUrl) {
//       startStreaming();
//       setCameraEnabled(true); // Set cameraEnabled to true here
//     } else {
//       alert("Please enter a valid stream key and URL.");
//     }
//   };

//   const toggleCamera = () => {
//     if (cameraIsActive) {
//       // If camera is active, disable it
//       inputStreamRef.current.getTracks().forEach((track) => {
//         track.stop();
//       });
//       setCameraIsActive(false);
//     } else {
//       // If camera is inactive, enable it
//       enableCamera();
//     }
//   };

//   const handleStopStreaming = () => {
//     stopStreaming();
//     setCameraEnabled(false); // Hide the camera elements
//     setStreamKey(""); // Clear the stream key input
//     setRtmpUrl(""); // Clear the RTMP URL input
//   };

//   return (
//     <div style={{ maxWidth: "980px", margin: "0 auto" }}>
//       {!cameraEnabled && (
//         <div>
//           <label htmlFor="streamKey">Enter YouTube Stream Key:</label>
//           <input
//             id="streamKey"
//             type="text"
//             value={streamKey}
//             onChange={handleStreamKeyChange}
//           />
//           <label htmlFor="rtmpUrl">Enter YouTube RTMP URL:</label>
//           <input
//             id="rtmpUrl"
//             type="text"
//             value={rtmpUrl}
//             onChange={(e) => setRtmpUrl(e.target.value)}
//           />
//           <button className="button button-outline"onClick={handleStartStreaming}>Start Streaming</button>
//         </div>
//       )}

    
//       {cameraEnabled && streaming && (
        
//         <div className="row">
//           <div className="column">
          
//         <button className="button button-outline" onClick={toggleCamera}>
//           {cameraIsActive ? "Disable Camera" : "Enable Camera"}
//         </button>
          
//             <h2>Input</h2>
//             <video
//               ref={videoRef}
//               controls
//               width="100%"
//               height="auto"
//               muted
//             ></video>
//           </div>
//           <div className="column">
//             <canvas ref={canvasRef}></canvas>
//             <h2>Output</h2>
//             <input
//               placeholder="Enter your message!"
//               type="text"
//               onChange={(e) => setShoutOut(e.target.value)}
//             />
//           </div>
//         </div>
//       )}

//       {streaming && (
//         <div>
//           <button className="button button-outline" onClick={handleStopStreaming}>
//             Stop Streaming
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoCall;



