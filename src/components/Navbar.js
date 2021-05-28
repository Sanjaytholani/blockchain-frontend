import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, selectUser } from "../features/userSlice";
import { auth } from "../firebase";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logout());
    });
  };
  return (
    <div className="p-5 bg-whiteSmoke text-gray-700 flex justify-between items-center">
      <h1 className="text-2xl">App Name</h1>
      <div className="flex space-x-3 items-center">
        <Link
          to="/dashboard"
          className="px-5 py-2 rounded-lg text-lg border border-whiteSmoke hover:bg-gray-100 focus:outline-none"
        >
          Dashboard
        </Link>
        <button
          onClick={signOut}
          className="px-5 py-2 rounded-lg text-lg border border-whiteSmoke hover:bg-gray-100 focus:outline-none"
        >
          Sign Out
        </button>
        <img
          className="h-10 w-10 rounded-full"
          src={user?.photoURL}
          alt="logo"
        />
      </div>
    </div>
  );
};

export default Navbar;
