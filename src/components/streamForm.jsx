import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import VideoCallPage from './liveStreamPage'; // Import the page to navigate to

const NewComponent = ({ onClose }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/Streaming';
  const [displayNewComponent, setDisplayNewComponent] = useState(false);
  // const history = useHistory(); // Access the useHistory hook

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setDisplayNewComponent(true);
    // Redirect to the 'VideoCallPage' when the form is submitted
    // history.push('/components/liveStreamPage');
    // Handle form submission logic here
  };

  return (
    <div className="popup m-20 ml-80 mr-80">
      {!hideNavbar && <Navbar />}
      <div className="popup-content">
        {displayNewComponent ? (
          <VideoCallPage />
        ) : (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="streamName" className="font-bold">
                Stream Name
              </label>
              <input type="text" id="streamName" className="border p-2" />
            </div>
            <div className="mb-4">
              <label htmlFor="rtmpLink" className="font-bold">
                RTMP Link
              </label>
              <input type="text" id="rtmpLink" className="border p-2" />
            </div>
            {/* <Link to="/liveStreamPage">Create Live Stream</Link> */}
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

