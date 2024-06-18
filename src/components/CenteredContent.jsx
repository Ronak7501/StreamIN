import React from 'react';

function CenteredContent() {
  return (
    <div className="flex flex-col items-center justify-between bg-purple-500 min-h-screen">


      {/* Main Content */}
      <main className="flex flex-col items-center py-8">
        <section className="text-center mb-8">
          <h2 className="text-2xl font-semibold mt-52 mb-4 text-white">Welcome to our Website</h2>
        </section>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
          Get Started
        </button>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 bg-gray-900 w-full text-white">
        <p>&copy; 2024 StreamIN. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default CenteredContent;
