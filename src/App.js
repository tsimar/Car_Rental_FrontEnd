import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavbarUser from "./components/Navbar/NavbarUser";

import BranchCompHook from "./components/branchCompany/BranchCompHook";
import Customer from "./components/user/Customer";
import ReturnCar from "./components/returnCar/ReturnCar";
import RentalCar from "./components/rentalCar/RentalCar";
import Reservation from "./components/reservation/Reservation";
import "./App.css";
import Department from "./components/Department/Department";

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
        <Route path="/RentalCar" component={RentalCar} />
      </Switch>
    </Router>
  );
}

export default App;
