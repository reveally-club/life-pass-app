import { fireAuth, fireStore } from "@/modules/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Rise = () => {
  const [user] = useAuthState(fireAuth);

  const onSubmit = async () => {
    const seasonRef = doc(collection(fireStore, "season1"), "");

    await updateDoc(seasonRef, {
      riseList: [],
    });
  };

  return (
    <>
      {user ? (
        <button className="w-full flex justify-center rounded-lg py-3 font-semibold text-gray-800  bg-gradient-to-r from-sky-50 to-violet-50 hover:from-sky-100 hover:to-violet-100">
          🌅 기상 인증
        </button>
      ) : (
        <></>
      )}
    </>
  );
};

export default Rise;
