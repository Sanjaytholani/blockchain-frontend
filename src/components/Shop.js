import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useState } from "react";

const Shop = () => {
  const user = useSelector(selectUser);
  const history = useHistory();
  const [userSnapshot] = useCollection(db.collection("users").doc(user.id));
  return (
    <div className="text-3xl">
      <ArrowNarrowLeftIcon
        className="h-10 w-8 cursor-pointer"
        onClick={() => history.push("/")}
      />
      <h1>Coin {userSnapshot?.data().coin}</h1>
    </div>
  );
};

export default Shop;
