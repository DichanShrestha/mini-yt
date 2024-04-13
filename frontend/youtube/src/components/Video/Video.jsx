import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleCol from "../Content/SingleCol";
import { useVideoById } from "@/hook/useVideo";
import useUser from "@/hook/useUser";
import useVideo from "@/hook/useVideo";
import Navbar from "../Navbar/Navbar";

function Video() {
  const [totalVids, setTotalVids] = useState([]);
  const [user, setUser] = useState(null);
  const [vidURL, setVidURL] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const video = await useVideoById({ id });
        console.log(video);
        setVidURL(video?.videoFile);
        console.log(vidURL);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [id]);

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

  useEffect(() => {
    (async () => {
      const video = await useVideo();
      setTotalVids(video);
    })();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        <div className="w-3/5 flex justify-center align-middle bg-gray-100 rounded-lg">
          <div className="video-player">
            <video
              src={vidURL}
              ref={(video) => {
                if (video) {
                  video.play().catch((error) => {
                    console.error("Autoplay failed:", error);
                  });
                }
              }}
              className="video-element w-full h-96 max-w-full mt-24"
              controls
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="w-2/5 overflow-y-auto">
          <div className="ml-4">
            <h2 className="text-xl font-bold mb-4">Recommended Videos</h2>
            {totalVids.map((video) => (
              <div key={video._id} className="flex mt-3">
                <SingleCol
                  id={video._id}
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
    </div>
  );
}

export default Video;
