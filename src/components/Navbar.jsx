import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets.js";

const Navbar = ({ setToken }) => {
  const [dialogBox, setDialogBox] = useState(false);
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img className="w-[150px]" src={assets.admin_logo} alt="" />
      <button
        // onClick={() => setToken("")}
        onClick={() => setDialogBox(true)}
        className="cursor-pointer bg-gray-600 text-white px-5 py-2 sm:px-7 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
      {dialogBox ? (
        <div
          className={` border p-20 fixed top-[50%] left-[50%] bg-amber-200 flex flex-col gap-10`}
        >
          <p>Are you sure?</p>
          <div className="flex gap-10">
            <button
              className="border px-4"
              onClick={() => {
                setDialogBox(false);
                setToken("");
              }}
            >
              Yes
            </button>
            <button
              className="border px-4"
              onClick={() => {
                setDialogBox(false);
              }}
            >
              No
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
