import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faVideo, faDesktop,faExpand } from '@fortawesome/free-solid-svg-icons';
import './Streaming.css';

const VideoCall = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [localStream, setLocalStream] = useState(null);

  useEffect(() => {
    async function startVideoCall() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
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
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
    }
  };

  const shareScreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = screenStream;
        setLocalStream(screenStream);
  
        screenStream.oninactive = () => {
          // Screen share stopped by the user
          stopScreenShare();
        };
      }
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setLocalStream(stream);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };
  
  
  const stopScreenShare = () => {
    if (videoRef.current) {
      if (localStream) {
        videoRef.current.srcObject = localStream;
        setLocalStream(localStream);
      } else {
        startCamera(); // If localStream is not available, start the camera stream
      }
    }
  };

const [isVideoMaximized, setIsVideoMaximized] = useState(false);

const videoElementClass = isVideoMaximized ? 'fullscreen-video' : '';

const maximizeVideoFrame = () => {
  const videoElement = videoRef.current;
  if (videoElement) {
    setIsVideoMaximized(!isVideoMaximized);
  }
};
  
return (
 
  <div className="relative">
  <div className="video-container">
    <video ref={videoRef} autoPlay playsInline muted className={videoElementClass} />
    <canvas ref={canvasRef} width={640} height={480} style={{ display: 'none' }} />
    <div className="overlay-container">
      {/* Include your control icons here */}
      <FontAwesomeIcon icon={faMicrophone} onClick={toggleAudio} className="p-5 text-blue-500 cursor-pointer" />
      <FontAwesomeIcon icon={faVideo} onClick={toggleVideo} className="p-5 text-red-500 cursor-pointer" />
      <FontAwesomeIcon icon={faDesktop} onClick={shareScreen} className="p-5 text-green-500 cursor-pointer" />
      <FontAwesomeIcon icon={faExpand} onClick={maximizeVideoFrame} className="p-5 text-indigo-500 cursor-pointer" />
    </div>
  </div>
</div>

);}

export default VideoCall;
