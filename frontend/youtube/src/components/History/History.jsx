import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import SingleCol from "../Content/SingleCol";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "http://localhost:8000/api/v1/users/history",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setHistory(response.data.data);
    })();
  }, []);
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <Navbar />
      <Sidebar />
      <div className="pt-20"></div>
      <div className="pl-64 flex ">
        <div>
          <h1 className="pb-8 font-bold text-4xl">Watch History</h1>
          {history.map((item) => (
            <div key={item._id} className="flex pb-3">
              <SingleCol
                id={item._id}
                videoURL={item.videoFile}
                thumbnailURL={item.thumbnail}
                title={item.title}
                views={item.views}
                time={item.createdAt}
              />
            </div>
          ))}
        </div>
        <div className="relative w-1/2 ml-32 flex pl-28 pt-12">
          <div>
            <button 
            className="cursor-pointer hover:bg-gray-500 p-2 px-3 rounded-full"
            >
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
