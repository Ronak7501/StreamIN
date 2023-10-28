// Dashboard.js
// import React from 'react';
import { useState } from 'react';
import './dashboard.css'; // Import the CSS file
import NewComponent from './streamForm';

function Dashboard() {
  const [showNewComponent, setShowNewComponent] = useState(false);

  return (
    <div className="dashboard-container">
      {!showNewComponent && ( // Render if showNewComponent is false
        <div className="dashboard p-4 m-10 mt-15 bg-gray-100 border rounded flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4 self-start">Streams</h2>
          <button
            className="bg-[#9147ff] hover:bg-purple-700 font-bold text-white mt-4 px-4 py-2 rounded cursor-pointer self-start"
            onClick={() => setShowNewComponent(true)} // Set showNewComponent to true
          >
            Create +
          </button>
        </div>
      )}

      {showNewComponent && ( // Render if showNewComponent is true
        <NewComponent onClose={() => setShowNewComponent(false)} />
      )}
    </div>
  );
}

export default Dashboard;
