import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import useVideo from "./hook/useVideo";

function App() {
  const [totalVids, setTotalVids] = useState([]);
  
  useEffect(() => {
    (async () => {
      const video = await useVideo();
      setTotalVids(video);
    })();
  }, []);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="flex flex-wrap gap-10 ml-60 w-4/5 pt-20">
          {totalVids && totalVids.map((video) => (
            <div key={video._id}>
              <Content
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
  );
}

export default App;
