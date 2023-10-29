import React from 'react';
import VideoCall from './Streaming';
import { useHistory } from 'react-router-dom';

const VideoCallPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="p-4 bg-white rounded shadow-lg">
        <VideoCall /> {/* Render the VideoCall component */}
      </div>
    </div>
  );
};

export default VideoCallPage;
