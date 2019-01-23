// @flow

import * as React from "react";

import { Page, Form, Button, Card, Table, Icon, Avatar, Alert } from "tabler-react";
import moment from 'moment';
import swal from 'sweetalert';
import SiteWrapper from "../SiteWrapper.react";
import Modal from "react-bootstrap-modal";
import GuestsForm from "../components/GuestsForm.react";
import InvitationForm from "../components/InvitationForm.react";


class Guest extends React.PureComponent<Props, void> {
  render() {
    const {guest, openInviteDialog} = this.props;
    const confirmDelete = () => swal({
      title: "Are you sure?",
      text: `Are you sure that you want to remove ${guest.name}?`,
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        swal("Deleted!", "Your guest is removed", "success");
      }
    });
    return (
      <Table.Row>
      <Table.Col className="w-1">
        <Avatar imageURL={guest.avatar} />
      </Table.Col>
      <Table.Col>{guest.name}</Table.Col>
      <Table.Col>
        <Icon onClick={openInviteDialog} link={true} name="send" />
      </Table.Col>
      <Table.Col className="text-nowrap">{moment(guest.checkOut).fromNow()}</Table.Col>
      <Table.Col className="w-1">
        <Icon link={true} onClick={confirmDelete} name="trash" />
      </Table.Col>
    </Table.Row>
    )
  }
}

class GuestsPage extends React.PureComponent<Props, State> {
  state = {
    inviteDialogOpen: false,
    addGuestDialogOpen: false,
    guests: [],
    addedGuest: false,
    newGuest: {},
  };
  componentDidMount() {
    this.getReviews().then(res=>this.setState({guests: res}));
  }
  getReviews = async () => {
    const response = await fetch('/guest');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };
  openInviteDialog = () => this.setState({inviteDialogOpen: true});
  closeInviteDialog = () => this.setState({inviteDialogOpen: false});
  openAddGuestDialog = () => this.setState({addGuestDialogOpen: true});
  closeAddGuestDialog = () => this.setState({addGuestDialogOpen: false, newGuest: {}});
  updateGuest = newGuest => this.setState({newGuest});
  render() {
    const options = (
      <React.Fragment>
        <Form.Select className="w-auto mr-2">
          <option value="asc">Newest</option>
          <option value="desc">Oldest</option>
        </Form.Select>
        <Form.Input icon="search" placeholder="Search" />
      </React.Fragment>
    );
    return (
      <SiteWrapper>
        <Page.Content 
          title="Guests" 
          options={options} 
          subTitle="1 - 10 of 172 guests" 
        >
        {this.state.addedGuest &&
          <Alert type="success" icon="check">
          The guest has been added.
          </Alert>
        }
        <Card>
          <Card.Header>
            <Card.Options>
              <Button onClick={this.openAddGuestDialog} color="primary" icon="plus" size="sm">
                Guest
              </Button>
              <Button icon="upload" color="secondary" size="sm" className="ml-2">
                CSV/XLS
              </Button>
            </Card.Options>
          </Card.Header>
            <Table
                  cards={true}
                  striped={true}
                  responsive={true}
                  className="table-vcenter"
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.ColHeader colSpan={2}>Guest</Table.ColHeader>
                      <Table.ColHeader>Review</Table.ColHeader>
                      <Table.ColHeader>Check Out</Table.ColHeader>
                      <Table.ColHeader />
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.state.guests.map((guest, index)=>
                      <Guest key={`guest ${index}`} guest={guest} openInviteDialog={this.openInviteDialog} />
                    )}
                  </Table.Body>
                </Table>
        </Card>
        <Modal
          show={this.state.inviteDialogOpen}
          onHide={this.closeInviteDialog}
          aria-labelledby="ModalHeader"
        >
          <Modal.Header>
            <Modal.Title>Review Invitation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InvitationForm name={'Andy'} />
          </Modal.Body>
          <Modal.Footer>
          <Button color="secondary" onClick={this.closeInviteDialog}>Close</Button>
            <Button color="primary">Send</Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={this.state.addGuestDialogOpen}
          onHide={this.closeAddGuestDialog}
          aria-labelledby="ModalHeader"
        >
          <Modal.Header>
            <Modal.Title>Add Guest</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <GuestsForm updateGuest={this.updateGuest} newGuest={this.state.newGuest} />
          </Modal.Body>
          <Modal.Footer>
            <Button color="secondary" onClick={this.closeAddGuestDialog}>Close</Button>
            <Button color="primary" onClick={()=>console.log(this.state.newGuest)}>Add Guest</Button>
          </Modal.Footer>
        </Modal>
        </Page.Content>
      </SiteWrapper>
    );
  }
}

export default GuestsPage;
