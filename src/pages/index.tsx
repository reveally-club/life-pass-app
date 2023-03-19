import { useRouter } from "next/router";
import Layout from "./common/Layout";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <section className="flex flex-col w-full items-center">
        <div className="mt-8 flex flex-col w-full items-center">
          <h3 className="font-bold text-7xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400">
            Coming Soon
          </h3>
          <p className="mt-8 text-xl text-gray-600 font-semibold">
            Season0, 내기형 기상미션 인증을 끝내고 다음 시즌을 준비하고
            있습니다.
          </p>
          <Link
            href="https://open.kakao.com/o/g0mKTf8e"
            target="_blank"
            className="flex justify-center rounded-lg font-semibold text-gray-800  bg-gradient-to-r from-sky-200 to-violet-200 hover:from-sky-300 hover:to-violet-300 px-6 py-4 mt-6"
          >
            💬 Season0, 🌄내기형 기상미션 인증방🌄 구경하기
          </Link>
        </div>
      </section>
    </Layout>
  );
}
