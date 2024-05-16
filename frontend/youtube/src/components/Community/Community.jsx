import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import useUser from "@/hook/useUser";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Template from "./Template";
import axios from "axios";
import { Button } from "../ui/button";

function Community() {
  const [user, setUser] = useState("");
  const [commentUser, setCommentUser] = useState([])
  const [tweet, setTweet] = useState("");
  useEffect(() => {
    (async () => {
      const response = await useUser();
      setUser(response.data.data);
    })();
  }, []);

  const addTweet = async () => {
    await axios.post(
      "http://localhost:8000/api/v1/tweets",
      { tweet },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    setTweet('')
  };

  useEffect(() => {
    (async() => {
      const response = await axios.get(
        "http://localhost:8000/api/v1/tweets/get-all-tweets",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setCommentUser(response.data.data)
    })()
  }, [commentUser])

  return (
    <div className="relative">
      <Navbar />
      <Sidebar />
      <div className="absolute top-20 right-8 ">
        <Input
          className="w-96 rounded-2xl border-0 bg-gray-300 pl-4 text-gray-500"
          placeholder="Search Community"
        />
      </div>

      <div className="absolute top-36 left-64 w-3/5 ">
        <div className="flex">
          <Avatar>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>avatar</AvatarFallback>
          </Avatar>
          <Input
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            placeholder="What's happening?"
            className="rounded-2xl border-0 bg-gray-300 pl-4 text-gray-500 ml-4 mr-1"
          />
          <Button
            onClick={addTweet}
            className="bg-gray-300 rounded-2xl hover:bg-gray-200"
          >
            Add
          </Button>
        </div>
      </div>

      <div className="absolute top-52 w-4/5 left-64">
        <Template commentUser={commentUser} />
      </div>
    </div>
  );
}

export default Community;
