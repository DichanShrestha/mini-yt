import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="h-full fixed bg-gray-100 w-1/6 text-black p-4 mt-16">
      <h3 className="text-2xl font-bold mb-4">You</h3>
      <div className="flex flex-col space-y-2">
        <NavLink to='/yourchannel' className={({isActive}) => `transition-colors ${isActive? 'bg-gray-300' : ''} duration-300`}>Your Channel</NavLink>
        <Link className="transition-colors duration-300" to="/history">History</Link>
        <Link className="transition-colors duration-300" to="/playlist">Playlist</Link>
        <Link className="transition-colors duration-300" to="/your-videos">Your Videos</Link>
        <Link className="transition-colors duration-300" to="/liked-videos">Liked Videos</Link>
      </div> 
    </div>
  );
}

export default Sidebar;
