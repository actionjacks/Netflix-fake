import React, { useState } from "react";
import SignInScreen from "./SignInScreen";

import utubeLogo from "../assets/logo.png";
import "../styles/LoginScreen.css";

function LoginScreen() {
  const [signIn, setSignIn] = useState(false);

  return (
    <div
      className="loginScreen"
      style={{
        background: `url("../assets/netflix-bg.jpg")`,
        height: "100vh",
      }}
    >
      <div className="loginScreen__background">
        <img
          src={`${utubeLogo}`}
          alt="login-image"
          className="loginScreen__logo"
        />
        <button onClick={() => setSignIn(true)} className="loginScreen__button">
          Sign In
        </button>
        <div className="loginScreen__gradient" />
        <div className="loginScreen__body">
          {signIn ? (
            <SignInScreen />
          ) : (
            <>
              <h1>Unlimited fils tv programes and more..</h1>
              <h2>Watch anywhere. Cancel at any time</h2>
              <h3>
                Ready to watch? Enter your email to create or restart your
                membership
              </h3>
              <div className="loginScreen__input">
                <form action="">
                  <input type="email" placeholder="Email Address" />
                  <button
                    onClick={() => setSignIn(true)}
                    className="loginScreen__getStarted"
                  >
                    GET STARTED
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
