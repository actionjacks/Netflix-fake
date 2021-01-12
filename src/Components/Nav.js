import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      // console.log(window.scrollY);
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      document.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img src="./netflix-logo.png" alt="netflix logo" className="nav__logo" />
      <img src="./avatar.png" alt="user avatar" className="nav__avatar" />
    </div>
  );
}

export default Nav;
