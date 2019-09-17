import React, { Component } from "react";
import Fab from '@material-ui/core/Fab';
import { MDBEdgeHeader, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBJumbotron, MDBCardBody, MDBCard, MDBCardTitle, MDBCardText, MDBIcon, MDBContainer, MDBRow, MDBCol, MDBAnimation } from "mdbreact";
import { NavLink } from 'react-router-dom';

class DashboardPage extends Component {

  state = {
    modal1: false
  };

  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };

  render() {
    return (
      <>
        <MDBEdgeHeader color="indigo darken-3" className="loginPage" />
        <MDBContainer style={{ paddingBottom: 240 }}>
          <MDBRow>
            <MDBCol md="12" className="mt-3 mx-auto">
              <MDBJumbotron>
                <h2 className="font-weight-bold">
                  Dashboard
      </h2>
                <p className="text-muted mb-1">
                  AY XX/XX SEMESTER XX
          </p>
              </MDBJumbotron>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    );
  }
}

export default DashboardPage;
