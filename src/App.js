import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavbarUser from "./components/departmentBackend/Navbar/NavbarUser";

import BranchCompHook from "./components/departmentBackend/branchCompany/BranchCompHook";
import Department from "./components/departmentBackend/Department/Department";
import Reservation from "./components/departmentBackend/reservation/Reservation";
import SingUser from "./components/sing/SingUser";

import "./App.css";
import Login from "./components/loginPage/Login";
import { useSelector } from "react-redux";

function App() {
  const loginIn = useSelector((state) => state.login.login);
  const [newLogin, setNewLogin] = useState(false);
  if (loginIn.title) {
    return <Login />;
  } else if (newLogin.title) {
    // return <NewUser />;
  }

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
        {/* <Route path="/LOGOWANIE" component={Login} /> */}
      </Switch>
      <SingUser />
    </Router>
  );
}

export default App;
