import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavbarForEdit from "../departmentBackend/Navbar/NavbarForEdit";
import Offer from "./offer/Offer";
import Statute from "./Statute";
import Contact from "./Contact";
import "./choiceCar.css";

const ChoiceCar = () => {
  return (
    <Router className="wrrop-router-user">
      <div className="app">
        <NavbarForEdit />
      </div>
      <Switch>
        <Route path="/" exact />
        <Route path="/Offer" component={Offer} />
        <Route path="/Contact" component={Contact} />
        <Route path="/Statute" component={Statute} />
      </Switch>
    </Router>
  );
};

export default ChoiceCar;
