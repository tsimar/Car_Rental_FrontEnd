import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavbarUser from "./components/departmentBackend/Navbar/NavbarUser";

import BranchCompHook from "./components/departmentBackend/branchCompany/BranchCompHook";
import Department from "./components/departmentBackend/Department/Department";
import Reservation from "./components/departmentBackend/reservation/Reservation";
import SingUser from "./components/sing/SingUser";

import "./App.css";
import Login from "./components/loginPage/Login";
import { useSelector } from "react-redux";
import { NewCustomer } from "./components/loginPage/newUser/NewCustomer";
import ChoiceCar from "./components/userSelectCar/ChoiceCar";

function App() {
  const loginIn = useSelector((state) => state.login.login);
  const newLogin = useSelector((state) => state.newUser.newUser);
  const userUse = useSelector((state) => state.userUse.userUse);

  if (loginIn.title) {
    return <Login />;
  } else if (newLogin.title) {
    return <NewCustomer />;
  }
  if (userUse) {
    return <ChoiceCar />;
  } else {
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
}

export default App;
