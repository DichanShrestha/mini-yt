import React, { useEffect, useState } from "react";
import useUser from "@/hook/useUser";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function YourChannel() {
  const [userData, setUserData] = useState(null);
  const [isHovered, setIsHovererd] = useState(false);
  const [newFilePath, setNewFilePath] = useState("");
  const [totalSubs, setTotalSubs] = useState("");
  const [totalVids, setTotalVids] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [video, setVideo] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await useUser();
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userData]);

  const avatar = userData?.data?.avatar;
  const username = userData?.data?.username;
  const fullname = userData?.data?.fullName;

  const changeUserAvatar = async () => {
    const formData = new FormData();
    formData.append("avatar", newFilePath);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };

      const res = await axios.patch(
        "http://localhost:8000/api/v1/users/avatar",
        formData,
        config
      );
      setUserData(res?.data?.data);
    } catch (error) {
      console.error("Error while changing userAvatar", error);
    }
  };

  useEffect(() => {
    const getUserStats = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/v1/dash/stats",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setTotalSubs(response?.data.data.totalSubs);
    };
    getUserStats();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "http://localhost:8000/api/v1/dash/videos",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setTotalVids(response?.data.data);
    })();
  }, []);

  const publishAVideo = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("thumbnail", thumbnail);
    formData.append("videoFile", video);
    console.log(formData);

    const response = await axios.post(
      "http://localhost:8000/api/v1/videos",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
  };

  return (
    <div className="h-screen w-screen pl-64 pt-16">
      <div className="flex gap-10 pt-10">
        <div>
          <Dialog>
            <DialogTrigger>
              <img
                onMouseEnter={() => setIsHovererd(true)}
                onMouseLeave={() => setIsHovererd(false)}
                className="h-40 w-40 border rounded-full hover:opacity-75"
                src={avatar}
                alt="avatar"
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) => setNewFilePath(e.target.files[0])}
                  />
                  <button onClick={changeUserAvatar}>Change</button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {isHovered && (
            <div className=" text-center rounded-md mt-1 absolute bg-slate-100">
              <p className="text-sm">Edit profile picture</p>
            </div>
          )}
        </div>
        <div>
          <h2 className=" font-medium text-3xl mb-3">{username}</h2>
          <p>
            {fullname} ‧ {totalSubs} Subscribers ‧{" "}
          </p>
        </div>
      </div>
      <div className="">
        <hr className="w-screen border-t-1 border-gray-400" />
        <p className="mt-2">Videos</p>
        {totalVids.length === 0 ? (
          <div className="flex justify-center items-center h-60">
            <div className="flex flex-col items-center">
              <img
                className="w-60"
                src="https://www.wyzowl.com/wp-content/uploads/2019/06/How-To-Create-a-YouTube-Channel-in-2019.png"
                alt="Create content"
              ></img>
              <p>Create content on any device</p>
              <p>Upload and record at home or on the go.</p>
              <p>Everything you make public will appear here.</p>

              <Dialog>
                <DialogTrigger>
                  <button className="mt-5 rounded-lg bg-black text-white py-2 px-3">
                    Create
                  </button>
                </DialogTrigger>
                <DialogContent className="p-10">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold mb-4">
                      Are you absolutely sure?
                    </DialogTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <Label htmlFor="title" className="mb-1">
                          Title
                        </Label>
                        <Input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          type="text"
                          id="title"
                          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <Label htmlFor="desc" className="mt-4 mb-1">
                          Description
                        </Label>
                        <Textarea
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                          id="desc"
                          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        ></Textarea>
                      </div>
                      <div>
                        <Label htmlFor="thumbnail" className="mb-1">
                          Thumbnail
                        </Label>
                        <Input
                          onChange={(e) => setThumbnail(e.target.files[0])}
                          type="file"
                          id="thumbnail"
                          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        <Label htmlFor="video" className="mt-4 mb-1">
                          Video
                        </Label>
                        <Input
                          onChange={(e) => setVideo(e.target.files[0])}
                          type="file"
                          id="video"
                          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <Button
                          type="submit"
                          onClick={publishAVideo}
                          className="bg-slate-200 text-black hover:bg-slate-300 hover:text-black"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default YourChannel;
