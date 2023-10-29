import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

const VideoCall = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  let localStream = null;

  useEffect(() => {
    async function startVideoCall() {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoRef.current.srcObject = localStream;
      } catch (error) {
        console.error('Error accessing user media:', error);
      }
    }

    startVideoCall();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleAudio = () => {
    localStream.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
    });
  };

  const toggleVideo = () => {
    localStream.getVideoTracks().forEach(track => {
      track.enabled = !track.enabled;
    });
  };

  const captureCanvasVideo = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 640, 480);
  };

  return (
    <div className="flex flex-col items-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-auto max-w-md rounded-md shadow-lg"
      ></video>
      <canvas
        ref={canvasRef}
        className="w-full h-auto max-w-md rounded-md mt-4 shadow-lg"
      ></canvas>
      <div className="mt-4 space-x-4">
        <button
          onClick={toggleAudio}
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Toggle Audio
        </button>
        <button
          onClick={toggleVideo}
          className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Toggle Video
        </button>
        <button
          onClick={captureCanvasVideo}
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Capture Video to Canvas
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
