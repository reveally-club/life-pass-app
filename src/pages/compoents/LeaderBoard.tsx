import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { fireStore } from "../../../modules/firebase";
import dayjs from "dayjs";
import { useState } from "react";

export default function LeaderBoard() {
  const [name, setName] = useState("");
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
      {/* <div className="flex w-full items-start">
        <input
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2 "
          type="text"
          placeholder="참가자 이름"
        />
      </div> */}
      <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
        {value?.docs.map((doc, key) => (
          <li
            key={key}
            className="w-full flex justify-between px-4 py-2 border-b border-gray-200 rounded-t-lg"
          >
            {/* <img src={doc.data().image} alt={doc.data().name} /> */}
            <h6 className="text-base font-semibold">{doc.data().name}</h6>
            <div className="flex">
              {doc.data().name ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
              <p className="ml-2">
                {dayjs(doc.data().updatedAt.toDate()).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
