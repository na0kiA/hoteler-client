import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    // <header className="nav-header" data-controller="header">
    <header
      className="w-full h-12 flex justify-center items-center border-t"
      data-controller="header"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8">
        <div className="relative h-16 flex justify-between nav-container">
          <div className="relative z-10 px-2 flex lg:px-0">
            <div className="flex-shrink-0 flex items-center">
              <Link href={"/hotels/"}>ホーム</Link>
            </div>
          </div>
          <div className="relative z-0 flex-1 px-2 flex items-center justify-center sm:absolute sm:inset-0">
            <div className="w-full sm:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </div>
                {/* <input
                  id="search"
                  name="search"
                  className="block w-full border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 focus:placeholder-gray-500 sm:text-sm hover:bg-gray-200"
                  placeholder="Search"
                  type="search"
                  data-header-target="search"
                  data-target-id="search-form"
                >
                  検索フォーム
                </input> */}
              </div>
            </div>
          </div>
          <div className="relative z-10 flex items-center lg:hidden">
            <button
              type="button"
              className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open menu</span>
            </button>
          </div>
          <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
            <div className="flex-shrink-0 relative ml-4">
              <div>
                <button
                  data-header-target="openUserMenu"
                  type="button"
                  className="bg-gray-800 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                </button>
              </div>
            </div>

            <div
              className="hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none divide-y divide-gray-100"
              id="menu-dropdown-items"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              data-transition-enter="transition ease-out duration-100"
              data-transition-enter-start="transform opacity-0 scale-95"
              data-transition-enter-end="transform opacity-100 scale-100"
              data-transition-leave="transition ease-in duration-75"
              data-transition-leave-start="transform opacity-100 scale-100"
              data-transition-leave-end="transform opacity-0 scale-95"
            >
              <div className="py-1" role="none">
                <div className="py-1" role="none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 携帯用 */}
      <nav className="lg:hidden" aria-label="Global" id="mobile-menu">
        <div className="border-t border-gray-700 pt-4 pb-3">
          <div className="px-4 flex items-center">
            <div className="flex-shrink-0">ユーザー画像</div>
            <div className="ml-3">
              <div className="text-base font-medium text-white">
                {/* <%= current_user&.full_name %> */}
                ユーザー名
              </div>
              <div className="text-sm font-medium text-gray-400">
                ユーザーEmail
              </div>
            </div>
          </div>
          <div className="mt-3 px-2 space-y-1">
            <a
              href="#"
              className="block rounded-md py-2 px-3 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              Your Profile
            </a>

            <a
              href="#"
              className="block rounded-md py-2 px-3 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              Settings
            </a>

            <a
              href="#"
              className="block rounded-md py-2 px-3 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
