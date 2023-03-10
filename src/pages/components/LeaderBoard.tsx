import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { fireStore } from "../../modules/firebase";
import dayjs from "dayjs";
import LeaderItem from "./LeaderItem";

export default function LeaderBoard() {
  const [value] = useCollection(
    query(collection(fireStore, "wakeup"), orderBy("updatedAt", "desc")),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div className="flex flex-col w-full items-center">
      <h2 className="text-4xl">기상인증 히스토리</h2>
      <h3 className="w-full mb-4 text-center mt-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400">
        패쓰 참가자 기상일지
      </h3>
      <ul className="w-full mt-4 overflow-auto text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
        {value?.docs.map((doc, key) => (
          <li
            key={key}
            className="w-full flex justify-between px-4 py-2 border-b border-gray-200 rounded-t-lg"
          >
            <h6 className="text-base font-semibold">{doc.data().name}</h6>
            <div className="flex">
              <p className="ml-4 mr-2">
                <LeaderItem
                  updatedAt={dayjs(doc.data().updatedAt.toDate()).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                  name={doc.data().name}
                />
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
