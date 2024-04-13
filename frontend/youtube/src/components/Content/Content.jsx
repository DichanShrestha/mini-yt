import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Content({ id, videoURL, title, views, time, thumbnailURL }) {
  const [exactTime, setExactTime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timeDiff = new Date() - new Date(time);
    const timeInSec = timeDiff / 1000;
    if (timeInSec < 10) {
      setExactTime(timeInSec + " sec"); // 3 sec
    } else if (timeInSec >= 60 && timeInSec <= 3600) {
      setExactTime(Math.floor(timeInSec / 60) + " min"); // 3 min
    } else if (timeInSec >= 3600 && timeInSec <= 86400) {
      setExactTime(Math.floor(timeInSec / 3600) + " hr"); // 3 hr
    } else if (timeInSec >= 86400 && timeInSec <= 2592000) {
      setExactTime(Math.floor(timeInSec / 86400) + "days"); // 3 days
    } else {
      setExactTime(Math.floor(timeInSec / 2592000) + " yrs"); // 3 yrs
    }
  }, []);

  const handleClick = () => {
    navigate(`/playvideo/${id}`, {
      state: { videoURL, title, views, exactTime, thumbnailURL },
    });
  };

  return (
    <div className="flex flex-col mt-20">
      <div className="w-60 h-36" onClick={handleClick}>
        <Link to={`/playvideo/${id}`}>
          <img
            src={thumbnailURL}
            className="w-full h-full rounded-lg"
            alt="Thumbnail"
          />
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
