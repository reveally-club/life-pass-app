import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { fireStore } from "../../../modules/firebase";
import dayjs from "dayjs";

export default function LeaderBoard() {
  const [value, loading, error] = useCollection(
    collection(fireStore, "wakeup"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div className="flex flex-col w-full items-center">
      <h2 className="text-4xl">리더보드</h2>
      <h3 className="w-full font-bold text-center mt-4 text-2xl italic text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400"></h3>
      <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
        {value?.docs.map((doc, key) => (
          <li
            key={key}
            className="w-full flex justify-between px-4 py-2 border-b border-gray-200 rounded-t-lg"
          >
            {/* <img src={doc.data().image} alt={doc.data().name} /> */}
            <h6 className="text-base font-semibold">{doc.data().name}</h6>
            <p>
              {dayjs(doc.data().updatedAt.toDate()).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
