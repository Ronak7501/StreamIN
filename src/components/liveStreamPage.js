import React from 'react';
import VideoCall from './Streaming';


const VideoCallPage = ({ streamName}) => {
  return (
    <div>
      <div data-testid="video-call-page">
    <h2 className="font-bold mt-10 text-3xl font-serif"> {streamName} </h2>
    <VideoCall /> 
  </div>
    </div>
  );
};

export default VideoCallPage;
