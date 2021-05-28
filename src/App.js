import Login from "./components/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "./firebase";
import Landing from "./components/Landing";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/userSlice";
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
const App = () => {
  const dispatch = useDispatch();
  const [user, loading] = useAuthState(auth);
  const [snapshot] = useCollection(db.collection("users").doc(user?.uid));
  useEffect(() => {
    if (snapshot?.data()) {
      dispatch(login(snapshot.data()));
    } else {
      dispatch(logout());
    }
  }, [user, snapshot, dispatch]);
  return (
    <>
      {loading ? (
        ""
      ) : (
        <Router>
          <Switch>
            <Route exact path="/">
              {user ? <Landing /> : <Login />}
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </Router>
      )}
    </>
  );
};

export default App;
