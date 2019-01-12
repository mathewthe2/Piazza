// @flow

import * as React from "react";

import { Grid, Button, Card, Form } from "tabler-react";

class GuestsForm extends React.PureComponent<Props, State> {
  state = {

  };

  render() {
    return (
        <React.Fragment>
          <Form.Group label="Name">
            <Form.Input icon="user" autoFocus placeholder="Eric Chan" />
          </Form.Group>
          <Form.Group label="Phone">
            <Form.Input icon="phone" placeholder="(212) 312-7821" />
          </Form.Group>
          <Form.Group label="Email">
            <Form.Input icon="mail" type="email" placeholder="abc@example.com"/>
          </Form.Group>
          <Form.Group label="Check Out">
            <Form.DatePicker maxYear={new Date().getFullYear()+2} />
          </Form.Group>
        </React.Fragment>
    );
  }
}

export default GuestsForm;
