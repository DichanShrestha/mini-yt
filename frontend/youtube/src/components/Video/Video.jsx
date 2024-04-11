import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SingleCol from "../Content/SingleCol";
import useVideo from "@/hook/useVideo";
import useUser from "@/hook/useUser";
function Video() {
  const [totalVids, setTotalVids] = useState([]);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const { videoURL, exactTime, title, views, thumbnailURL } = location.state;
  const videoRef = useRef(null);

  useEffect(() => {
    (async () => {
      const video = await useVideo();
      setTotalVids(video);
    })();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await useUser();
        setUser(userData);
      } catch (error) {
        console.error("Error while fetching user:", error);
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="flex h-screen">
      <div className="w-3/4 mt-20">
        <div className="video-player ml-20 relative">
          <video ref={videoRef} className="video-element w-full h-auto" controls>
            <source src={videoURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="w-1/4 overflow-y-auto">
        <div className="ml-4">
          <h2 className="text-xl font-bold mb-4">Recommended Videos</h2>
          {totalVids.map((video) => (
            <div key={video._id} className="mt-16">
              <SingleCol
                videoURL={video.videoFile}
                thumbnailURL={video.thumbnail}
                title={video.title}
                views={video.views}
                time={video.createdAt}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Video;
