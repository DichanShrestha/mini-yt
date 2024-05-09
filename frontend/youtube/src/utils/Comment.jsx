import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUser from "@/hook/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Comment({ videoId }) {
  const [totalComment, setTotalComment] = useState([]);
  const [comment, setComment] = useState("");
  const [avatar, setAvatar] = useState(null);

  //current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await useUser();
        setAvatar(response.data.data.avatar);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  const addComment = async () => {
    const content = { content: comment };
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/comments/${videoId}`,
        content,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  //total comment
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:8000/api/v1/comments/${videoId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setTotalComment(response.data.data);
    })();
  }, []);

  return (
    <div>
      <p className="my-3">{totalComment.length} Comments</p>
      <div className="flex gap-3">
        <div>
          <Avatar>
            <AvatarImage className="w-11 h-10" src={avatar} />
            <AvatarFallback>avatar</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full flex flex-col gap-3">
          <div>
            <Input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border-t-0 border-x-0 -mt-3 focus:border-b-2 transition-colors duration-500 text-black w-full"
            />
          </div>
          <div className="flex justify-between">
            {comment && (
              <>
                <Button
                  onClick={() => setComment("")}
                  className="bg-gray-300 rounded-3xl hover:bg-gray-400"
                >
                  Cancel
                </Button>
                <Button
                  onClick={addComment}
                  className="bg-gray-300 rounded-3xl hover:bg-gray-400"
                >
                  Comment
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div>
        {totalComment.map((item) => (
          <div key={item._id} className="flex gap-3 my-3">
            <div>
              <Avatar>
                <AvatarImage
                  className="w-11 h-10"
                  src={item.commentator.avatar}
                />
                <AvatarFallback>avatar</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <div>{item.commentator.username}</div>
              <div>{item.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comment;
