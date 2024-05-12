import React from "react";
import { NavLink } from "react-router-dom";

function Elem({ picName, name, link }) {
  
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0"
      />
      <NavLink
        to={link}
        className={({isActive}) =>
          `flex h-10 items-center rounded-xl ${
            isActive ? "bg-gray-200 font-semibold" : ""
          } hover:bg-gray-300 gap-4`
        }
      >
        <div>
          <span className="ml-3 mt-1 material-symbols-outlined">{picName}</span>{" "}
        </div>
        <div>
          <p className="">{name}</p>
        </div>
      </NavLink>
    </>
  );
}

export default Elem;
