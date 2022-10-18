import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// import Logo from "../assets/imgs/idea.png";

export default function Nav() {
  const [user, loading] = useAuthState(auth);

  return (
    <nav className=" bg-emerald-200 flex justify-between items-center py-7 px-6">
      <Link href="/">
        <button className="">
          <img
            className=" rounded-xl w-14 h-10 text-xs"
            src="/idea.png"
            alt="logo"
          />
        </button>
      </Link>
      <ul className="flex items-center gap-10">
        {!user && (
          <Link href={"/auth/login"}>
            <a className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8">
              Join Us
            </a>
          </Link>
        )}
        {user && (
          <div className="flex gap-2 items-center">
            <Link href="/post">
              <button className="py-2 px-4 bg-cyan-500 text-white rounded-md font-medium text-sm">
                Post
              </button>
            </Link>
            <Link href="/dashboard">
              <img
                className="w-12 rounded-full cursor-pointer"
                src={user.photoURL}
                alt="profile picture from user"
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}
