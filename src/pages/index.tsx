import Layout from "./common/Layout";
import Link from "next/link";
import Loading from "./common/Loading";
import HistoryCard from "./history/components/HistoryCard";

import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

export default function Home() {
  return (
    <Layout>
      <section className="flex flex-col w-full items-center">
        <div className="mt-8 flex flex-col w-full items-center">
          <h3 className="font-bold text-7xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400">
            딱 1주일 갓생살고 만원 벌기
          </h3>
          <h4 className="mt-8 text-4xl text-gray-600 font-semibold">
            어제보다 더 멋지고 건강한 나 그리고 나의 인생
          </h4>
          <ul className="flex flex-col gap-8 mt-8 text-xl">
            <li>
              🎫 <b>참가비:</b> 3만원
            </li>
            <li>
              🏃 <b>갓생 조건:</b> 기상시간 인증 + 갓생 활동 인증 (하루에 2번
              인증)
            </li>
            <li>
              🏃‍♀️ <b>갓생 활동:</b> 운동/산책/독서/그림 그리기 등 생산적인 활동
            </li>
            <li>
              😎 <b>갓생 성공 시:</b> 4만원 환급
            </li>
            <li>
              🥹 <b>갓생 실패 시:</b> 참가비 몰수
            </li>
          </ul>
          <Link
            href="https://open.kakao.com/o/g0mKTf8e"
            target="_blank"
            className="mt-12 flex justify-center rounded-lg font-semibold text-gray-800  bg-gradient-to-r from-sky-200 to-violet-200 hover:from-sky-300 hover:to-violet-300 px-6 py-4"
          >
            🔥 갓생 = 만원 💶 도전하러 가기
          </Link>
        </div>
      </section>
    </Layout>
  );
}
