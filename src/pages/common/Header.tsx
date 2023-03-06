/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="border-b">
      <nav className="flex item-center justify-between flex-wrap p-3 pl-3 container mx-auto md:p-2">
        <div className="flex items-center flex-shrink-0 mr-12">
          <Link
            className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400"
            href="/"
          >
            갓생.패쓰
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
