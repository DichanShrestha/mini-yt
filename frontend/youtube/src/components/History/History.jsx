import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import SingleCol from "../Content/SingleCol";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function History() {
  const [history, setHistory] = useState([]);
  const [isHovered, setIsHovered] = useState(null);

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
      console.log(response.data.data);
    })();
  }, []);

  const deleteWatchHistory = async () => {
    const response = await axios.patch(
      "http://localhost:8000/api/v1/users/history",
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    setHistory(response.data.data.watchHistory);
  };


  const deleteById = async (id) => {
    await axios.patch(
      "http://localhost:8000/api/v1/users/deleteHistoryById",
      {id},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    window.location.reload()
  }

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <Navbar />
      <Sidebar />
      <div className="pt-20"></div>
      <div className="pl-64 flex justify-between">
        <div className="w-1/2">
          <h1 className="pb-8 font-bold text-4xl">Watch History</h1>
          {history.map((item) => (
            <div
              onMouseEnter={() => setIsHovered(item._id)}
              onMouseLeave={() => setIsHovered(null)}
              key={item._id}
              className="flex pb-3"
            >
              <SingleCol
                id={item._id}
                videoURL={item.videoFile}
                thumbnailURL={item.thumbnail}
                title={item.title}
                views={item.views}
                time={item.createdAt}
              />
              <Button 
              onClick={() => deleteById(item._id)}
              className={`${isHovered === item._id ? "" : "hidden"}`}>
                <span className=" material-symbols-outlined">close</span>
              </Button>
            </div>
          ))}
        </div>
        <div className="w-1/2 pl-52 flex pt-12 flex-col">
          <div>
            <Button className="cursor-pointer p-2 ">
              <span className=" hover:bg-gray-500 h-10 w-12 rounded-full pt-2 material-symbols-outlined">
                search
              </span>
              <Input className="border-x-0 border-t-0" />
            </Button>
          </div>
          <div className="mt-5">
            <Button onClick={deleteWatchHistory}>
              <span className=" material-symbols-outlined">close</span>
              <p className=" text-lg ml-2">Delete all watch history</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
