import React from 'react';

const NewComponent = ({ onClose }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="popup m-20 ml-80 mr-80">
      <div className="popup-content">
        <div className="flex items-center mb-4">
          <button onClick={onClose} className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
              <h2 className="text-xl font-bold">Create Live Stream</h2>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4 font-bold">
            <label htmlFor="streamName">Stream Name</label>
            <input type="text" id="streamName" className="border p-2" />
          </div>
          <div className="mb-4 font-bold">
            <label htmlFor="rtmpLink">RTMP Link</label>
            <input type="text" id="rtmpLink" className="border p-2" />
          </div>
          <button type="submit" className="bg-[#9147ff] hover:bg-purple-700 font-bold text-white px-4 py-2 rounded cursor-pointer">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewComponent;
