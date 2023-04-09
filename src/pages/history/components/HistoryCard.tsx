import { useState } from "react";
import { NextPage } from "next";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Firework from "./Firework";
import { ref } from "firebase/storage";
import { fireStorage, fireStore } from "@/modules/firebase";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";

interface Props {
  id: string;
  photo: string;
  tagList: string[];
  support: number;
}

const HistoryCard: NextPage<Props> = ({ id, photo, tagList, support }) => {
  const storageRef = ref(fireStorage);

  const [historyPhoto, loading] = useDownloadURL(ref(storageRef, `${photo}`));
  const [isFirework, setIsFirework] = useState(false);

  async function handleSupport() {
    const seasonRef = doc(collection(fireStore, "season1"), `${id}`);

    const preSupport =
      (await getDoc(seasonRef).then((doc) => doc.data()?.support)) + 1;

    await updateDoc(seasonRef, {
      support: preSupport,
    });

    handleFirework();
  }

  async function handleFirework() {
    setIsFirework(true);

    setTimeout(() => {
      setIsFirework(false);
    }, 2000);
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-md hover:shadow-lg hover:cursor-pointer">
      <Zoom>
        <img
          className="w-full"
          src={loading ? "/og.png" : historyPhoto}
          alt={photo}
        />
      </Zoom>
      <div className="flex justify-between px-2 pt-4 pb-2">
        <div>
          {tagList &&
            tagList.map((data, key) => (
              <span
                key={key}
                className="inline-block bg-gray-50 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {data}
              </span>
            ))}
        </div>
        {isFirework && <Firework />}
        <span
          onClick={handleSupport}
          className="relative flex hover:bg-gradient-to-r from-sky-100 to-violet-100 rounded-full px-3 py-1 text-sm mr-2 mb-2 hover:cursor-pointer"
        >
          👏 {support}명의 응원!
        </span>
      </div>
    </div>
  );
};

export default HistoryCard;
