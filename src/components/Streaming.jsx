import React, { useEffect, useState, useRef } from "react";
import { BiCamera, BiMicrophone } from 'react-icons/bi';
import { LuScreenShare } from "react-icons/lu";

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
  const [videoRowClass, setVideoRowClass] = useState("row mt-64");
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);
  const [isErasingEnabled, setIsErasingEnabled] = useState(false);
  const [lineWidth, setLineWidth] = useState(5); // Default line width is 5
  const [drawingButtonText, setDrawingButtonText] = useState("Drawing");



  const inputStreamRef = useRef();
  const videoRef = useRef();
  const canvasRef = useRef();
  const wsRef = useRef();
  const mediaRecorderRef = useRef();
  const requestAnimationRef = useRef();
  const nameRef = useRef();
  const screenStreamRef = useRef();
  const isDrawingRef = useRef(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });

  const enableCamera = async () => {
    inputStreamRef.current = await navigator.mediaDevices.getUserMedia(
      CAMERA_CONSTRAINTS
    );

    videoRef.current.srcObject = inputStreamRef.current;

    await videoRef.current.play();

    canvasRef.current.height = videoRef.current.clientHeight;
    canvasRef.current.width = videoRef.current.clientWidth;

    requestAnimationRef.current = requestAnimationFrame(updateCanvas);
    setCameraEnabled(true);
  };

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      });
      screenStreamRef.current = screenStream;

      videoRef.current.srcObject = screenStream;

      await videoRef.current.play();
      canvasRef.current.height = videoRef.current.clientHeight;
      canvasRef.current.width = videoRef.current.clientWidth;

      requestAnimationRef.current = requestAnimationFrame(updateCanvas);

      setCameraEnabled(false);
    } catch (error) {
      console.error('Error starting screen share:', error);
    }
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

    if (isDrawingRef.current) {
      const { offsetX, offsetY } = lastPositionRef.current;
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }

    requestAnimationRef.current = requestAnimationFrame(updateCanvas);
  };

  const stopStreaming = () => {
    inputStreamRef.current.getVideoTracks().forEach(track => {
      track.stop();
      inputStreamRef.current.removeTrack(track);
    });

    wsRef.current.close();
    // Stop streaming
    setStreaming(false);
    mediaRecorderRef.current.stop();

    setVideoRowClass("row mt-64");
    setrtmpUrl("");
    setStreamKey("");
  };

  const startStreaming = () => {
    setStreaming(true);
    setVideoRowClass("row mt-10");

    const protocol = window.location.protocol.replace("http", "ws");
    const websocketURL = `${protocol}//${window.location.host}/rtmp?key=${streamKey}&rtmpUrl=${rtmpUrl}`;
    wsRef.current = new WebSocket(websocketURL);

    console.log(websocketURL);

    wsRef.current.addEventListener("open", function open() {
      setConnected(true);
    });

    wsRef.current.addEventListener("close", () => {
      setConnected(false);
      stopStreaming();
    });

    const videoOutputStream = canvasRef.current.captureStream(30); // 30 FPS
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

  const startDrawing = ({ nativeEvent }) => {
    if (isDrawingEnabled) {
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    isDrawingRef.current = true;
    lastPositionRef.current = { x: offsetX, y: offsetY };
  }
  };

  const draw = ({ nativeEvent }) => {
    if (isDrawingEnabled && isDrawingRef.current) {
      const { offsetX, offsetY } = nativeEvent;
      const ctx = canvasRef.current.getContext("2d");
      ctx.lineWidth = lineWidth; // Set the lineWidth
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
      lastPositionRef.current = { x: offsetX, y: offsetY };
    }
  };

  const handleLineWidthChange = (e) => {
    const value = parseInt(e.target.value);
    setLineWidth(value);
  };

  const stopDrawing = () => {
    if (isDrawingEnabled && isDrawingRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.closePath();
      isDrawingRef.current = false;
    }
  };

  const toggleDrawing = () => {
    if (isDrawingEnabled) {
      setIsDrawingEnabled(false);
      setIsErasingEnabled(false); 
      setDrawingButtonText("Draw");
    } else {
      setIsDrawingEnabled(true);
      setIsErasingEnabled(false); 
      setDrawingButtonText("Stop Draw");
    }
  };

  useEffect(() => {
    nameRef.current = shoutOut;
  }, [shoutOut]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(requestAnimationRef.current);
    };
  }, []);

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

  const toggleCamera = async () => {
    if (cameraEnabled) {
      inputStreamRef.current.getVideoTracks().forEach((track) => track.enabled = !track.enabled);
    }
  };

  const toggleMicrophone = async () => {
    if (cameraEnabled) {
      inputStreamRef.current.getAudioTracks().forEach((track) => track.enabled = !track.enabled);
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
            <span
              className={`font-bold ${
                connected ? "text-green-700" : "text-red-700"
              }`}
            >
              {connected ? "Streaming Started!" : "Streaming not started!"}
            </span>

            <button
              className="button button-outline ml-2"
              onClick={stopStreaming}
            >
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
            />
            <label htmlFor="streamName" className="font-bold">
              Enter youtube's Stream URL
            </label>
            <input
              required
              placeholder="RTMP Link"
              type="text"
              value={rtmpUrl}
              onChange={(e) => setrtmpUrl(e.target.value)}
            />
            <button
              className="button button-outline mt-5"
              disabled={!streamKey || !isStreamKeyValid}
              onClick={startStreaming}
            >
              Start Streaming
            </button>
          </>
        ))}
      <div className={videoRowClass}>
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

        <div className="column flex justify-center items-center mb-5">
          <div className="flex gap-4 mt-4">
            <button onClick={toggleCamera} className="p-2 bg-gray-300 rounded-full">
              <BiCamera size={25} />
            </button>
            <button onClick={toggleMicrophone} className="p-2 bg-gray-300 rounded-full">
              <BiMicrophone size={25} />
            </button>
            <button onClick={startScreenShare} className="p-2 bg-gray-300 rounded-full">
              <LuScreenShare size={25} />
            </button>
            <button onClick={toggleDrawing} className="p-2 bg-gray-300 rounded-full">
            {drawingButtonText}
            </button>
          </div>
        </div>

        <div className="column">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          ></canvas>
          <h2>Output</h2>
          <input
            placeholder="Enter your message!" type="text" onChange={(e) => setShoutOut(e.target.value)} />
             <div className="mt-3">
    <label htmlFor="lineWidth" className="font-bold">Drawing Line Width:</label>
    <input
      id="lineWidth"
      type="range"
      min="1"
      max="20"
      value={lineWidth}
      onChange={handleLineWidthChange}
    />
    <span className="ml-2">{lineWidth}</span>
  </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
