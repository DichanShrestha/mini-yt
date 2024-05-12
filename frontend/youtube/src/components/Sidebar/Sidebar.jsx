import React from "react";
import Elem from "./Elem";

function Sidebar() {
  const landingArr = [
    {
      picName: "home",
      name: "Home",
      linkTo: "/",
    },
    {
      picName: "subscriptions",
      name: "Subscriptions",
      linkTo: "/subscriptions",
    },
  ];
  const youArr = [
    {
      picName: "switch_account",
      name: "Your channel",
      linkTo: "/yourchannel",
    },
    {
      picName: "history",
      name: "History",
      linkTo: "/history",
    },
    {
      picName: "playlist_play",
      name: "Playlist",
      linkTo: "/playlist",
    },
    {
      picName: "thumb_up",
      name: "Liked Videos",
      linkTo: "/likedvideos",
    },
  ];
  return (
    <div className="h-screen fixed w-1/6 p-4 overflow-y-auto mt-16">
      {landingArr.map((item) => (
        <div className="mb-2">
          <Elem picName={item.picName} name={item.name} link={item.linkTo} />
        </div>
      ))}

      <hr className="border-b-1 border-gray-400" />

      {youArr.map((item) => (
        <div className="mt-2">
          <Elem picName={item.picName} name={item.name} link={item.linkTo} />
        </div>
      ))}

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
