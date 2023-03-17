import Layout from "../common/Layout";
import HistoryCard from "./components/HistoryCard";

export default function History() {
  return (
    <Layout>
      <section className="mt-8 flex flex-col w-full items-center">
        <h2 className="text-4xl">갓생.기록</h2>
        <h3 className="mt-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400">
          🔥 갓생을 나누고 같이 성장해요 🔥
        </h3>
        <div className="flex flex-wrap gap-8 justify-center mt-8">
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
        </div>
      </section>
    </Layout>
  );
}
