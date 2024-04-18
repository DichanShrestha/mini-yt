import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Content({ id, videoURL, title, views, time, thumbnailURL }) {
  const [exactTime, setExactTime] = useState(0);
  const navigate = useNavigate();
  const videoRef = useRef(null);

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
    } else if(timeInSec >= 2592000 && timeInSec <= 31104000){
      setExactTime(Math.floor(timeInSec / 2592000) + " month");
    } else {
      setExactTime(Math.floor(timeInSec/31104000) + "years");
    }
  }, []);

  useEffect(() => {
    (async () => {

    })();
  }, [])

  const handleClick = () => {
    navigate(`/playvideo/${id}`);
  };

  const handleMouseOver = () => {
    videoRef.current.play().catch((error) => {
      console.error("Autoplay failed:", error);
    });
  };

  const handleMouseOut = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <div className="flex flex-col mt-28">
      <div
        className="w-60 h-36 relative"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleClick}
      >
        <Link to={`/playvideo/${id}`}>
          <img
            src={thumbnailURL}
            className="w-full h-full rounded-lg"
            alt="Thumbnail"
          />
          <video
            ref={videoRef}
            src={videoURL}
            className="absolute top-0 left-0 w-full h-full object-cover"
          ></video>
        </Link>
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
