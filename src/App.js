import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import NavbarUser from "./components/Navbar/NavbarUser";
// import './App.css';
import BranchCompHook from './components/branchCompany/BranchCompHook';
import User from './components/user/User';
// import Cars from './components/cars/Cars';
// import CarsHug from './components/cars/CarsHug';
import Employee from './components/employee/Employee'
import CashReceipts from './components/cashReceipts/CashReceipts';
import Reservation from "./components/reservation/Reservation";
import test from './components/cars/test';
// import CarsHug from './components/cars/CarsHug';
// import Customer from './components/customer/Customer';



function App() {
  return (
    <Router>
      <div className="App">
        <NavbarUser />
      </div>
      <Switch>
        <Route path="/branchCompHook" component={BranchCompHook} />  
         {/* головна компанія */}
        <Route path="/employee" component={Employee} />
      {/* <Route path="/cars" component={Cars} /> 
        <Route path="/carshug" component={CarsHug} />  
        <Route path="/user" component={User} /> 

        <Route path="/reservation" component={Reservation} />  */}



      </Switch> 
      {/* <ul>
        <li>
          <Link to="/user">User</Link>
        </li>
        <li>
          <Link to="/branchCompHook">BranchCompHook</Link>
        </li>
        <li></li>
      </ul>
      <Route path="/user" component={BranchCompHook} /> */}
    </Router>
    // <div>
    //   <BranchCompHook/>
    // </div>
  );
}

export default App;
