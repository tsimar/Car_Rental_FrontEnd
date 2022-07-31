import React, { Component } from "react";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import { MenuItemsUser } from "./MenuItemsUser";
import "./NavbarUser.css";

class NavbarUser extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <nav className="navbar-items">
        <h1 className="navbar-logo">
          <Link to="/" className="link">
            Home
          </Link>
          <i className="fab fa-react"></i>
        </h1>
        <div className="menu-icon" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItemsUser.map((item, index) => {
            return (
              <li key={index}>
                <Link to={{ pathname: item.Link }}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
        <Button>Logowanie</Button>
      </nav>
    );
  }
}

export default NavbarUser;
