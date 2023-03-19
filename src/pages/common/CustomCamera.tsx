import dayjs from "dayjs";
import React, { useRef, useState } from "react";

import Swal from "sweetalert2";

export default function CustomCamera() {
  const [cam, setCam] = useState(false);
  const [capturedImage, setCapturedImage] = useState("");

  const handleCam = async () => {
    const constraints = { video: true };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (mediaStream) {
        const video = document.querySelector("video");

        if (video) {
          video.srcObject = mediaStream;
          video.onloadedmetadata = function (e) {
            video.play();
          };
        }
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
      });
    setCam(!cam);
  };

  const handleCapture = async () => {
    const video = document.querySelector("video");
    const canvas = document.createElement("canvas");

    if (video) {
      const { videoWidth, videoHeight } = video;

      canvas.width = videoWidth;
      canvas.height = videoHeight;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

        const time = dayjs().format("YYYY.MM.DD");
        ctx.font = "24px Courier New";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(
          `🎫 life.pass ${time}`,
          videoWidth / 2 - ctx.measureText(time).width,
          videoHeight - 40
        );

        setCapturedImage(canvas.toDataURL());
      }
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleCam}
        className={`${
          cam && "hidden"
        } w-full mt-8 flex justify-center rounded-lg py-3 font-semibold text-gray-800 bg-gradient-to-r from-sky-200 to-violet-200 hover:from-sky-300 hover:to-violet-300`}
      >
        📸 인증용 카메라 켜기
      </button>
      <div className="w-full mt-8 mb-8 flex justify-center">
        {capturedImage && <img src={capturedImage} alt="갓생.인증" />}
        {cam && !capturedImage ? (
          <video className="w-full" autoPlay />
        ) : (
          <div />
        )}
      </div>
      {capturedImage ? (
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
              setCapturedImage("");
            }}
            className="w-full flex justify-center rounded-lg py-3 font-semibold text-gray-800  bg-gradient-to-r from-sky-50 to-violet-50 hover:from-sky-100 hover:to-violet-100"
          >
            👋 인증 재촬영
          </button>
        </div>
      ) : (
        <button
          onClick={handleCapture}
          className={`${
            !cam && "hidden"
          } w-full flex justify-center rounded-lg py-3 font-semibold text-gray-800  bg-gradient-to-r from-sky-200 to-violet-200 hover:from-sky-300 hover:to-violet-300`}
        >
          📸 인증 촬영
        </button>
      )}
    </div>
  );
}
