import React from "react";
import { Button } from "@mui/material";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import "./Login.css";
import { useStateValue } from "../contextApi/StateProvider";
import { actionTypes } from "../contextApi/reducer";

const Login = () => {
  const [state, dispatch] = useStateValue();
  console.log(state);

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((err) => {
        alert("Login failed");
      });
  };

  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-a3cGOkfGC01K3C7njq0Uji7NmnC5nmDBSi93AWz_0rUzWIjAROdVCuzmotpLEULaWfk&usqp=CAU"
          alt="logo"
        />
        <div className="login_text">
          <h1>Sign in Let's Talk</h1>
        </div>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
};

export default Login;
