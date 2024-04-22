// // Dashboard.js
// // import React from 'react';
// import { useState } from 'react';
// import './dashboard.css'; // Import the CSS file
// import NewComponent from './streamForm';

// function Dashboard() {
//   const [showNewComponent, setShowNewComponent] = useState(false);

//   return (
//     <div className="dashboard-container">
//       {!showNewComponent && ( // Render if showNewComponent is false
//         <div className="dashboard p-4 m-10 mt-15 bg-gray-100 border rounded flex flex-col items-center">
//           <h2 className="text-xl font-bold mb-4 self-start">Streams</h2>
//           <button
//             className="bg-[#9147ff] hover:bg-purple-700 font-bold text-white mt-4 px-4 py-2 rounded cursor-pointer self-start"
//             onClick={() => setShowNewComponent(true)} // Set showNewComponent to true
//           >
//             Create +
//           </button>
//         </div>
//       )}

//       {showNewComponent && ( // Render if showNewComponent is true
//         <NewComponent onClose={() => setShowNewComponent(false)} />
//       )}
//     </div>
//   );
// }

// export default Dashboard;

// import React, { useState } from 'react';
// import './dashboard.css';
// import NewComponent from './streamForm';

// function Dashboard() {
//   const [showNewComponent, setShowNewComponent] = useState(false);
//   const [streams, setStreams] = useState([]);

//   const handleCreateStream = (streamName, createdAt) => {
//     const newStream = { name: streamName, createdAt };
//     setStreams([...streams, newStream]);
//   };

//   return (
//     <div className="dashboard-container">
//       {!showNewComponent && (
//         <div className="dashboard p-4 m-10 mt-15 bg-gray-100 border rounded flex flex-col items-center">
//           <h2 className="text-xl font-bold mb-4 self-start">Streams</h2>
//           <button
//             className="bg-[#9147ff] hover:bg-purple-700 font-bold text-white mt-4 px-4 py-2 rounded cursor-pointer self-start"
//             onClick={() => setShowNewComponent(true)}
//           >
//             Create +
//           </button>
//         </div>
//       )}

//       {showNewComponent && (
//         <NewComponent onClose={() => setShowNewComponent(false)} onCreate={handleCreateStream} />
//       )}

//       {!showNewComponent && (
//       <div className="stream-list">
//         {streams.map((stream, index) => (
//           <div key={index} className="stream-item">
//             <p>{stream.name}</p>
//             <p>Created at: {stream.createdAt}</p>
//           </div>
//         ))}
//       </div>)}
//     </div>
    
//   );
// }

// export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import './dashboard.css';
// import NewComponent from './streamForm';
// import axios from 'axios';
// import { TiDelete } from "react-icons/ti";

// function Dashboard() {
//   const [showNewComponent, setShowNewComponent] = useState(false);
//   const [streamName, setStreamName] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:9002')
//     .then(result => setStreamName(result.data))
//     .catch(err => console.log(err))
//   }, []);

//   return (
//     <div className="dashboard-container">
//       {!showNewComponent && (
//         <div className="dashboard p-4 m-10 mt-15 bg-gray-100 border rounded flex flex-col items-center">
//           <h2 className="text-xl font-bold mb-4 self-start ml-20 mt-3">Streams</h2>
//           <button
//             className="bg-[#9147ff] hover:bg-purple-700 font-bold text-white px-4 py-2 rounded cursor-pointer self-start ml-20 "
//             onClick={() => setShowNewComponent(true)}
//           >
//             Create +
//           </button>

// <div className="logs">
//   {streamName.map((stream, index) => (
//     <div key={index} className="log-item border-b border-black py-4 flex items-center justify-between">
//       <div className="flex items-start">
//         <div>
//           <p className="text-lg font-semibold font-serif">{stream.streamName}</p>
//           <p className="text-sm text-gray-500">Created at: {stream.createdAt}</p>
//         </div>
//       </div>
//       <button className="py-2 px-4">
//         <TiDelete size={30}/>
//       </button>
//     </div>
//   ))}
// </div>
//         </div>
//       )}

//       {showNewComponent && (
//         <NewComponent onClose={() => setShowNewComponent(false)}  />
//       )}
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import './dashboard.css';
import NewComponent from './streamForm';
import axios from 'axios';
import { TiDelete } from "react-icons/ti";

function Dashboard() {
  const [showNewComponent, setShowNewComponent] = useState(false);
  const [streamName, setStreamName] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9002')
    .then(result => setStreamName(result.data))
    .catch(err => console.log(err))
  }, []);

  const handleDelete = (id) =>{
    axios.delete('http://localhost:9002/deleteStream/'+id)
    .then(res => {console.log(res)
    window.location.reload()})
    .catch(err =>console.log(err))
  }

  return (
    <div className="dashboard-container ">
      {!showNewComponent && (
      <div className="dashboard p-4 m-10 mt-15 bg-gray-100 border rounded flex flex-col ">
        <h2 className="text-xl font-bold mb-4 self-start ml-20 mt-3">Streams</h2>
        <button
          className="bg-[#9147ff] hover:bg-purple-700 font-bold text-white px-4 py-2 rounded cursor-pointer self-start ml-20 "
          onClick={() => setShowNewComponent(true)}
        >
          Create +
        </button>

        <div className="logs self-start ml-20 flex flex-col mt-4">
          {streamName.map((stream, index) => (
            <div key={index} className="log-item border-b border-black py-4 flex items-center justify-between">
              <div className="flex items-start">
                <div className="mr-4">
                  <p className="text-lg font-semibold font-serif">{stream.streamName}</p>
                  <p className="text-sm text-gray-500">Created at: {stream.createdAt}</p>
                </div>
                <button className="py-2 px-4 ml-96 " onClick={(e) => handleDelete(stream._id)}>
                  <TiDelete size={30}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}
      {showNewComponent && (
        <NewComponent onClose={() => setShowNewComponent(false)}  />
      )}
    </div>
  );
}

export default Dashboard;
