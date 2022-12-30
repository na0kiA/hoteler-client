import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [menuDisplay, setmenuDisplay] = useState(true);
  const [displayMenuStyle, setdisplayMenuStyle] = useState("");

  const showMenu = () => {
    setmenuDisplay(!menuDisplay);
    if (menuDisplay) {
      setdisplayMenuStyle("");
    } else {
      setdisplayMenuStyle("none");
    }
    return setdisplayMenuStyle;
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link
          href={"/"}
          replace={true}
          className="btn btn-ghost normal-case text-xl"
        >
          ホテラー
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
          />
        </div>
        <div className="dropdown dropdown-end" onClick={showMenu}>
          <div tabIndex={1} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://placeimg.com/80/80/people" />
            </div>
          </div>
          <ul
            tabIndex={1}
            style={{ display: displayMenuStyle }}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li className="justify-between">
              <Link href="/">
                プロフィール<span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link href="/">設定</Link>
            </li>
            <li>
              <Link href="/">ログアウト</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Navbar;
