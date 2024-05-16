import React, {useState, useEffect} from "react";
import Elem from "./Elem";
import useUser from "@/hook/useUser";

function Sidebar() {
  const [channelId, setChannelId] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await useUser();
      setChannelId(data.data.data._id);
    })();
  }, []);
  const landingArr = [
    {
      id: 1,
      picName: "home",
      name: "Home",
      linkTo: "/",
    },
    {
      id: 2,
      picName: "subscriptions",
      name: "Subscriptions",
      linkTo: `/subscriptions/${channelId}`,
    },
  ];
  const youArr = [
    {
      id: 3,
      picName: "switch_account",
      name: "Your channel",
      linkTo: "/yourchannel",
    },
    {
      id: 4,
      picName: "history",
      name: "History",
      linkTo: "/history",
    },
    {
      id: 5,
      picName: "playlist_play",
      name: "Playlist",
      linkTo: "/playlist",
    },
    {
      id: 6,
      picName: "thumb_up",
      name: "Liked Videos",
      linkTo: "/likedvideos",
    },
  ];
  return (
    <div className="h-screen fixed w-1/6 p-4 overflow-y-auto mt-16">
      {landingArr.map((item) => (
        <div key={item.id} className="mb-2">
          <Elem picName={item.picName} name={item.name} link={item.linkTo} />
        </div>
      ))}

      <hr className="border-b-1 border-gray-400" />

      {youArr.map((item) => (
        <div key={item.id} className="mt-2">
          <Elem picName={item.picName} name={item.name} link={item.linkTo} />
        </div>
      ))}

      <hr className="border-b-1 border-gray-400 mt-2" />
      <div className="pt-2">
      <Elem picName="group" name='Community' link='/community'/>
      </div>
      <hr className="border-b-1 border-gray-400 mt-2" />
      <footer className=" text-sm mt-2">
        About Press Copyright Contact us Creators Advertise Developers Terms
        Privacy Policy & Safety How YouTube works Test new features © 2024
        Google LLC
      </footer>
    </div>
  );
}

export default Sidebar;
