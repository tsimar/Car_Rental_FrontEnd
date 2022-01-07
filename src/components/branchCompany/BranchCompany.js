import React, { ReactComponentElement, Component, setState, Fragment } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import "./BranchCompany.css";
import ReadOnlyRowD from './ReadOnlyRowD';
import EditableRowD from './EditableRowD';
import Cars from '../cars/Cars';
import CarsHug from '../cars/CarsHug';




const api = axios.create({ baseURL: 'http://localhost:8080/branchCompany' })
const apiCars = axios.create({ baseURL: 'http://localhost:8080/Cars' })
// const P = () => React.createElement('div', {className:"add"}, "I am tared");

export default class BranchCompany extends Component {

  constructor(props) {
    super(props);
    this.state = {
      headCompany: [],
      cars: [],
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
    this.getHeadCompany().then(this.getHeadCompanyCar());
  }

  getHeadCompany = async () => {
    let data = await api.get('/').then(({ data }) => data);
    this.setState({ headCompany: data });
    console.log(data)



  }
  getHeadCompanyCar = async () => {


    let dataCars = await apiCars.get('/').then(({ dataCars }) => dataCars);
    this.setState({ cars: dataCars });
    console.log(dataCars)

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

    this.componentDidMount();
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



  handleAddCars = (event, item) => {
    return (<CarsHug />)
    // event.preventDefault();
    // React.render(<CarsHug />);
    // ReactBootstrap.response(CarsHug);
    // React.createElement("<div>", [React.createElement(CarsHug)]);
    // ReactDOM.createElement(div,CarsHug);
    // <CarsHug  id={event} name={item}/>


  }
  renderIncomingData = () => {
    return (this.state.headCompany.map((item, id) => {

      return (
        <Fragment >
          {(this.state.editContactId === item.id) ? (
            <EditableRowD

              editFormData={this.state.editFormData}
              handleEditFormChange={this.handleEditFormChange}
              handleCancelClick={this.handleCancelClick}
              chancheHandler={this.chancheHandler}

            />

          ) :
            (
              <ReadOnlyRowD item={item}
                handleEditClick={this.handleEditClick}
                handleDeleteClick={this.handleDeleteClick}
                chancheHandler={this.chancheHandler}
                handleAddCars={this.handleAddCars}
              />
            )
          }
          {/*  */}
        </Fragment>

      )
    })
    );
  }

  handleCarsFormSubmit = () => {
    return (this.state.cars.map((item, key = item.id) => {
      return (
        <CarsHug
          cars={this.state.cars}
        />
      )
    }))

  }

  render() {

    let textid = this.props.input
    return (
      <div>
        {/* ReactDOM.render(pppp, document.getElementById("root")) */}
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
              <tbody >
                {this.renderIncomingData()}

              </tbody>
            </table>
          </form>
        </div>

        <div>

          <CarsHug cars={this.state.cars}/>



        </div>
        {/* <div className='add'>
          <form onSubmit={this.handleEditFormSubmit}>
            <table border="2" className="">
              <thead>
                <tr>
                  <th width={"50"}>ID:</th>
                  <th width={"50"}>carBrand:</th>
                  <th width={"50"}>model:</th>
                  <th width={"50"}>carType:</th>
                  <th width={"50"}>productionDate:</th>
                  <th width={"50"}>color:</th>
                  <th width={"50"}>carMileage:</th>
                  <th width={"50"}>statusRental:</th>
                  <th width={"50"}>carStatus:</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.handleCarsFormSubmit()}
              </tbody>
            </table>

          </form>
        </div> */}

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
        <div>
          <div id="table-cars-app">
          </div>
        </div>
        {/*  */}

        {/* <button className={'user-label'} type="submit" onClick={this.Customer()}>gtregd</button> */}
      </div >
    )
  }

}