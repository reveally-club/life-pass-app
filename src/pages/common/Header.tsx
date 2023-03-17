/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";

import Link from "next/link";
import Profile from "../account/components/Profile";

const Header: React.FC = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <header className="border-b">
      <nav className="flex item-center justify-between flex-wrap p-2 pl-3 md:p-0 container mx-auto">
        <div className="flex items-center flex-shrink-0">
          <Link
            className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400"
            href="/"
          >
            갓생.패쓰
          </Link>
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div
          className={`${!toggle && "hidden"} w-full md:flex md:w-auto mr-4`}
          id="navbar-default"
        >
          <ul className="flex flex-col items-center p-1 py-3 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
            <li>
              <Link
                href="/"
                className="block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 hover:font-bold"
                aria-current="page"
              >
                갓생.인증
              </Link>
            </li>
            <li>
              <Link
                href="/history"
                className="block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 hover:font-bold"
                aria-current="page"
              >
                갓생.기록
              </Link>
            </li>
            <li>
              <Profile />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
