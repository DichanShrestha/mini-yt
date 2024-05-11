import React, { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import useUser from "@/hook/useUser";

function VideoUtils({ vid, id }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await useUser();
      setUserID(response.data.data._id);
    })();
  }, []);

  const shouldDisplay = userID === id ? true : false;

  const editVideo = async () => {
    const response = await axios.patch(
      `http://localhost:8000/api/v1/videos/${vid}`,
      { title, description: desc, thumbnail },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  };

  const deleteVideo = async() => {
    const response = await axios.delete(
      `http://localhost:8000/api/v1/videos/${vid}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(response);
  };
  

  return shouldDisplay ? (
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger>
          <Button className="bg-gray-200 rounded-2xl">Edit</Button>
        </DialogTrigger>
        <DialogContent className="bg-slate-700 text-white">
          <DialogHeader>
            <DialogDescription>
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              <Label>Description</Label>
              <Input value={desc} onChange={(e) => setDesc(e.target.value)} />
              <Label>Thumbnail</Label>
              <Input
                type="file"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
              />
              <Button
                onClick={editVideo}
                className="bg-slate-800 mt-2 rounded-2xl"
              >
                Edit
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Button onClick={deleteVideo} className="bg-gray-200 rounded-2xl">Delete</Button>
    </div>
  ) : null;
}

export default VideoUtils;
