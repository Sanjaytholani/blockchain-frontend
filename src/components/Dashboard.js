import { Disclosure } from "@headlessui/react";
import {
  ArrowNarrowLeftIcon,
  CheckIcon,
  ChevronUpIcon,
} from "@heroicons/react/solid";
import { useCollection } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser } from "../features/userSlice";
import firebase from "firebase";
import { db } from "../firebase";

const Dashboard = () => {
  const user = useSelector(selectUser);
  const history = useHistory();
  const [questionsSnapshot] = useCollection(
    db.collection("posts").where("user", "==", user.id)
  );
  const updateCoin = (e, comment, post) => {
    e.preventDefault();
    db.collection("users")
      .doc(comment.user)
      .update({
        coin: firebase.firestore.FieldValue.increment(1),
      })
      .then(() => {
        db.collection("posts")
          .doc(post.id)
          .update({
            answered: true,
            comments: [comment],
          });
      });
  };
  return (
    <div className="">
      <ArrowNarrowLeftIcon
        className="h-10 w-8 cursor-pointer"
        onClick={() => history.push("/")}
      />
      <h1 className="text-3xl ml-10 text-gray-600">Your Questions</h1>
      <div className="mt-20 mx-auto max-w-3xl">
        {questionsSnapshot?.docs?.map((doc) => (
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
                    {doc?.data().comments.map((comment) => (
                      <div className="flex items-center justify-between">
                        <p>{comment.comment}</p>
                        {doc?.data().answered === true ? (
                          ""
                        ) : (
                          <CheckIcon
                            onClick={(e) => updateCoin(e, comment, doc?.data())}
                            className="h-10 w-10 cursor-pointer rounded-full p-2 hover:bg-gray-200"
                          />
                        )}
                      </div>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
