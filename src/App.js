import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavbarUser from "./components/Navbar/NavbarUser";

import BranchCompHook from "./components/branchCompany/BranchCompHook";
import Department from "./components/Department/Department";
import Reservation from "./components/reservation/Reservation";
import SingUser from "./components/sing/SingUser";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <NavbarUser />
      </div>
      <Switch>
        <Route path="/" exact />
        <Route path="/Department">
          <BranchCompHook />
        </Route>
        <Route path="/Reservation" component={Reservation} />
        <Route path="/Customer" component={Department} />
        <Route path="/Return" component={Department} />
        <Route path="/Rental" component={Department} />
      </Switch>
      <SingUser />
    </Router>
  );
}

export default App;
