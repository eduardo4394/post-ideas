import Message from "../components/message";
import { useRouter } from "next/router";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  arrayUnion,
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

export default function Details() {
  const router = useRouter();
  const routeData = router.query;
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  //Submit message
  const submitMessage = async () => {
    //Check if user is logged
    if (!auth.currentUser) return router.push("/auth/login");

    if (!message) {
      toast.error("Don't leave an empty message 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    const docRef = doc(db, "posts", routeData.id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: auth.currentUser.photoURL,
        userName: auth.currentUser.displayName,
        time: Timestamp.now(),
      }),
    });
    setMessage("");
  };
  //Get comments
  const getComments = async () => {
    const docRef = doc(db, "posts", routeData.id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllMessages(snapshot.data().comments);
    });
    return unsubscribe;
  };

  useEffect(() => {
    if (!router.isReady) return;
    getComments();
  }, [router.isReady]);

  return (
    <div className="mt-8">
      <Message {...routeData}></Message>
      <div className="my-4">
        <div className="flex">
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            value={message}
            className="bg-gray-800 w-full p-2 text-white text-sm"
            placeholder="Comments this idea 😁"
          />
          <button
            onClick={submitMessage}
            className="bg-cyan-500 text-white py-2 px-4 text-sm "
          >
            Submit
          </button>
        </div>
        <div className="mt-4 font-semibold">
          <h2 className=" text-2xl">Comments</h2>
          {allMessages?.map((message) => (
            <div
              className="bg-white p-4 my-4 border-2 shadow-2xl "
              key={message.time}
            >
              <div className="flex items-center gap-2 mb-4">
                <img
                  className="w-10 rounded-full"
                  src={message.avatar}
                  alt="user profile picture"
                />
                <h2 className=" text-gray-600">{message.userName}</h2>
              </div>
              <h2 className=" font-medium">{message.message}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
