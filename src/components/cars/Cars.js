import React, { Component, setState, Fragment } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import "./Cars.css";
import ReadOnlyRowCar from './ReadOnlyRowCar';
import EditableRowCar from './EditableRowCar';



const api = axios.create({ baseURL: 'http://localhost:8080/cars' })

export default class BranchCompany extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      addFormData: [{
        carBrand: '',
        model: '',
        carType: '',
        productionDate: '',
        color: '',
        carMileage: '',
        statusRental: '',
        carStatus: '',
      }],
      editFormData: [{
        carBrand: '',
        model: '',
        carType: '',
        productionDate: '',
        carMileage: '',
        statusRental: '',
        carStatus: '',
      }],
      editContactId: null,

    };
  }

  componentDidMount = () => {
    this.getCars();
  }

  getCars = async () => {
    let data = await api.get('/').then(({ data }) => data);
    this.setState({ cars: data });
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

  handleAddFormSubmit = (e) => {
    e.preventDefault();
    const newCar = {
      id: nanoid(),
      carBrand: this.state.addFormData.carBrand,
      model: this.state.addFormData.model,
      cicarTypety: this.state.addFormData.carType,
      color: this.state.addFormData.color,
      carMileage: this.state.addFormData.carMileage,
      statusRental: this.state.addFormData.statusRental,
      carStatus: this.state.addFormData.carStatus,
    }
    const newCars = [...this.state.cars, newCar]

    // const editedContact = {
    //   id: this.state.editContactId,
    //   carBrand: this.state.editFormData.carBrand,
    //   model: this.state.editFormData.model,
    //   carType: this.state.editFormData.carType,
    //   color: this.state.editFormData.color,
    //   carMileage: this.state.editFormData.carMileage,
    //   statusRental: this.state.editFormData.statusRental,
    //   carStatus: this.state.editFormData.carStatus,
    // };

    api.post('/', this.state.addFormData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })




    this.setState({
      [e.target.name]: e.target.value,
    });

    this.setState({
      cars: newCars,


    })


  }

  handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editCar = [...this.state.cars];
    this.setState({ cars: editCar })

    this.setState({ editContactId: null });
    api.put('/', this.state.editFormData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
  }

  handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...this.state.editFormData };
    newFormData[fieldName] = fieldValue;

    this.setState({ editFormData: newFormData })
  };

  handleEditClick = (event, car) => {
    event.preventDefault();
    this.setState({
      editContactId: car.id
    })
    const formValues = {
      carBrand: car.carBrand,
      model: car.model,
      carType: car.carType,
      productionDate: car.productionDate,
    };
    this.setState({
      editFormData: formValues
    })
  }

  handleCancelClick = () => {
    this.setState({ editContactId: null });
  };

  handleDeleteClick = (carsId) => {
    const newContacts = [...this.state.cars];

    const index = this.state.cars.findIndex((contact) => (
      contact.id === carsId));

    newContacts.splice(index, 1);

    this.setState({ cars: newContacts });
    api.delete(`/${carsId}`)
    // this.getUsers(data);
  };

  renderIncomingData = () => {
    return (this.state.cars.map((item, id) => {
      return (
        <Fragment>
          {this.state.editContactId === item.id ? (
            <EditableRowCar
              editFormData={this.state.editFormData}
              handleEditFormChange={this.handleEditFormChange}
              handleCancelClick={this.handleCancelClick}
            />
          ) : (
            <ReadOnlyRowCar item={item} handleEditClick={this.handleEditClick}
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
                  <th width={"200"}>Logo:</th>
                  <th width={"250"}>Nam's department:</th>
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
        <h2 className={"user-main-tab"}>Add a new CAR</h2>
        <form onSubmit={this.handleAddFormSubmit} className={"user-label"}>
          <input
            type='text'
            name='carBrand'
            placeholder='car of brand'
            required="required"
            onChange={this.handleAddFormChange} />
          <input
            type='text'
            name='model'
            required="required"
            placeholder='model ...'
            onChange={this.handleAddFormChange}
          />
          <input
            type='text'
            name='carType'
            required="required"
            placeholder='type  ...'
            onChange={this.handleAddFormChange}
          />
          <input
            type='text'
            name='productionDate'
            required="required"
            placeholder='data  ...'
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


// function BranchCompany() {
//   return (
//     <div className="main-brandC">
//       Strona w przygotowaniu, przepraszamy...
//     </div >  
//   );
// }

// export default BranchCompany;