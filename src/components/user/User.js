import React, { Component, setState, Fragment } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import "./User.css";
import ReadOnlyRow from '../ReadOnlyRow';
import EditableRow from '../EditableRow';



const api = axios.create({ baseURL: 'http://localhost:8080/users' })


export default class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      addFormData: [{
        userName: '',
        userPassword: '',
      }],
      editFormData: [{
        editId: '',
        userName: '',
        userPassword: '',
      }],
      editContactId: null,

    };
  }

  componentDidMount = () => {
    this.getUsers();
  }
  getUsers = async () => {
    let data = await api.get('/').then(({ data }) => data);
    this.setState({ users: data });
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
    const newUser = {
      id: nanoid(),
      userName: this.state.addFormData.userName,
      userPassword: this.state.addFormData.userPassword,
    }
    const newUsers = [...this.state.users, newUser]

    const editedContact = {
      editId: this.state.editContactId,
      userName: this.state.editFormData.userName,
      userPassword: this.state.editFormData.userPassword,

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
      users: newUsers
    })


  }

  handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: this.state.editContactId,
      userName: this.state.editFormData.userName,
      userPassword: this.state.editFormData.userPassword,

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

  handleEditClick = (event, user) => {
    event.preventDefault();
    this.setState({
      editContactId: user.id
    })
    const formValues = {
      editId: user.id,
      userName: user.userName,
      userPassword: user.userPassword,
    };
    this.setState({
      editFormData: formValues
    })
  }

  handleCancelClick = () => {
    this.setState({ editContactId: null });
  };

  handleDeleteClick = (userId) => {
    const newContacts = [...this.state.users];

    const index = this.state.users.findIndex((contact) => (
      contact.id === userId));

    newContacts.splice(index, 1);

    this.setState({ users: newContacts });
    api.delete(`/${userId}`)
    // this.getUsers(data);
  };







  renderIncomingData = () => {
    return (this.state.users.map((item, id) => {
      return (
        <Fragment>
          {this.state.editContactId === item.id ? (
            <EditableRow
              editFormData={this.state.editFormData}
              handleEditFormChange={this.handleEditFormChange}
              handleCancelClick={this.handleCancelClick}
            />
          ) : (
            <ReadOnlyRow item={item} handleEditClick={this.handleEditClick}
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
                  <th width={"200"}>Imię:</th>
                  <th width={"250"}>Hasło:</th>
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
            name='userName'
            placeholder='login or email'
            required="required"
            onChange={this.handleAddFormChange} />

          <input
            type='text'
            name='userPassword'
            required="required"
            placeholder='Enter a password ...'
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

