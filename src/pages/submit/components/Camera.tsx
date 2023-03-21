import React, { useState } from "react";
import { useRouter } from "next/router";
import { fireStorage, fireStore } from "@/modules/firebase";
import { ref } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import dayjs from "dayjs";

import Swal from "sweetalert2";
import { Timestamp, collection, doc, setDoc } from "firebase/firestore";

export default function Camera() {
  const router = useRouter();
  const storageRef = ref(
    fireStorage,
    `season-test/test-${dayjs().format("YYYY-MM-DD HH:mm:ss")}.jpg`
  );

  const [uploadFile] = useUploadFile();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [capturedImage, setCapturedImage] = useState("");

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : undefined;
    setSelectedFile(file);

    if (file && file instanceof Blob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const img = new Image();
        img.src = reader!.result as string;

        img.onload = () => {
          createImageBitmap(img).then((bitmap) => {
            const MAX_CANVAS_WIDTH = 512;
            const MAX_CANVAS_HEIGHT = 512;
            const canvasWidth = Math.min(bitmap.width, MAX_CANVAS_WIDTH);
            const canvasHeight = Math.min(bitmap.height, MAX_CANVAS_HEIGHT);
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            const ratio = Math.min(
              MAX_CANVAS_WIDTH / bitmap.width,
              MAX_CANVAS_HEIGHT / bitmap.height
            );
            const drawWidth = bitmap.width * ratio;
            const drawHeight = bitmap.height * ratio;
            const drawX = (canvasWidth - drawWidth) / 2;
            const drawY = (canvasHeight - drawHeight) / 2;

            if (ctx) {
              ctx.drawImage(bitmap, drawX, drawY, drawWidth, drawHeight);

              const time = dayjs().format("YYYY.MM.DD");
              ctx.font = `${Math.floor(canvas.width / 20)}px Courier New`;
              ctx.fillStyle = "white";
              ctx.textAlign = "center";
              ctx.fillText(
                `🎫 life.pass ${time}`,
                canvas.width / 2,
                canvas.height - canvas.width / 20
              );

              setCapturedImage(canvas.toDataURL());
            }
          });
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async () => {
    if (selectedFile) {
      const image = await uploadFile(storageRef, selectedFile, {
        contentType: "image/jpeg",
      });

      const data = {
        photo: image?.metadata.fullPath,
        support: 0,
        tagList: ["🎫시즌1", "🌄기상인증"],
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
        user: {
          displayName: "test",
          uid: "test",
        },
      };

      const season = doc(collection(fireStore, "season-test"));
      await setDoc(season, data);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full mt-8 mb-8 flex justify-center">
        {capturedImage && <img src={capturedImage} alt="갓생.인증" />}
      </div>
      {capturedImage ? (
        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              onSubmit();
              Swal.fire({
                showCancelButton: true,
                icon: "success",
                title: "갓생.패쓰",
                confirmButtonText: "🔥 갓생.확인",
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
                      title: "오류",
                      text: "공유가 지원되지 않는 환경입니다.",
                      confirmButtonText: "확인",
                      confirmButtonColor: "#38bdf8",
                    });
                  }
                } else {
                  router.push("/history");
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
            📸 다른 사진으로 인증하기
          </button>
        </div>
      ) : (
        <label className="w-full flex justify-center cursor-pointer rounded-lg py-3 font-semibold text-gray-800  bg-gradient-to-r from-sky-200 to-violet-200 hover:from-sky-300 hover:to-violet-300">
          📸 갓생 인증하기
          <input
            required
            id="pass-file"
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleCapture}
          />
        </label>
      )}
    </div>
  );
}
