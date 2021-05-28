import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { db } from "../firebase";

const Questions = () => {
  const user = useSelector(selectUser);
  const [questionsSnapshot, setQuestionsSnapshot] = useState([]);
  const answerRef = useRef("");
  useEffect(() => {
    if (user) {
      db.collection("posts")
        .where("user", "!=", user?.id)
        .onSnapshot((snapshot) => setQuestionsSnapshot(snapshot?.docs));
    }
  }, [user]);
  const addAnswer = (e, question) => {
    e.preventDefault();
    db.collection("posts")
      .doc(question?.id)
      .update({
        comments: [
          ...question.comments,
          { user: user.id, comment: answerRef.current.value },
        ],
      })
      .then(() => {
        answerRef.current.value = "";
      });
  };
  return (
    <div className="mt-20 mx-auto max-w-3xl">
      {questionsSnapshot?.map((doc) => {
        if (doc?.data().answered === false) {
          return (
            <div className="pb-5">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      <span>{doc?.data()?.question}</span>
                      <ChevronUpIcon
                        className={`${
                          open ? "transform rotate-180" : ""
                        } w-5 h-5 text-gray-600`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      <form
                        onSubmit={(e) => addAnswer(e, doc?.data())}
                        className=" rounded-xl p-2 max-w-3xl  flex items-center justify-between"
                      >
                        <input
                          ref={answerRef}
                          className="border-none flex-6 w-full focus:outline-none text-gray-600 placeholder-gray-400"
                          type="text"
                          placeholder="Have an answer"
                        />
                        <button
                          type="submit"
                          className="px-5 py-2 flex-2 rounded-lg text-lg border-2 border-whiteSmoke hover:bg-gray-100 focus:outline-none"
                        >
                          Answer
                        </button>
                      </form>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Questions;
