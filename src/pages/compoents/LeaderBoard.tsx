import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function LeaderBoard() {
  return (
    <div className="flex flex-col w-full items-center">
      <h2 className="text-4xl">리더보드</h2>
      <h3 className="w-full font-bold text-center mt-4 text-2xl italic text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400"></h3>
    </div>
  );
}
