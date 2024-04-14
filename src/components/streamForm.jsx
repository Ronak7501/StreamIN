import React, { useState } from 'react';
import VideoCallPage from './liveStreamPage';

const NewComponent = ({ onClose }) => {
  const [streamName, setStreamName] = useState('');
  const [displayNewComponent, setDisplayNewComponent] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setDisplayNewComponent(true);
  };

  return (
    <div className="popup m-20 ml-80 mr-80">
      <div className="popup-content">
        {displayNewComponent ? (
          <VideoCallPage streamName={streamName} onClose={onClose} />
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="streamName" className="font-bold">
                Stream Name
              </label>
              <input
                required
                type="text"
                id="streamName"
                className="border p-2"
                value={streamName}
                onChange={(e) => setStreamName(e.target.value)}
              />
            </div>
            <div className="mb-4">
            </div>
            <button
              type="submit"
              className="bg-[#9147ff] hover:bg-purple-700 font-bold text-white px-4 py-2 rounded cursor-pointer"
            >
              Create Live Stream
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewComponent;



