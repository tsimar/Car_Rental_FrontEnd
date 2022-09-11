import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavbarForEdit from "../departmentBackend/Navbar/NavbarForEdit";
import Offer from "./Offer";
import Statute from "./Statute";
import Contact from "./Contact";

const ChoiceCar = () => {
  return (
    <Router>
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
