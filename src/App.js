import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavbarUser from "./components/Navbar/NavbarUser";

import BranchCompHook from "./components/branchCompany/BranchCompHook";
import Customer from "./components/user/Customer";

// import Employee from "./components/employee/Employee";
import Reservation from "./components/reservation/Reservation";
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarUser />
      </div>
      <Switch>
        <Route path="/branchCompHook" component={BranchCompHook} />
        <Route path="/Reservation" component={Reservation} />
        <Route path="/Customer" component={Customer} />
      </Switch>
    </Router>
  );
}

export default App;
