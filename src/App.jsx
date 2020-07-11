import React, { useEffect, useState } from "react";
import Pokemons from "./Components/Pokemons";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import { auth } from "./firebase";

function App() {
  const [FirebaseUser, setFirebaseUser] = useState(false);

  useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setFirebaseUser(user);
        } else {
          setFirebaseUser(false);
        }
      });
    };

    fetchUser();
  }, []);

  const PrivateRoute = ({ component, path, ...rest }) => {
    if (localStorage.getItem("user")) {
      const userstorage = JSON.parse(localStorage.getItem("user"));

      if (userstorage.uid === FirebaseUser.uid) {
        return <Route component={component} path={path} {...rest} />;
      } else {
        return <Redirect to="/login" {...rest} />;
      }
    } else {
      return <Redirect to="/login" {...rest} />;
    }
  };

  return (
    <Router>
      <div className="container mt-3">
        <Navbar />
        <Switch>
          <PrivateRoute component={Pokemons} path="/" exact />
          <Route component={Login} path="/login" exact />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
