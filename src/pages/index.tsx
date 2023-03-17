import { useCallback, useRef, useState } from "react";
import Layout from "./common/Layout";
import Webcam from "react-webcam";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export default function Home() {
  const [capture, setCapture] = useState<string>("");
  const [cam, setCam] = useState<Boolean>(false);
  const webcamRef = useRef<Webcam>(null);

  const onCam = () => {
    setCam(!cam);
  };

  const onCapture = useCallback(() => {
    const video = webcamRef?.current?.video;

    if (video) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      const time = dayjs().format("YYYY.MM.DD");

      if (ctx) {
        ctx.font = "24px Courier New";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(
          `🎫 life.pass ${time}`,
          canvas.width / 2 - ctx.measureText(time).width / 2,
          canvas.height - 40
        );
      }

      setCapture(canvas.toDataURL());
    }
  }, [webcamRef]);

  return (
    <Layout>
      <section className="mt-8 flex flex-col w-full items-center">
        <h2 className="text-4xl">갓생.인증</h2>
        <h3 className="mt-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400">
          👍 갓생으로 성장한 하루를 보내세요. 👍
        </h3>
        <div className="w-full">
          <button
            onClick={onCam}
            className={`${
              cam && "hidden"
            } w-full mt-8 flex justify-center rounded-lg py-3 font-semibold text-gray-800 bg-gradient-to-r from-sky-200 to-violet-200 hover:from-sky-300 hover:to-violet-300`}
          >
            📸 인증용 카메라 켜기
          </button>
          <div className="w-full mt-8 mb-8 flex justify-center">
            {capture && <img src={capture} alt="갓생.인증" />}
            {cam && !capture ? (
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: { exact: "environment" } }}
              />
            ) : (
              <div />
            )}
          </div>
          {capture ? (
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  Swal.fire({
                    showCancelButton: true,
                    icon: "success",
                    title: "갓생.패쓰",
                    confirmButtonText: "갓생.확인",
                    confirmButtonColor: "#38bdf8",
                    cancelButtonText: "📝 갓생.공유",
                    cancelButtonColor: "#a78bfa",
                  }).then((result) => {
                    if (!result.isConfirmed) {
                      if (navigator.share) {
                        navigator.share({
                          title: "오늘도 갓생.패쓰 🎫",
                          text: "오늘도 갓생으로 성장한 하루 🔥",
                          url: "https://life.reveally.club",
                        });
                      } else {
                        Swal.fire({
                          icon: "error",
                          title: "갓생.오류",
                          text: "갓생.공유가 지원되지 않는 환경입니다.",
                          confirmButtonText: "확인",
                          confirmButtonColor: "#38bdf8",
                        });
                      }
                    }
                  });
                }}
                className="w-full flex justify-center rounded-lg py-3 font-semibold text-gray-800  bg-gradient-to-r from-sky-200 to-violet-200 hover:from-sky-300 hover:to-violet-300"
              >
                👏 제출
              </button>
              <button
                onClick={() => {
                  setCapture("");
                }}
                className="w-full flex justify-center rounded-lg py-3 font-semibold text-gray-800  bg-gradient-to-r from-sky-50 to-violet-50 hover:from-sky-100 hover:to-violet-100"
              >
                👋 인증 재촬영
              </button>
            </div>
          ) : (
            <button
              onClick={onCapture}
              className={`${
                !cam && "hidden"
              } w-full flex justify-center rounded-lg py-3 font-semibold text-gray-800  bg-gradient-to-r from-sky-200 to-violet-200 hover:from-sky-300 hover:to-violet-300`}
            >
              📸 인증 촬영
            </button>
          )}
          <p className="w-full flex justify-center mt-6 text-sm text-gray-500">
            ✔️ 인증 사진은 갓생.기록에 등록됩니다. ✔️
          </p>
        </div>
      </section>
    </Layout>
  );
}
