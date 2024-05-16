import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import useVideo from "./hook/useVideo";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import useUser from "@/hook/useUser";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";
import axios from "axios";
import useSearch from "@/hook/useSearch";

function App() {
  const [totalVids, setTotalVids] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [video, setVideo] = useState("");
  const [query, setQuery] = useState("");

  let userAvatar;
  useEffect(() => {
    (async () => {
      const video = await useVideo();
      setTotalVids(video);
    })();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await useUser();
        setUser(userData);
        setIsSignedIn(true);
      } catch (error) {
        console.error("Error while fetching user:", error);
        setIsSignedIn(false);
      }
    };

    fetchUser();
  }, []);
  userAvatar = user?.data.data.avatar;
  const navigateToSignIn = () => {
    navigate("/signin");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const closeDropdown = () => {
      setDropdownOpen(false);
    };

    if (dropdownOpen) {
      document.addEventListener("click", closeDropdown);
    } else {
      document.removeEventListener("click", closeDropdown);
    }

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, [dropdownOpen]);

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
    console.log(response);
  };

  useEffect(() => {
    (async () => {
      const data = await useSearch({ query });
      setTotalVids(data)
    })();
  }, [query]);

  return (
    <div>
      <nav className="bg-white shadow-lg fixed top-0 w-full z-50">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/">
                  <img
                    className="h-8 w-auto"
                    src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
                    alt="YouTube Logo"
                  />
                </Link>
              </div>
            </div>

            <div className="relative flex py-3 w-96">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
              />
            </div>

            <div className="hidden sm:flex sm:items-center sm:ml-6">
              {!isSignedIn && (
                <button
                  onClick={navigateToSignIn}
                  className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-full text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:border-red-700 focus:ring-red active:bg-red-700 transition ease-in-out duration-150"
                >
                  Sign in
                </button>
              )}

              <Dialog>
                <DialogTrigger>
                  <span className="mx-2 material-symbols-outlined">
                    video_call
                  </span>
                </DialogTrigger>
                <DialogContent className="bg-slate-800 p-8 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold mb-4">
                      Add your video
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
                          disabled={false}
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
              <div
                id="img"
                className="relative ml-3"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown();
                }}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <img
                      className="object-cover w-10 h-10 rounded-full cursor-pointer"
                      src={
                        userAvatar
                          ? userAvatar
                          : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                      }
                      alt="user"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=" mr-20 w-52 bg-slate-700 text-white rounded-2xl p-4">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Update Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/signout">Sign Out</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Sidebar />
      <div className="flex flex-wrap gap-10 ml-60 w-4/5 pt-20">
        {totalVids &&
          totalVids.map((video) => (
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
    </div>
  );
}

export default App;
