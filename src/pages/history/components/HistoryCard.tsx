import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Firework from "./Firework";

export default function HistoryCard() {
  const [isFirework, setIsFirework] = useState(false);

  function handleFirework() {
    setIsFirework(true);

    setTimeout(() => {
      setIsFirework(false);
    }, 1000);
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-md hover:shadow-lg hover:cursor-pointer">
      <Zoom>
        <img className="w-full" src="/og.png" alt="Sunset in the mountains" />
      </Zoom>
      <div className="flex justify-between px-2 pt-4 pb-2">
        <div>
          <span className="inline-block bg-gray-50 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            🎫 시즌1
          </span>
          <span className="inline-block bg-gray-50 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            🌅 수면습관
          </span>
        </div>
        {isFirework && <Firework />}
        <span
          onClick={handleFirework}
          className="relative flex hover:bg-gradient-to-r from-sky-100 to-violet-100 rounded-full px-3 py-1 text-sm mr-2 mb-2 hover:cursor-pointer"
        >
          👏 1명의 응원!
        </span>
      </div>
    </div>
  );
}
