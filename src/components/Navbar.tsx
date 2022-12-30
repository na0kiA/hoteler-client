import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [menuDisplay, setmenuDisplay] = useState(true);
  const [displayMenuStyle, setdisplayMenuStyle] = useState("");
  const [search, setSearch] = useState(true);

  const searchToggle = () => {
    setSearch(!search);
  };

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
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1 ml-2">
          <Link
            href={"/"}
            replace={true}
            className="btn btn-ghost normal-case text-lg p-0"
          >
            ホテラー
          </Link>
        </div>
        <div className="flex-none">
          <label className={"relative mr-2"} onClick={searchToggle}>
            <button className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block absolute mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="text-[5px] inline-block absolute bottom-2 ">
                検索
              </span>
            </button>
          </label>
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
      <>
        {search ? (
          <></>
        ) : (
          // <div className="text-center">
          //   <input
          //     className="input input-bordered w-full max-w-xs inline-block"
          //     type="search"
          //     name="search"
          //     placeholder="(例) 渋谷 〇〇町"
          //   />

          //   <button className="btn btn-ghost btn-circle">
          //     <svg
          //       xmlns="http://www.w3.org/2000/svg"
          //       className="h-6 w-6 inline-block absolute"
          //       fill="none"
          //       viewBox="0 0 24 24"
          //       stroke="currentColor"
          //     >
          //       <path
          //         strokeLinecap="round"
          //         strokeLinejoin="round"
          //         strokeWidth="2"
          //         d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          //       />
          //     </svg>
          //   </button>
          // </div>
          <form className="max-w-sm px-4">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              />
            </div>
          </form>
        )}
      </>
    </>
  );
};

export default Navbar;
