// @flow

import * as React from "react";

import { Form } from "tabler-react";

class InvitationForm extends React.PureComponent<Props, State> {
  state = {
    name: this.props.name || '',
  };

  render() {
    //const {phone, email} = this.props;
    //const methodOfContact = phone ? phone : email; 
    return (
        <React.Fragment>
          <Form.Group label="Name">
            <Form.Input icon="user" value={this.state.name} onChange={e=>this.setState({name: e.target.value})} autoFocus placeholder="Eric Chan" />
          </Form.Group>
          <Form.Group label="Phone or email">
            <Form.Input icon="mail"  placeholder="(212) 312-7821" />
          </Form.Group>
          <Form.Textarea
            name="example-textarea"
            rows={6}
            placeholder="Content.."
            defaultValue={` Hey ${this.state.name}, Thanks again for coming in. Here's the link I was talking about to leave a review. Have a great day!`}
          />
        </React.Fragment>
    );
  }
}

export default InvitationForm;
