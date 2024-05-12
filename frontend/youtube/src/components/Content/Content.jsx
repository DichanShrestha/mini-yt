import useIncrementView from "@/hook/useIncrementView";
import { useGetVideoUser } from "@/hook/useVideo";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Content({ id, videoURL, title, views, time, thumbnailURL }) {
  const [exactTime, setExactTime] = useState(0);
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [uid, setUid] = useState("");
  useEffect(() => {
    const timeDiff = new Date() - new Date(time);
    const timeInSec = timeDiff / 1000;
    if (timeInSec < 10) {
      setExactTime(timeInSec + " sec");
    } else if (timeInSec >= 60 && timeInSec <= 3600) {
      setExactTime(Math.floor(timeInSec / 60) + " min");
    } else if (timeInSec >= 3600 && timeInSec <= 86400) {
      setExactTime(Math.floor(timeInSec / 3600) + " hr");
    } else if (timeInSec >= 86400 && timeInSec <= 2592000) {
      setExactTime(Math.floor(timeInSec / 86400) + " days");
    } else if (timeInSec >= 2592000 && timeInSec <= 31104000) {
      setExactTime(Math.floor(timeInSec / 2592000) + " month");
    } else {
      setExactTime(Math.floor(timeInSec / 31104000) + "years");
    }
  }, []);

  useEffect(() => {
    (async () => {
      const data = await useGetVideoUser({ vid: id });
      setUid(data?.owner);
    })();
  }, []);

  const handleClick = () => {
    useIncrementView({videoId: id})
    navigate(`/playvideo/${uid}/vid/${id}`);
  };

  const handleMouseOver = () => {
    videoRef.current.play();
  };

  const handleMouseOut = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <div className="flex flex-col">
      <div
        className="relative w-80 h-52"
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        onClick={handleClick}
      >
        <img
          src={thumbnailURL}
          className="absolute inset-0 w-full h-full object-cover rounded-2xl z-20 hover:z-0"
          alt="Thumbnail"
        />
        <video
          ref={videoRef}
          src={videoURL}
          className="absolute inset-0 w-full h-full object-cover rounded-2xl z-10"
        />
      </div>
      <div className="mt-2">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-500">
          {views} views ‧ {exactTime}
        </p>
      </div>
    </div>
  );
}

export default Content;
