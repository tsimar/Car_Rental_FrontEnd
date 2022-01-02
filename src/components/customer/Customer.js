import React, { Component, useState, useEffect } from 'react'
import "./Customer.css";
// import Form from "./Form";
import axios from 'axios';
import Badge from '@material-ui/core/Badge';

import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid'
import { fontWeight } from '@material-ui/system';
// import { LicenseInfo } from '@material-ui/x-grid';

// LicenseInfo.setLicenseKey(
//   'x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e',
// );
const api = axios.create({ baseURL: 'http://localhost:8080/users' })

// const rows: GridRowsProp = [
//   { id: 1, col1: 'Hello', col2: 'World' },
//   { id: 2, col1: 'XGrid', col2: 'is Awesome' },
//   { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
// ];

// const columns: GridColDef[] = [
//   { field: 'col1', headerName: 'Column 1', width: 150 },
//   { field: 'col2', headerName: 'Column 2', width: 150 },
// ];
class Customer extends Component {
  constructor() {
    super();
    this.state = {

      users: [],
      userName: '',
      userPassword: '',


    };
// const [unitPrice, setUnitPrice] = useState(null);
// const [inEditMode, setInEditMode] = useState({
//   status: false,
//   rowKey: null
// });
// const  onEdit = ({id,userName,userPassword}) => {
//   setInEditMode({
//     status:true,
//   rowKey:id,
//   })
//   setUnitPrice(userName);
//     }
  }



  componentDidMount = () => {
    this.getUsers();
  }

  handleInputChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  getUsers = async () => {
    let data = await api.get('/').then(({ data }) => data);
    this.setState({ users: data });
    console.log(data)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    api.post('/', this.state)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
    this.getUsers();

  }

  deleteUser = async (id) => {
    let data = await api.delete(`/${id}`)
    this.getUsers(data);
  }

  tempFunk = () => {
    return (this.state.newUser.array.foreach(item => {
      return (
        <p> {item} </p>
      )

    }))
  }


renderIncomingData = () => {
  const { id } = this.state
  console.log('id', id);
  return (this.state.users.map((item, id) => {
    return (
      <tr border={"2"} className={"user-tab"} key={item.id}>

        <th width={"47"}>{item.id}</th>
        <th width={"196"}>{item.userName}</th>
        <th width={"250"}>{item.userPassword}</th>
        <th width={"200"}>{item.customer}</th>
        <th width={"100"}>
          <button onClick={() => this.deleteUser({
            id: item.id,
            // userName: item.userName,
            // userPassword: item.userPassword
          })}>
            edit
          </button>
          <button>delete</button>
        </th>
      </tr>
    )
  })
  );
}


render() {
  const { userName, userPassword } = this.state;
  // const { post } = this.props;
  return (
    <div  style={{ height: 300, width: '100%' }}>
    <DataGrid
  // className={classes.root}
  rows={this.state.users}
        allowColumnReordering={true}
        showBorders={true}
/>
    </div>
  )
}





}
export default Customer;


