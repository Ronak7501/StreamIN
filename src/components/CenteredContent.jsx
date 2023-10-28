import React from 'react';

function CenteredContent() {
  return (
    <div className="flex flex-col items-center bg-purple-500 justify-center h-screen">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-4">Get Creating</h1>

      {/* Button */}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
        Get Started
      </button>

      {/* Paragraph */}
      {/* <p className="text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id
        fringilla massa. In vel facilisis eros. Nullam sagittis, quam at
        tincidunt gravida.
      </p> */}
    </div>
  );
}

export default CenteredContent;
