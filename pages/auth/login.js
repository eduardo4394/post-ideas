import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function Login() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  //Sign with google
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      route.push("/");
    } else {
      console.log("u need to login");
    }
  }, [user]);

  return (
    <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg mb-2">
      <h2 className="text-2xl font-medium">Join Today</h2>
      <div className="py-4 flex flex-col gap-3 ">
        <h3>Sign in with one of the providers</h3>
        <div className="flex flex-col gap-1">
          <button
            onClick={GoogleLogin}
            className="text-white bg-gray-700 w-full font-medium rounded-lg flex items-center p-4 gap-2 "
          >
            <FcGoogle className="text-2xl" />
            Sign with Google
          </button>
        </div>
      </div>
    </div>
  );
}
