import SingleCol from '@/components/Content/SingleCol';
import Navbar from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function LikeVideo() {
  const [likedVideos, setLikedVideos] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/like/videos', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        setLikedVideos(response.data.data);
      } catch (error) {
        console.error('Error fetching liked videos:', error);
      }
    })();
  }, []);

  return (
    <div className="flex">
      <Navbar />
      <Sidebar />
      <div className="flex flex-wrap flex-col justify-center w-full p-8">
        {likedVideos.map((item) => (
          <div key={item._id} className="flex pt-16 pl-60">
            <SingleCol
              id={item.video._id}
              videoURL={item.video.videoFile}
              thumbnailURL={item.video.thumbnail}
              title={item.video.title}
              views={item.video.views}
              time={item.video.createdAt}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LikeVideo;
