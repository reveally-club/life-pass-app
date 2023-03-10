import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Timer() {
  const [time, setTime] = useState(dayjs().format("YYYY-MM-DD HH:mm:ss"));

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  const tick = () => {
    setTime(dayjs().format("YYYY-MM-DD HH:mm:ss"));
  };

  return (
    <div className="flex flex-col w-full items-center">
      <h2 className="text-4xl">현재 시간</h2>
      <h3 className="w-full font-bold text-center mt-4 text-2xl italic text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400">
        &quot;{time}&quot;
      </h3>
    </div>
  );
}
