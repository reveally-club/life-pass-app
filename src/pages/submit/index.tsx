import Layout from "../common/Layout";
import Camera from "./components/Camera";
import Rise from "./components/Rise";

export default function Submit() {
  return (
    <Layout>
      <section className="mt-8 flex flex-col w-full items-center">
        <h2 className="text-4xl">갓생.인증</h2>
        <h3 className="mt-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400">
          👍 갓생으로 성장한 하루를 보내세요. 👍
        </h3>
        <div className="flex flex-col w-full gap-4">
          <Camera />
          {/* <Rise /> */}
        </div>
        <p className="w-full flex justify-center mt-6 text-sm text-gray-500">
          ✔️ 인증 사진은 갓생.기록에 등록됩니다. ✔️
        </p>
      </section>
    </Layout>
  );
}
