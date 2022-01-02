import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import NavbarUser from "./components/Navbar/NavbarUser";
import './App.css';
import BranchCompany from './components/branchCompany/BranchCompany';
import User from './components/user/User';
import Cars from './components/cars/Cars';
import Employee from './components/employee/Employee'
import CashReceipts from './components/cashReceipts/CashReceipts';
import Reservation from './components/reservation/Reservation';
import Customer from './components/customer/Customer';



function App() {
  return (
    <Router>
      <div className="App">

        <NavbarUser />
      </div>
      <Switch>
        <Route path="/branchCompany" component={BranchCompany} /> {/*// головна компанія*/}
        <Route path="/employee" component={Employee} />
        <Route path="/cars" component={Cars} />
        <Route path="/user" component={User} />
        <Route path="/cashReceipts" component={CashReceipts} />
        <Route path="/reservation" component={Reservation} />
        {/* <Route path="/customer" component={Customer} /> */}


      </Switch>

    </Router>

  );
}

export default App;
