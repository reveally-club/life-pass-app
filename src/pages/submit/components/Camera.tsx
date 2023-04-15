import React, { useState } from "react";
import { useRouter } from "next/router";
import { fireAuth, fireStorage, fireStore } from "@/modules/firebase";
import { ref } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import dayjs from "dayjs";

import Swal from "sweetalert2";
import {
  Timestamp,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Camera() {
  const router = useRouter();
  const storageRef = ref(
    fireStorage,
    `season1/season1-${dayjs().format("YYYY-MM-DD HH:mm:ss")}.jpg`
  );

  const [user] = useAuthState(fireAuth);
  const [message, setMessage] = useState("");

  const [uploadFile] = useUploadFile();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [capturedImage, setCapturedImage] = useState("");

  const wrapText = (
    context: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) => {
    const words = text.split(" ");
    let line = "";

    for (const word of words) {
      const testLine = line + word + " ";
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && line.length > 0) {
        context.fillText(line, x, y);
        line = word + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }

    context.fillText(line, x, y);
  };

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : undefined;
    setSelectedFile(file);

    if (file && file instanceof Blob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const publicSansFont = new FontFace(
          "PublicSans",
          "url(/fonts/PublicSans-Bold.ttf)"
        );
        publicSansFont.load().then(() => {
          // 커스텀 폰트 로드
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const img = new Image();
          img.src = reader!.result as string;

          img.onload = async () => {
            createImageBitmap(img).then(async (bitmap) => {
              const MAX_CANVAS_WIDTH = 1024;
              const MAX_CANVAS_HEIGHT = 1024;

              const ratio = Math.min(
                MAX_CANVAS_WIDTH / bitmap.width,
                MAX_CANVAS_HEIGHT / bitmap.height
              );

              const canvasWidth = bitmap.width * ratio;
              const canvasHeight = bitmap.height * ratio;
              canvas.width = canvasWidth;
              canvas.height = canvasHeight;

              if (ctx) {
                ctx.drawImage(bitmap, 0, 0, canvasWidth, canvasHeight);

                const time = dayjs().format("YYYY.MM.DD hh:mm:ss");
                ctx.font = `${Math.floor(canvas.width / 30)}px PublicSans`;
                ctx.fillStyle = "white";
                const lineHeight = Math.floor(canvas.width / 30);

                // 총 줄 수를 계산하고, 이를 기반으로 y 좌표를 정합니다.
                const title = `God Saeng 🎫`;
                const titleX = canvas.width / 90;
                const titleY = canvas.height * 0.06;
                const titleWidth = canvas.width;
                const titleHeight = lineHeight * 2;
                wrapText(ctx, title, titleX, titleY, titleWidth, titleHeight);

                const days = `🔥 ${time}`;
                const daysX = canvas.width / 90;
                const daysY =
                  canvas.height - canvas.height / 20 - lineHeight * 1.2;
                const daysWidth = canvas.width;
                const daysHeight = lineHeight * 2;
                wrapText(ctx, days, daysX, daysY, daysWidth, daysHeight);

                const msg = `📝 ${message}`;
                const msgX = canvas.width / 90;
                const msgY = canvas.height - canvas.height / 20;
                const msgWidth = canvas.width * 0.8;
                wrapText(ctx, msg, msgX, msgY, msgWidth, lineHeight);

                setCapturedImage(canvas.toDataURL());
              }
            });
          };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const onSubmit = async () => {
    try {
      if (selectedFile) {
        const blob = await fetch(capturedImage).then((res) => res.blob());
        const image = await uploadFile(storageRef, blob, {
          contentType: "image/jpeg",
        });

        const data = {
          photo: image?.metadata.fullPath,
          support: 0,
          tagList: dayjs().isAfter(
            dayjs().set("hour", 10).set("minute", 0).set("second", 0)
          )
            ? ["🎫시즌1", "🔥갓생인증"]
            : ["🎫시즌1", "🌄기상인증"],
          createdAt: Timestamp.fromDate(new Date()),
          updatedAt: Timestamp.fromDate(new Date()),
          isSuccess: true,
          user: {
            displayName: user?.displayName,
            uid: user?.uid,
          },
        };

        const season = doc(collection(fireStore, "season1"));
        await setDoc(season, data);
      }
    } catch (err) {
      Swal.fire({
        showCancelButton: true,
        icon: "error",
        title: "갓생.오류",
        text: `${err}`,
      });
    }
  };

  const getRandomMessage = async () => {
    const collectionRef = collection(fireStore, "watermark");
    const querySnapshot = await getDocs(collectionRef);
    const totalMessages = querySnapshot.docs.length;

    if (totalMessages === 0) {
      return "No messages available.";
    }

    const randomIndex = Math.floor(Math.random() * totalMessages);
    const randomMessageDoc = querySnapshot.docs[randomIndex];
    const message = randomMessageDoc.data().message;

    return message;
  };

  const dataURLToBlob = (dataURL: string) => {
    const BASE64_MARKER = ";base64,";
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
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
                    const imageBlob = dataURLToBlob(capturedImage);
                    const fileName = "life-pass.png";
                    const file = new File([imageBlob], fileName, {
                      type: "image/png",
                    });

                    const filesArray = [file];

                    navigator.share({
                      files: filesArray,
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
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={message}
            onChange={handleChange}
            className="bg-gray-50 border-2 border-sky-300 focus:border-violet-300 text-gray-900 text-sm rounded-lg block w-full p-3 outline-0"
            placeholder="갓생 문구 입력하기"
          />
          <label
            className={`w-full flex justify-center cursor-pointer rounded-lg py-3 font-semibold text-gray-800  ${
              user
                ? "bg-gradient-to-r from-sky-200 to-violet-200 hover:from-sky-300 hover:to-violet-300"
                : "bg-gradient-to-r from-sky-100 to-violet-100"
            }`}
          >
            {user ? (
              <>
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
              </>
            ) : (
              <>🔥 갓생 인증에는 로그인이 필요합니다.</>
            )}
          </label>
        </div>
      )}
    </div>
  );
}
