import React, { memo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { signOut } from "lib/auth";
import { useAuthStateContext } from "context/AuthProvider";

const Navbar = memo(function navbar() {
  console.log("Navbarが呼ばれたよ");
  const router = useRouter();

  const [menuDisplay, setmenuDisplay] = useState(true);
  const [displayMenuStyle, setdisplayMenuStyle] = useState("");
  const [search, setSearch] = useState(true);

  const { currentUser, isSignedIn, loading, setIsSignedIn, setCurrentUser } =
    useAuthStateContext();

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

  const handleSignOutSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    try {
      const res = await signOut();
      if (res.status === 200) {
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsSignedIn(false);
        setCurrentUser(undefined);
        router.push("/");
      } else {
        throw new Error(
          "ログアウトに失敗しました。画面をご確認の上もう一度実行してください。"
        );
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="navbar bg-neutral text-neutral-content h-16">
        <div className="navbar-start flex-1 ml-2">
          <Link
            href={"/"}
            replace={true}
            className="btn btn-ghost normal-case text-lg p-0"
          >
            <Image
              src="/hartIcon.png"
              alt="ホテル画像"
              width={50}
              height={50}
              priority={true}
            />
            <span className="ml-2"> ホテラー</span>
          </Link>
        </div>

        {/* PCで表示する検索バー */}
        <form className="hidden md:block md:navbar-end m-auto">
          {/* <form className="hidden md:block md:navbar-center"> */}
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-400 left-1 "
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
              className="input input-bordered md:w-80 h-9 py-3 pl-8"
            />
          </div>
        </form>

        {/* スマホで表示する検索バー */}
        <div className="md:hidden navbar-center m-auto">
          <div className="relative" onClick={searchToggle}>
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
          </div>
        </div>

        {/* tokenの有無でアバターを表示するかログインや新規登録ボタンを表示するかを切り替える */}
        {isSignedIn && currentUser ? (
          <div className="m-auto">
            {/* 通知 */}
            <button className="btn btn-ghost btn-circle">
              <div className="indicator m-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>

            {/* アイコン */}
            <div className="dropdown dropdown-end" onClick={showMenu}>
              <div tabIndex={1} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Image
                    src={`https://hoteler-image.s3.ap-northeast-1.amazonaws.com/${currentUser?.image}`}
                    alt="アバター"
                    width={50}
                    height={50}
                    priority={true}
                  />
                </div>
              </div>
              <ul
                tabIndex={1}
                style={{ display: displayMenuStyle }}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li className="justify-between">
                  <Link href={`/users/${currentUser && currentUser.id}`}>
                    プロフィール
                  </Link>
                </li>
                <li>
                  <Link href="/users/settings">設定</Link>
                </li>
                <li className="justify-between">
                  <Link href={`/hotels/register`}>ホテルを掲載する</Link>
                </li>
                <li>
                  <button
                    onClick={(event) => {
                      handleSignOutSubmit(event);
                    }}
                  >
                    ログアウト
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            {loading ? (
              <></>
            ) : (
              <>
                <div className="gap-3">
                  <button className="btn btn-primary btn-xs">
                    <Link href="/signin">
                      <span className="text-ssm font-bold font-mono">
                        ログイン
                      </span>
                    </Link>
                  </button>
                  <button className="btn btn-primary btn-xs mr-2">
                    <Link href="/signup">
                      <span className="text-ssm font-bold font-mono">
                        新規登録
                      </span>
                    </Link>
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
      {/* </div> */}

      {/* スマホ用の検索トグルバー */}
      <div>
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
      </div>
    </>
  );
});

export default Navbar;
