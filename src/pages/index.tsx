import { useRef, useState } from "react";
import Layout from "./common/Layout";
import Timer from "./compoents/Timer";
import { fireStorage, fireStore } from "../../modules/firebase";
import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import { useUploadFile } from "react-firebase-hooks/storage";
import { ref } from "firebase/storage";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export default function Home() {
  const [name, setName] = useState("");
  const [uploadFile] = useUploadFile();
  const [imgFile, setImgFile] = useState("");

  const storageRef = ref(
    fireStorage,
    `${name}-${dayjs().format("YYYY-MM-DD HH:mm:ss")}.jpg`
  );
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleWakeUp = async () => {
    if (selectedFile) {
      const image = await uploadFile(storageRef, selectedFile, {
        contentType: "image/jpeg",
      });

      const data = {
        imageUrl: image?.metadata.fullPath,
        name,
        updatedAt: Timestamp.fromDate(new Date()),
      };
      const newWakeUp = doc(collection(fireStore, "wakeup"));

      await setDoc(newWakeUp, data);

      setName("");
      Swal.fire("오늘도 갓생 완료!", "톡방에서 인증도 해보자!", "success");
    }
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : undefined;
    setSelectedFile(file);
    const reader = new FileReader();
    if (reader) {
      reader.readAsDataURL(file!);
      reader.onloadend = () => {
        setImgFile(reader!.result as string);
      };
    }
  };

  return (
    <Layout>
      <section className="flex flex-col w-full items-center">
        <article className="mt-10 flex flex-col w-full items-center">
          <Timer />
          <h4 className="w-full font-semibold text-center mt-8 text-xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400">
            이름
          </h4>
          <input
            required
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              console.log(e.target.value);
            }}
            className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            type="text"
            placeholder="등록하신 이름을 입력해주세요."
          />
          <h4 className="w-full font-semibold text-center mt-8 text-xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400">
            기상 인증 이미지
          </h4>
          <div
            className={`${
              imgFile ? "hidden" : "flex"
            } items-center justify-center w-full`}
          >
            <label
              htmlFor="dropzone-file"
              className="mt-4 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                required
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleImageFile}
              />
            </label>
          </div>
          <img
            className={`${
              imgFile ? "flex" : "hidden"
            } items-center justify-center w-full h-128 mt-4 border-2 rounded-lg`}
            src={imgFile ? imgFile : ""}
            alt="기상 인증 이미지"
          />
          {imgFile && (
            <button
              onClick={handleWakeUp}
              className="relative w-full mt-8 mb-8 inline-flex items-center justify-center p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-violet-400 to-sky-400 group-hover:from-violet-500 group-hover:to-sky-400 hover:text-white focus:outline-none focus:ring-sky-300"
            >
              <span className="relative w-full px-5 py-2.5 font-medium transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                인증하기
              </span>
            </button>
          )}
        </article>
      </section>
    </Layout>
  );
}
