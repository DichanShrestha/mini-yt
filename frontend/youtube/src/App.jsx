import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import useUser from "./hook/useUser";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Content from "./components/Content/Content";
import useVideo from "./hook/useVideo";

function App() {
  const [user, setUser] = useState(null);
  const [totalVids, setTotalVids] = useState([]);
  const location = useLocation();

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

  const hideSidebarRoutes = ["/playvideo/:id"];
  const hideAppContentRoutes = ["/yourchannel", "/playvideo/:id"];
  const shouldHideContent = hideAppContentRoutes.includes(location.pathname);
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  useEffect(() => {
    (async () => {
      const video = await useVideo();
      setTotalVids(video);
    })();
  }, []);

  return (
    <div>
      <Navbar user={user} />
      {!shouldHideSidebar && (
        <div className="-mt-20">
          <Sidebar />
        </div>
      )}
      <Outlet />
      {!shouldHideContent && !shouldHideSidebar && (
        <div className="flex flex-wrap gap-9 mt-20 ml-60 w-4/5">
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
      )}
    </div>
  );
}

export default App;
