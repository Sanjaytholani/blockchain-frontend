import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useState } from "react";
import Products from "./Products";

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
      <h1>Balance {userSnapshot?.data().coin} Coins</h1>
      <Products coin={userSnapshot?.data().coin} />
    </div>
  );
};

export default Shop;
