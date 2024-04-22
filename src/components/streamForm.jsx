// import React, { useState } from 'react';
// import VideoCallPage from './liveStreamPage';

// const NewComponent = ({ onClose }) => {
//   const [streamName, setStreamName] = useState('');
//   const [displayNewComponent, setDisplayNewComponent] = useState(false);

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     setDisplayNewComponent(true);
//   };

//   return (
//     <div className="popup m-20 ml-80 mr-80">
//       <div className="popup-content">
//         {displayNewComponent ? (
//           <VideoCallPage streamName={streamName} onClose={onClose} />
//         ) : (
//           <form onSubmit={handleFormSubmit}>
//             <div className="mb-4">
//               <label htmlFor="streamName" className="font-bold">
//                 Stream Name
//               </label>
//               <input
//                 required
//                 type="text"
//                 id="streamName"
//                 className="border p-2"
//                 value={streamName}
//                 onChange={(e) => setStreamName(e.target.value)}
//               />
//             </div>
//             <div className="mb-4">
//             </div>
//             <button
//               type="submit"
//               className="bg-[#9147ff] hover:bg-purple-700 font-bold text-white px-4 py-2 rounded cursor-pointer"
//             >
//               Create Live Stream
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NewComponent;



import React, { useState } from 'react';
import VideoCallPage from './liveStreamPage';
import axios from 'axios';

const NewComponent = ({ onClose, onCreate }) => {
  const [streamName, setStreamName] = useState('');
  const [displayNewComponent, setDisplayNewComponent] = useState(false);

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   const createdAt = new Date().toLocaleString(); // Get the current date and time
  //   onCreate(streamName, createdAt); // Pass stream name and creation timestamp to onCreate
  //   onClose(); // Close the NewComponent
  // };

  

  const handleFormSubmit = (e) => {
    e.preventDefault();
  //   const userData = {
  //   streamName: streamName,
  // }
  axios.post("http://localhost:9002/streams", {streamName})
  .then(result => console.log(result))
  .catch(err => console.log(err))
  // .then( res => {alert(res.data.message)
  // navigate("/Login")

    // axios.post("https://localhost:9002/streams",streamName)
    // .then(result => console.log(result))
    // .catch(err => console.log(err));
    // const createdAt = new Date().toLocaleString(); // Get the current date and time
    // onCreate(streamName, createdAt); // Pass stream name and creation timestamp to onCreate
    setDisplayNewComponent(true); // Show VideoCallPage after creating the stream
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
