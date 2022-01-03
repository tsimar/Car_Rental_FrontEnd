import React, { Component, setState, Fragment } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import "./BranchCompany.css";
import ReadOnlyRowD from './ReadOnlyRowD';
import EditableRowD from './EditableRowD';



const api = axios.create({ baseURL: 'http://localhost:8080/branchCompany' })

export default class BranchCompany extends Component {

  constructor(props) {
    super(props);
    this.state = {
      headCompany: [],
      addFormData: [{
        logo: '',
        nameRental: '',
        city: '',
        address: '',
      }],
      editFormData: [{
        logo: '',
        nameRental: '',
        city: '',
        address: '',
      }],
      editContactId: null,

    };
  }

  componentDidMount = () => {
    this.getHeadCompany();
  }

  getHeadCompany = async () => {
    let data = await api.get('/').then(({ data }) => data);
    this.setState({ headCompany: data });
    console.log(data)
  }


  handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    const newFormData = { ...this.state.addFormData };
    newFormData[fieldName] = fieldValue;
    this.setState({ addFormData: newFormData });

  }


  handleAddFormSubmit = (event) => {
    event.preventDefault();
    const newDepart = {
      // id: nanoid(), kod id unicod
      logo: this.state.addFormData.logo,
      nameRental: this.state.addFormData.city,
      city: this.state.addFormData.city,
      address: this.state.addFormData.address
    }
    const newDeparts = [...this.state.headCompany, newDepart]

    // const editedContact = {
    //   id: this.state.editContactId,
    //   logo: this.state.editFormData.logo,
    //   nameRental: this.state.editFormData.nameRental,
    //   city: this.state.editFormData.city,
    //   address: this.state.editFormData.address
    // };

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
      headCompany: newDeparts,


    })


  }

  handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: this.state.editContactId,
      logo: this.state.editFormData.logo,
      nameRental: this.state.editFormData.nameRental,
      city: this.state.editFormData.city,
      address: this.state.editFormData.address,

    };

    api.put(`/`, editedContact)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
    const { name, value } = event.target
    this.setState({
      [name]: value,

    });

    this.setState({ editContactId: null });
  }











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
      logo: user.logo,
      nameRental: user.nameRental,
    };
    this.setState({
      editFormData: formValues
    })
  }

  handleCancelClick = () => {
    this.setState({ editContactId: null });
  };

  handleDeleteClick = (departId) => {
    const newContacts = [...this.state.headCompany];

    const index = this.state.headCompany
      .findIndex((contact) => (contact.id === departId));

    newContacts.splice(index, 1);

    this.setState({ headCompany: newContacts });
    api.delete(`/${departId}`)
    // this.getUsers(data);
  };

  renderIncomingData = () => {
    return (this.state.headCompany.map((item, id, key) => {
      return (
        <Fragment>
          {(this.state.editContactId === item.id) ? (
            <EditableRowD

              editFormData={this.state.editFormData}
              handleEditFormChange={this.handleEditFormChange}
              handleCancelClick={this.handleCancelClick}

            />
          ) :
            (
              <ReadOnlyRowD item={item}
                handleEditClick={this.handleEditClick}
                handleDeleteClick={this.handleDeleteClick}
              />)
          }
        </Fragment>
      )
    })
    );
  }


  render() {
    let textid = this.props.input
    return (
      <div>
        <div >
          <form onSubmit={this.handleEditFormSubmit}>
            <table className={"user-main-tab"}>
              <thead>
                <tr>
                  <th width={"50"}>ID:</th>
                  <th width={"200"}>Logo:</th>
                  <th width={"250"}>Name's department:</th>
                  <th width={"200"}>city:</th>
                  <th width={"200"}>address:</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.renderIncomingData()}

              </tbody>
            </table>
          </form>
        </div>

        <div className='add'>
          <h2 className={"text_add"}>Add a new DEPARTMENT</h2>
          <form onSubmit={this.handleAddFormSubmit} className={"table_add"}>
            <div >
              <input
                type='text'
                name='logo'
                placeholder='logo department'
                required="required"
                onChange={this.handleAddFormChange} />
            </div>
            <div >
              <input
                type='text'
                name='nameRental'
                required="required"
                placeholder='name department ...'
                onChange={this.handleAddFormChange}
              />
            </div>
            <div >
              <input
                type='text'
                name='city'
                required="required"
                placeholder='city  ...'
                onChange={this.handleAddFormChange}
              />
            </div>
            <div>
              <input
                type='text'
                name='address'
                required="required"
                placeholder='address  ...'
                onChange={this.handleAddFormChange}
              /> </div>


            <button type="submit">add</button>

            {/* <Input className={'user-label'} type="submit" value='Dodaj'>Dodaj</Input> */}
          </form>
        </div>
        {/* <button className={'user-label'} type="submit" onClick={this.Customer()}>gtregd</button> */}
      </div >
    )
  }

}