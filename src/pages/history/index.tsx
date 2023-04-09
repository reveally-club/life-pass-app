import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { fireStore } from "@/modules/firebase";
import Layout from "../common/Layout";
import HistoryCard from "./components/HistoryCard";
import Loading from "../common/Loading";
import { useState } from "react";

export default function History() {
  const [season, setSeason] = useState("season1");
  const [value, loading] = useCollection(
    query(collection(fireStore, season), orderBy("createdAt", "desc")),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <Layout>
      <section className="mt-8 flex flex-col w-full items-center">
        <h2 className="text-4xl">갓생.기록</h2>
        <h3 className="mt-2 text-transparent font-semibold bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400">
          🔥 갓생을 나누고 같이 성장해요 🔥
        </h3>
        <div className="flex flex-wrap gap-4">
          {/* <button
            onClick={() => {
              setSeason("season-test");
            }}
            className="relative mt-2 flex bg-gradient-to-r from-sky-200 to-violet-200 hover:from-sky-300 hover:to-violet-300 rounded-full px-3 py-1 text-sm mr-2 mb-2 hover:cursor-pointer"
          >
            season-test
          </button> */}
          <button
            onClick={() => {
              setSeason("season1");
            }}
            className="relative mt-2 flex bg-gradient-to-r from-sky-200 to-violet-200 hover:from-sky-300 hover:to-violet-300 rounded-full px-3 py-1 text-sm mr-2 mb-2 hover:cursor-pointer"
          >
            season-1
          </button>
        </div>
        <div className="flex flex-wrap gap-8 justify-center mt-8">
          {loading ? <Loading /> : <div />}
          {value?.docs.map((doc, key) => (
            <HistoryCard
              key={key}
              id={doc.id}
              photo={doc.data().photo}
              tagList={doc.data().tagList}
              support={doc.data().support}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
}
