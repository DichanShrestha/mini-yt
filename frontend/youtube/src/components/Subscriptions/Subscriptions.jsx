import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import Content from "../Content/Content";

function Subscriptions() {
  const { channelId } = useParams();
  const [subscribedChannels, setSubscribedChannels] = useState(null)
  
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:8000/api/v1/subs/c/${channelId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setSubscribedChannels(response.data.data);
    })();
  }, []);
  

  return (
    <div className="flex">
      <Navbar />
      <Sidebar />
      <div className="ml-5 flex-1 pl-60 pt-20 overflow-auto">
        {subscribedChannels && subscribedChannels.map(channel => (
          <div key={channel._id} className="mb-8">
            <div>
              <h1 className="font-bold text-lg mb-3">{channel.username.username}</h1>
            </div>
            <div className="flex flex-wrap">
              {channel.videoByChannel.map(video => (
                <div key={video._id} className="mr-5 mb-5">
                  <Content 
                    id={video._id} 
                    videoURL={video.videoFile}
                    thumbnailURL={video.thumbnail}
                    views={video.views}
                    time={video.createdAt}
                    title={video.title}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subscriptions;
