import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="fixed h-full bg-gray-100 w-1/6 text-black p-4">
      <h3 className="text-2xl font-bold mb-4">You</h3>
      <div className="flex flex-col space-y-2">
        <Link className="transition-colors duration-300" to="/your-channel">Your Channel</Link>
        <Link className="transition-colors duration-300" to="/history">History</Link>
        <Link className="transition-colors duration-300" to="/playlist">Playlist</Link>
        <Link className="transition-colors duration-300" to="/your-videos">Your Videos</Link>
        <Link className="transition-colors duration-300" to="/liked-videos">Liked Videos</Link>
      </div>
    </div>
  );
}

export default Sidebar;