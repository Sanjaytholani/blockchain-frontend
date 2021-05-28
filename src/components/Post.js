import { useRef } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { selectUser } from "../features/userSlice";
import { db } from "../firebase";

const Post = () => {
  const user = useSelector(selectUser);
  const questionRef = useRef("");
  const addPost = (e) => {
    e.preventDefault();
    const id = v4();
    db.collection("posts")
      .doc(id)
      .set({
        id: id,
        user: user.id,
        question: questionRef.current.value,
        comments: [],
        answered: false,
      })
      .then(() => {
        questionRef.current.value = "";
      });
  };
  return (
    <form
      onSubmit={addPost}
      className="border-2 border-whiteSmoke rounded-xl p-5 max-w-3xl mx-auto mt-10 flex items-center justify-between shadow-md"
    >
      <input
        ref={questionRef}
        className="border-none flex-6 w-full text-xl focus:outline-none text-gray-600 placeholder-gray-400"
        type="text"
        placeholder="Ask anything"
      />
      <button
        type="submit"
        className="px-5 py-2 flex-2 rounded-lg text-lg border-2 border-whiteSmoke hover:bg-gray-100 focus:outline-none"
      >
        Ask
      </button>
    </form>
  );
};

export default Post;
