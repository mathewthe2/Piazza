// @flow

import * as React from "react";

import { Grid, Button, Card, Form } from "tabler-react";

class GuestsForm extends React.PureComponent<Props, State> {
  state = {
    name: '',
    phone: '',
    email: '',
    checkOut: new Date(),
  };
  updateName = e => {
    this.setState({name: e.target.value});
    let {newGuest} = this.props;
    newGuest.name = e.target.value;
    this.props.updateGuest(newGuest);
  };
  updatePhone = e => {
    this.setState({phone: e.target.value});
    let {newGuest} = this.props;
    newGuest.phone = e.target.value;
    this.props.updateGuest(newGuest);
  };
  updateEmail = e => {
    this.setState({email: e.target.value});
    let {newGuest} = this.props;
    newGuest.email = e.target.value;
    this.props.updateGuest(newGuest);
  };
  render() {
    const {name, phone, email, checkOut} = this.state;
    return (
        <React.Fragment>
          <Form.Group label="Name">
            <Form.Input value={name} onChange={this.updateName} icon="user" autoFocus placeholder="Eric Chan" />
          </Form.Group>
          <Form.Group label="Phone">
            <Form.Input value={phone} onChange={this.updatePhone} icon="phone" placeholder="(212) 312-7821" />
          </Form.Group>
          <Form.Group label="Email">
            <Form.Input value={email} onChange={this.updateEmail} icon="mail" type="email" placeholder="abc@example.com"/>
          </Form.Group>
          <Form.Group label="Check Out">
            <Form.DatePicker value={checkOut} maxYear={new Date().getFullYear()+2} />
          </Form.Group>
        </React.Fragment>
    );
  }
}

export default GuestsForm;
