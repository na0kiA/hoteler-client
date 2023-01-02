import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AuthContext } from "pages";

const Navbar = () => {
  const { currentUser, isSignedIn } = useContext(AuthContext);

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
      <div className="navbar bg-neutral text-neutral-content">
        <div className="flex-1 ml-2">
          <Link
            href={"/"}
            replace={true}
            className="btn btn-ghost normal-case text-lg p-0"
          >
            ホテラー
          </Link>
          <Image
            src="/hartIcon.png"
            alt="ホテル画像"
            width={100}
            height={100}
            priority={true}
          />
        </div>

        {/* PCで表示する検索バー */}
        <form className="invisible md:visible max-w-md m-auto">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-1 "
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
              placeholder="ホテルを検索"
              className="input input-bordered w-full h-10 py-3 pl-8"
            />
          </div>
        </form>

        {/* スマホで表示する検索バー */}
        <div className="flex-none gap-2">
          <label className="md:invisible relative mr-2" onClick={searchToggle}>
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

          {/* tokenの有無でアバターを表示するかログインや新規登録ボタンを表示するかを切り替える */}
          {currentUser ? (
            <div className="dropdown dropdown-end" onClick={showMenu}>
              <div tabIndex={1} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://placeimg.com/80/80/people" />
                </div>
              </div>
              <div className="badge badge-secondary badge-xs absolute inline-block right-1 top-1"></div>
              <ul
                tabIndex={1}
                style={{ display: displayMenuStyle }}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li className="justify-between">
                  <Link href="/user/notifications">
                    通知
                    <div className="badge badge-secondary badge-xs"></div>
                  </Link>
                </li>
                <li className="justify-between">
                  <Link href="/user/profile">プロフィール</Link>
                </li>
                <li>
                  <Link href="/user/profile">設定</Link>
                </li>
                <li>
                  <Link href="/">ログアウト</Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="navbar-end flex-1 gap-2 ml-8">
              <button className="btn btn-primary btn-xs md:btn-sm mr-3">
                <Link href="/login">ログイン</Link>
              </button>
              <button className="btn btn-primary btn-xs md:btn-sm ">
                <Link href="/signup">新規登録</Link>
              </button>
            </div>
          )}
        </div>
      </div>
      <>
        {search ? (
          <></>
        ) : (
          <form className="max-w-md px-4 m-auto mt-5">
            <div className="relative text-center">
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
                placeholder="ホテルを検索"
                className="input input-bordered w-full h-10 py-3 pl-12 pr-4  border rounded-md outline-none"
              />
            </div>
          </form>
        )}
      </>
    </>
  );
};

export default Navbar;
