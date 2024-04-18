import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function SingleCol({id, videoURL, title, views, time, thumbnailURL }) {
  const [exactTime, setExactTime] = useState(0);
  const navigate = useNavigate();

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

  const handleClick = () => {
    navigate(`/playvideo/${id}`);
  };

  return (
    <div className="flex gap-5">
      <div className="w-60 h-36" onClick={handleClick}>
        <Link to={`/playvideo/${id}`}>
          <img
            src={thumbnailURL}
            className="w-full h-full rounded-2xl"
            alt="Thumbnail"
          />
        </Link>
      </div>
      <div className="mt-2">
        <p className="text-lg font-medium">{title}</p>
        <p className="text-xs text-gray-500">
          {views} views ‧ {exactTime}
        </p>
      </div>
    </div>
  );
}

export default SingleCol;
