import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
//assets
import logo from "../assets/logo.png";
import avatar from "../assets/avatar.png";
//styles
import "../styles/Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);
  const history = useHistory();

  const transitionNabBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNabBar);
    return () => window.removeEventListener("scroll", transitionNabBar);
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          onClick={() => history.push("/")}
          className="nav__logo"
          src={logo}
          alt=""
        />
        <img
          onClick={() => history.push("/profile")}
          className="nav__avatar"
          src={avatar}
          alt=""
        />
      </div>
    </div>
  );
}

export default Nav;
