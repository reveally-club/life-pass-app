/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="border-b">
      <nav className="flex item-center justify-between flex-wrap p-2 pl-3 container mx-auto">
        <div className="flex items-center flex-shrink-0 mr-12">
          <Link
            className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400"
            href="/"
          >
            갓생.패쓰
          </Link>
        </div>
        <div className="w-full md:flex md:w-auto mr-4">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
            <li>
              <Link
                href="/leader"
                className="block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 hover:font-bold"
                aria-current="page"
              >
                리더보드
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 hover:font-bold"
                aria-current="page"
              >
                기상인증
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
