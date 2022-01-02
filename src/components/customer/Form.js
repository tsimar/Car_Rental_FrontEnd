import React, { Component } from "react";

class Form extends Component {
  constructor() {
    super();
    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const id = form.elements["id"].value;
    const userName = form.elements["userName"].value;
    this.props.addPerson(userName, id);
    form.reset();
  }

  render() {
    return (
      <form onSubmit={this.formSubmit}>
        <input
          id="userName"
          type="text"
          defaultValue=""
          placeholder="Name..."
        />
        <input
          id="id"
          type="text"
          defaultValue=""
          placeholder="id..."
        />
        <input type="submit" value="submit" />
      </form>
    );
  }
}

export default Form;