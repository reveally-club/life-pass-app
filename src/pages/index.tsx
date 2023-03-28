import Layout from "./common/Layout";
import Link from "next/link";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { fireStore } from "@/modules/firebase";
import Loading from "./common/Loading";
import HistoryCard from "./history/components/HistoryCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Home() {
  const [season, setSeason] = useState("season-test");
  const [value, loading] = useCollection(
    query(
      collection(fireStore, season),
      orderBy("createdAt", "desc"),
      limit(5)
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  return (
    <Layout>
      <section className="flex flex-col w-full items-center">
        <div className="mt-8 flex flex-col w-full items-center">
          <h3 className="font-bold text-7xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400">
            딱 1주일 갓생살고 만원 벌기
          </h3>
          <>
            <Swiper
              className="w-full mt-8 mb-8"
              slidesPerView={1}
              spaceBetween={30}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
            >
              {loading ? <Loading /> : <div />}
              {value?.docs.map((doc, key) => (
                <SwiperSlide
                  className="flex justify-center align-middle m-1"
                  key={key}
                >
                  <HistoryCard
                    id={doc.id}
                    photo={doc.data().photo}
                    tagList={doc.data().tagList}
                    support={doc.data().support}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
          <h4 className="mt-8 text-4xl text-gray-600 font-semibold">
            어제보다 더 멋지고 건강한 나 그리고 나의 인생
          </h4>
          <ul className="flex flex-col gap-8 mt-8 text-xl">
            <li>
              🎫 <b>참가비:</b> 3만원
            </li>
            <li>
              🌄 <b>갓생 조건:</b> 기상시간 인증 + 갓생 활동 인증 (하루에 2번
              인증)
            </li>
            <li>
              🏃‍♀️ <b>갓생 활동:</b> 운동/산책/독서/그림 그리기/일기 쓰기 등
              생산적인 활동
            </li>
            <li>
              😎 <b>갓생 성공 시:</b> 4만원 환급
            </li>
            <li>
              🥲 <b>갓생 실패 시:</b> 참가비 몰수
            </li>
          </ul>
          <Link
            href="https://forms.gle/7j1rCN1pSYLjXp7w8"
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
