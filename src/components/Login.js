import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { auth, db, provider } from "../firebase";

const Login = () => {
  const dispatch = useDispatch();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((data) => {
        db.collection("users")
          .doc(data?.user?.uid)
          .onSnapshot((snapshot) => {
            if (snapshot.data()) {
              dispatch(login(snapshot.data()));
            } else {
              db.collection("users")
                .doc(data.user.uid)
                .set({
                  id: data.user.uid,
                  name: data.user.displayName,
                  email: data.user.email,
                  photoURL: data.user.photoURL,
                  coin: 0,
                  contributions: [],
                })
                .then(() => {
                  dispatch(
                    login({
                      id: data.user.uid,
                      name: data.user.displayName,
                      email: data.user.email,
                      photoURL: data.user.photoURL,
                      coin: 0,
                      contributions: [],
                    })
                  );
                });
            }
          });
      })
      .catch(alert);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <header>
        <button
          onClick={signIn}
          className="px-2 w-80 flex flex-row items-center space-x-2 py-4 text-xl border border-whiteSmoke hover:bg-gray-50 focus:outline-none"
        >
          <img
            className="h-7 w-7 object-contain"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
            alt="google Logo"
          />
          <h1 className="text-gray-400">Continue With Google</h1>
        </button>
      </header>
    </div>
  );
};

export default Login;
