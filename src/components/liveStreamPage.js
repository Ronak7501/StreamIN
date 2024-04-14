import React from 'react';
import VideoCall from './Streaming';


const VideoCallPage = ({ streamName, rtmpUrl }) => {
  return (
    // <div className="flex justify-center items-center h-screen bg-gray-200">
    <div>
    <h2 className="font-bold mt-10 text-3xl font-serif"> {streamName} </h2>

    {/* <h1>RTMP URL: {rtmpUrl}</h1> */}
    <VideoCall /> 
    {/* Other components and logic */}
  </div>
      
    // </div>
  );
};

export default VideoCallPage;
