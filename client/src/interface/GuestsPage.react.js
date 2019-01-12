// @flow

import * as React from "react";

import { Page, Grid, Button, Card, Table, Icon, Avatar } from "tabler-react";
import SiteWrapper from "../SiteWrapper.react";
import Modal from "react-bootstrap-modal";
import GuestsForm from "../components/GuestsForm.react";
import InvitationForm from "../components/InvitationForm.react";

class GuestsPage extends React.PureComponent<Props, State> {
  state = {
    inviteDialogOpen: true,
    addGuestDialogOpen: false,
  };
  openInviteDialog = () => this.setState({inviteDialogOpen: true});
  closeInviteDialog = () => this.setState({inviteDialogOpen: false});
  openAddGuestDialog = () => this.setState({addGuestDialogOpen: true});
  closeAddGuestDialog = () => this.setState({addGuestDialogOpen: false});
  render() {
    return (
      <SiteWrapper>
        <Page.Content title="Guests">
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
                    <Table.Row>
                      <Table.Col className="w-1">
                        <Avatar imageURL="./demo/faces/male/9.jpg" />
                      </Table.Col>
                      <Table.Col>Ronald Bradley</Table.Col>
                      <Table.Col>
                        <Icon onClick={this.openInviteDialog} link={true} name="send" />
                      </Table.Col>
                      <Table.Col className="text-nowrap">May 6, 2018</Table.Col>
                      <Table.Col className="w-1">
                        <Icon link={true} name="trash" />
                      </Table.Col>
                    </Table.Row>
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
            <GuestsForm />
          </Modal.Body>
          <Modal.Footer>
            <Button color="secondary" onClick={this.closeAddGuestDialog}>Close</Button>
            <Button color="primary" >Add Guest</Button>
          </Modal.Footer>
        </Modal>
        </Page.Content>
      </SiteWrapper>
    );
  }
}

export default GuestsPage;
