import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleCol from "../Content/SingleCol";
import { useGetVideoUser, useVideoById } from "@/hook/useVideo";
import useUser from "@/hook/useUser";
import useVideo from "@/hook/useVideo";
import Navbar from "../Navbar/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { saveAs } from "file-saver";
import axios from "axios";

//like gareko tarika mileko xaina, subs lai chai euta reload chaiyeko xa

function Video() {
  const [totalVids, setTotalVids] = useState([]);
  const [vidURL, setVidURL] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [totalSubs, setTotalSubs] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [videoUser, setVideoUser] = useState("");
  const [videoUserId, setVideoUserId] = useState("");
  const { id, vid } = useParams();

  //videoById (currently playing)
  // Fetch video details
  useEffect(() => {
    (async () => {
      try {
        const response = await useVideoById({ vid });
        setVidURL(response?.videoFile);
        setTitle(response?.title);
        setDescription(response.description);
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    })();
  }, [vid]);

  // Fetch user details
  useEffect(() => {
    (async () => {
      try {
        const response = await useUser();
        setUsername(response.data.data.username);
        setAvatar(response.data.data.avatar);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    })();
  }, [username]);

  // Fetch total videos
  useEffect(() => {
    (async () => {
      try {
        const video = await useVideo();
        setTotalVids(video);
      } catch (error) {
        console.error("Error fetching total videos:", error);
      }
    })();
  }, []);

  // Fetch video user details
  useEffect(() => {
    (async () => {
      try {
        const video = await useGetVideoUser({ vid });
        setVideoUser(video?.user_details.username);
        setVideoUserId(video?.user_details._id);
      } catch (error) {
        console.error("Error fetching video user details:", error);
      }
    })();
  }, [id]);

  // Toggle subscription
  const toggleSubs = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/subs/c/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.message === "Subscribed successfully") {
        setIsSubscribed(true);
        setTotalSubs((prevSubs) => prevSubs + 1);
      } else if (response.data.message === "Unsubscribed successfully") {
        setIsSubscribed(false);
        setTotalSubs((prevSubs) => prevSubs - 1);
      }
    } catch (error) {
      console.error("Error toggling subscription:", error);
    }
  };

  // Toggle like
  const toggleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/like/toggle/v/${videoUserId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.message === "Liked successfully") {
        setIsLiked(true);
        setTotalLikes((prevLike) => prevLike + 1);
      } else if (response.data.message === "Unliked successfully") {
        setIsLiked(false);
        setTotalLikes((prevLike) => prevLike - 1);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // Fetch total subs and likes
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/dash/playvideo/${id}/vid/${vid}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setTotalSubs(response.data.data.totalSub || 0);
        setTotalLikes(response.data.data.totalLikes);
        console.log("likes", totalLikes);
        console.log("subs", totalSubs);
      } catch (error) {
        console.error("Error fetching total subs and likes:", error);
      }
    })();
  }, [isSubscribed, isLiked]);

  // Fetch subscription status
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/subs/playvideo/${id}/vid/${vid}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setIsSubscribed(response.data.data);
      } catch (error) {
        console.error("Error fetching subscription status:", error);
      }
    })();
  }, []);

  // Handle download
  const handleDownload = () => {
    saveAs(vidURL, `${title}.mp4`);
  };

  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        <div className="w-3/5 flex justify-center align-middle rounded-lg h-full">
          {/* yo tala ko chai video ko lagi */}
          <div>
            <div className="video-player">
              <video
                src={vidURL}
                muted
                autoPlay
                className="video-element w-full h-96 max-w-full mt-24 rounded-xl"
                controls
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div>
              <div>
                <p className="text-lg font-semi-bold mb-2">{title}</p>
              </div>

              <div className="w-full flex gap-3">
                <div>
                  <Avatar>
                    <AvatarImage src={avatar} />
                    <AvatarFallback>avatar</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex gap-10">
                  <div className="flex flex-col">
                    <div className=" text-md">{videoUser}</div>
                    <div className=" text-xs">{totalSubs} subscribers</div>
                  </div>
                  <div>
                    <button
                      onClick={toggleSubs}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-3xl shadow"
                    >
                      {isSubscribed ? "Subscribed" : "Subscribe"}
                    </button>
                  </div>
                </div>

                <div className="ml-24">
                  <button
                    onClick={toggleLike}
                    className="bg-blue-500 text-white px-4 py-2 rounded-3xl shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-7"
                  >
                    {totalLikes} Likes
                  </button>
                  <button className="bg-gray-500 rounded-3xl px-4 py-2 mr-7">
                    Share
                  </button>
                  <button
                    onClick={handleDownload}
                    className="bg-green-500 text-white px-4 py-2 rounded-3xl shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    Download
                  </button>
                </div>
              </div>

              <div>
                <Textarea
                  className="text-white mt-5 rounded-xl bg-gray-500 hover:cursor-pointer"
                  placeholder={description}
                />
              </div>
            </div>
          </div>
        </div>
        {/* ya samma */}
        {/* recommended videos code tala */}
        <div className="w-2/5 ">
          <div className="ml-4 mt-24">
            {totalVids.map((video) => (
              <div
                key={video._id}
                onClick={() => window.location.reload()}
                className="flex mt-3"
              >
                <SingleCol
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
      </div>
    </div>
  );
}

export default Video;
