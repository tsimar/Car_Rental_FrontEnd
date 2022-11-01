import React, { useState } from "react";
import { Button } from "../../Button";
import { Link } from "react-router-dom";
import { MenuItemsUser } from "./MenuItemsUser";
import "./NavbarUser.css";

import CanvasLogo from "../../canvas/CanvasLogo";

import { useDispatch } from "react-redux";
import { newLogin } from "../../../redux/loginSlice";

export const NavbarUser = () => {
  const loginDispatch = useDispatch();

  const [clicked, setClicked] = useState("false");
  const handleClick = () => {
    setClicked(!clicked);
  };

  const loginPage = () => {
    loginDispatch(newLogin({ title: true }));
  };

  return (
    <nav className="navbar-items">
      <h1 className="navbar-logo">
        <Link to="/" className="link">
          Home
        </Link>
        <i className="fab fa-react"></i>

        {/* <CanvasLogo /> */}
      </h1>
      <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItemsUser.map((item, index) => {
          return (
            <li key={index}>
              <Link to={{ pathname: item.Link }}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
      <Button onClick={loginPage}>Logowanie</Button>
    </nav>
  );
};

export default NavbarUser;
