import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavbarUser from "./components/Navbar/NavbarUser";

import BranchCompHook from "./components/branchCompany/BranchCompHook";
import Customer from "./components/user/Customer";
import Department from "./components/Department/Department";
import Reservation from "./components/reservation/Reservation";
import DepartmentRental from "./components/rentalCar/DepartmentRental";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <NavbarUser />
      </div>
      <Switch>
        <Route path="/branchCompHook" component={BranchCompHook} />
        <Route path="/Reservation" component={Reservation} />
        <Route path="/Customer" component={Customer} />
        <Route path="/Department" component={Department} />
        <Route path="/DepartmentRental" component={DepartmentRental} />
      </Switch>
    </Router>
  );
}

export default App;
