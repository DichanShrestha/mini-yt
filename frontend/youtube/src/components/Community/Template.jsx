import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUser from "@/hook/useUser";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";

function Template({ commentUser }) {
  const [exactTimes, setExactTimes] = useState([]);
  const [userId, setUserId] = useState(null);
  const [updateTweet, setUpdateTweet] = useState("");

  useEffect(() => {
    const times = commentUser.map((item) => convertTime(item.createdAt));
    setExactTimes(times);
  }, [commentUser]);

  const convertTime = (time) => {
    const timeDiff = new Date() - new Date(time);
    const timeInSec = timeDiff / 1000;

    if (timeInSec < 10) {
      return timeInSec + " sec";
    } else if (timeInSec >= 60 && timeInSec <= 3600) {
      return Math.floor(timeInSec / 60) + " min";
    } else if (timeInSec >= 3600 && timeInSec <= 86400) {
      return Math.floor(timeInSec / 3600) + " hr";
    } else if (timeInSec >= 86400 && timeInSec <= 2592000) {
      return Math.floor(timeInSec / 86400) + " days";
    } else if (timeInSec >= 2592000 && timeInSec <= 31104000) {
      return Math.floor(timeInSec / 2592000) + " month";
    } else {
      return Math.floor(timeInSec / 31104000) + "years";
    }
  };
  // console.log(commentUser);

  useEffect(() => {
    (async () => {
      const response = await useUser();
      setUserId(response.data.data._id);
    })();
  }, []);

  const handleUpdateTweet = async (tweetId) => {
    await axios.patch(
      "http://localhost:8000/api/v1/tweets/update",
      { content: updateTweet, tweetId },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  };

  const handleDeleteTweet = async (tweetId) => {
    await axios.patch(
      "http://localhost:8000/api/v1/tweets/delete",
      { tweetId },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    window.location.reload()
  };

  const toggleTweetLike = async (tweetId) => {
    await axios.post("http://localhost:8000/api/v1/like/toggle/t",
      {tweetId},
      {
        headers:{
          "Content-Type": "application/json"
        },
        withCredentials: true
      }
    )
    window.location.reload()
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0"
      />
      {userId &&
        commentUser.map((item, index) => (
          <div
            key={index}
            className="relative flex border border-gray-400 gap-3 mb-1"
          >
            <div className="mt-1">
              <Avatar>
                <AvatarImage src={item.commentUser.avatar} />
                <AvatarFallback>avatar</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <div className="mb-2 mt-1">
                <span className="font-bold mr-2">
                  {item.commentUser.username}
                </span>
                <span className="text-gray-500">
                  @{item.commentUser.fullName}
                </span>
                <span className="text-gray-500 text-sm">
                  {" "}
                  ‧ {exactTimes[index]}
                </span>
              </div>
              <div>
                <p>{item.content}</p>
                <div className="flex my-1">
                  <span>{item.tweetLikes.length}</span>
                  <span 
                  onClick={() => toggleTweetLike(item._id)}
                  className="ml-1 cursor-pointer material-symbols-outlined">favorite</span>
                </div>
              </div>
            </div>
            {item.owner === userId && (
              <div>
                <Dialog>
                  <DialogTrigger className="absolute right-16 top-1 h-6 hover:bg-gray-200 bg-gray-300 rounded-2xl px-2">
                    Edit
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 text-white">
                    <Input
                      value={updateTweet}
                      onChange={(e) => setUpdateTweet(e.target.value)}
                      className="my-3"
                    />
                    <Button onClick={() => handleUpdateTweet(item._id)}>
                      Change
                    </Button>
                  </DialogContent>
                </Dialog>
                <Button
                  onClick={() => handleDeleteTweet(item._id)}
                  className="bg-gray-300 p-2 rounded-2xl h-6 hover:bg-gray-200 absolute right-0 top-1"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        ))}
    </>
  );
}

export default Template;
