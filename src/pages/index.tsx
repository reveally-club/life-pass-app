import { useCallback, useRef, useState } from "react";
import Layout from "./common/Layout";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import Camera from "./common/Camera";

export default function Home() {
  return (
    <Layout>
      <section className="mt-8 flex flex-col w-full items-center">
        <h2 className="text-4xl">갓생.인증</h2>
        <h3 className="mt-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400">
          👍 갓생으로 성장한 하루를 보내세요. 👍
        </h3>
        <Camera />
        <p className="w-full flex justify-center mt-6 text-sm text-gray-500">
          ✔️ 인증 사진은 갓생.기록에 등록됩니다. ✔️
        </p>
      </section>
    </Layout>
  );
}
