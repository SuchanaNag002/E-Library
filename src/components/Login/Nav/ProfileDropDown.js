import React, { useState } from "react";
import { UserAuth } from "@/context/authContext";
import {FaPowerOff} from "react-icons/fa"

export default function ProfileDropdown() {
  const {user, logOut } = UserAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  return (
    <div className="relative">
      <img
        src={user.photoURL}
        className="h-10 w-10 rounded-full cursor-pointer"
        onClick={handleDropdownToggle}
      />
      {isDropdownOpen && (
        <div className="absolute right-0  w-28 bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
          <button
            className="block px-2 py-1 text-xs text-gray-700 w-full rounded-lg hover:bg-slate-300"
            onClick={logOut}
          >
          <div className="flex gap-2 items-center justify-center"><FaPowerOff /><h1 className="font-extrabold text-sm">LOG OUT</h1></div>
          </button>
          <hr />
        </div>
      )}
    </div>
  );
}