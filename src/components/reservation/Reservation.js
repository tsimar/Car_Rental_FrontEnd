import React, { Component } from 'react';
import { url } from "../../url";
import axios from "axios";
import "./Reservation.css";

const api = axios.create({ baseURL: `${url}/rentals` });

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: []
    }

  }

  componentDidMount = () => {
    this.getReservations();
  }
  getReservations = async () => {
    let data = await api.get('/').then(({ data }) => data);
    this.setState({ reservations: data })
    console.log(data)
  }

  renderIncomingData = () => {
    return (this.state.reservations.map((item, id) => {
      
      return (

        <tr>
          <td className={"id"} border width={"50"} >{item.id}</td>
          <td className={"emId"} border width={"50"}>{item.employeeId}</td>
          <td className={"rentalDate"} border width={"250"}>{item.rentalDate}</td>
          <td className={"commentsRental"} border width={"200"}>{item.commentsRental}</td>
          <td className={"commentsCustomer"} border width={"200"}>{item.commentsCustomer}</td>
          <td className={"reservationDTOs"} border width={"650"}>


          
            {
              <table>
                <thead>
                  <tr>
                    <th width={"50"} >DTOSid</th>
                    <th width={"200"}>reservationDate</th>
                    <th width={"200"}>fromDateReservation</th>
                    <th width={"200"}>ofDateReservation</th>
                  </tr>
                </thead>
               
                <tbody>
                  {this.renderNestedTableBody(item.reservationDTOs)}
                </tbody>
              </table>
            }
          </td>

        </tr>
      )
    })
    );
  }

  renderNestedTableBody = (reservationDTOs) => {
    return (
      reservationDTOs.map(dto => {
        return (
          <tr>
            <td className={"reservationIdDto"} border width={"50"} >{dto.id}</td>
            <td className={"reservationDate"} border width={"200"}>{dto.reservationDate}</td>
            <td className={"fromDateReservation"} border width={"200"}>{dto.fromDateReservation}</td>
            <td className={"ofDateReservation"} border width={"200"}>{dto.ofDateReservation}</td>
          </tr>
        );
      })
    );
  }

  render() {
    return (
      <div>
      
        <table border="2" className="user-tab-th">
          <thead>
            <tr>
              <th width={"50"}>Id</th>
              <th width={"50"}>emId</th>
              <th width={"250"}>rentalDate</th>
              <th width={"200"}>commentsRental</th>
              <th width={"200"}>commentsCustomer</th>
              <th width={"650"}>Reservations</th>
            </tr>
          </thead>
          <tbody>
            {this.renderIncomingData()}

          </tbody>
        </table>
      </div>
    )
  }
}

export default Reservation;