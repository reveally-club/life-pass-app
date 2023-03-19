import { useEffect, useState } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { fireAuth } from "@/modules/firebase";
import Loading from "@/pages/common/Loading";
import { User } from "firebase/auth";

export default function Profile() {
  const [signInWithGoogle, googleLoading] = useSignInWithGoogle(fireAuth);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = fireAuth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  if (googleLoading) return <Loading size={2} />;

  return (
    <div>
      {user ? (
        <img
          className="w-8 h-8 rounded-full hover:cursor-pointer hover:shadow-lg"
          src={user.photoURL ?? "./og.png"}
          alt={user.displayName!}
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
