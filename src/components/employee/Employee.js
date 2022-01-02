import React, { Component, setState, Fragment } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import "../user/User.css";
import ReadOnlyRowEm from './ReadOnlyRowEm';
import EditableRowEm from './EditableRowEm';



const api = axios.create({ baseURL: 'http://localhost:8080/employees' })


export default class Employee extends Component {

  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      addFormData: [{
        name: '',
        lastName: '',
        position: '',
      }],
      editFormData: [{
        editId: '',
        name: '',
        lastName: '',
        position: '',
      }],
      editContactId: null,

    };
  }

  componentDidMount = () => {
    this.getUsers();
  }
  getUsers = async () => {
    let data = await api.get('/').then(({ data }) => data);
    this.setState({ employees: data });
    console.log(data)
  }



  handleAddFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute('name');
    const fieldValue = e.target.value;
    const newFormData = { ...this.state.addFormData };
    newFormData[fieldName] = fieldValue;
    this.setState({ addFormData: newFormData });
  }



  handleAddFormSubmit = (event) => {
    event.preventDefault();
    const newEmployee = {
      id: nanoid(),
      name: this.state.addFormData.name,
     lastName: this.state.addFormData.lastName,
    }
    const newEmployees = [...this.state.employees, newEmployee]

    const editedContact = {
      editId: this.state.editContactId,
      name: this.state.editFormData.name,
      lastName: this.state.editFormData.lastName,
      position:this.state.editFormData.position,

    };
    api.post('/', this.state.addFormData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
    this.setState({
      [event.target.name]: event.target.value,

    });

    this.setState({
      employeees: newEmployees
    })


  }

  handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: this.state.editContactId,
      name: this.state.editFormData.name,
      lastName: this.state.editFormData.lastName,
      position:this.state.editFormData.position

    };
    // const editUser = [...this.state.editFormData, editedContact];

    
    api.put(`/`, editedContact)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
      const{name,value}=event.target
    this.setState({
      [name]: value,

    });

    

    // this.setState({
    //   users: editedContact
    // })
    this.setState({ editContactId: null });
  }


//   shouldComponentUpdate(nextProps, nextState) {
//     // вернуть true если компонент нуждается в обновлении
//     // вернуть false в противном случае
// }









  handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...this.state.editFormData };
    newFormData[fieldName] = fieldValue;

    this.setState({ editFormData: newFormData })
  };

  handleEditClick = (event, empl) => {
    event.preventDefault();
    this.setState({
      editContactId: empl.id
    })
    const formValues = {
      editId: empl.id,
      name: empl.name,
      lastName: empl.lastName,
      position:empl.position
    };
    this.setState({
      editFormData: formValues
    })
  }

  handleCancelClick = () => {
    this.setState({ editContactId: null });
  };

  handleDeleteClick = (empId) => {
    const newContacts = [...this.state.employees];

    const index = this.state.employees.findIndex((contact) => (
      contact.id === empId));

    newContacts.splice(index, 1);

    this.setState({ employees: newContacts });
    api.delete(`/${empId}`)
    // this.getUsers(data);
  };







  renderIncomingData = () => {
    return (this.state.employees.map((item, id) => {
      return (
        <Fragment>
          {this.state.editContactId === item.id ? (
            <EditableRowEm
              editFormData={this.state.editFormData}
              handleEditFormChange={this.handleEditFormChange}
              handleCancelClick={this.handleCancelClick}
            />
          ) : (
            <ReadOnlyRowEm item={item} handleEditClick={this.handleEditClick}
              handleDeleteClick={this.handleDeleteClick}
            />)}
        </Fragment>
      )
    })
    );
  }


  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleEditFormSubmit}>
            <table className={"user-main-tab"}>
              <thead>
                <tr>
                  <th width={"50"}>ID:</th>
                  <th width={"200"}>Name:</th>
                  <th width={"250"}>Last name:</th>
                  <th width={"200"}>Rola:</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.renderIncomingData()}

              </tbody>
            </table>
          </form>
        </div>
        <h2 className={"user-main-tab"}>Add a new employee</h2>
        <form onSubmit={this.handleAddFormSubmit} className={"user-label"}>
          <input
            type='text'
            name='name'
            placeholder='name'
            required="required"
            onChange={this.handleAddFormChange} />

          <input
            type='text'
            name='lastName'
            required="required"
            placeholder='last name ...'
            onChange={this.handleAddFormChange}
          />
           <input
            type='text'
            name='position'
            required="required"
            placeholder='position ...'
            onChange={this.handleAddFormChange}
          />
          <button type="submit">add</button>
          {/* <Input className={'user-label'} type="submit" value='Dodaj'>Dodaj</Input> */}
        </form>
        {/* <button className={'user-label'} type="submit" onClick={this.Customer()}>gtregd</button> */}
      </div>
    )
  }
}

