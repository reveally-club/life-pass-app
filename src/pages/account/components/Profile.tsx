import { fireAuth } from "@/modules/firebase";
import Loading from "@/pages/common/Loading";
import { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

export default function Profile() {
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(fireAuth);

  useEffect(() => {}, [googleUser]);

  if (googleLoading) return <Loading size={2} />;

  return (
    <div>
      {googleUser ? (
        <img
          className="w-8 h-8 rounded-full hover:cursor-pointer hover:shadow-lg"
          src={googleUser.user.photoURL ?? "./og.png"}
          alt={googleUser.user.displayName!}
        />
      ) : (
        <button
          onClick={() => {
            signInWithGoogle();
          }}
          className="text-gray-900 bg-white hover:bg-gray-100 border focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5  text-center inline-flex items-center py-2"
        >
          로그인
        </button>
      )}
    </div>
  );
}
