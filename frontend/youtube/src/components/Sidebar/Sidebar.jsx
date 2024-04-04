import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='fixed'>
      <h3>You</h3>
      <div className='flex flex-col'>
        <Link>Your channel</Link>
        <Link>History</Link>
        <Link>Playlist</Link>
        <Link>Your Videos</Link>
        <Link>Liked Videos</Link>
      </div>
    </div>
  )
}

export default Sidebar
