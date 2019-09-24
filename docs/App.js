import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBFooter,
  MDBNavLink
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { observer, inject } from 'mobx-react'

@inject('dataStore')
@observer
class App extends Component {
  state = {
    collapseID: ""
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  closeCollapse = collapseID => () => {
    window.scrollTo(0, 0);
    this.state.collapseID === collapseID && this.setState({ collapseID: "" });
  };

  logOutUser = () => {
    this.closeCollapse("mainNavbarCollapse");
    this.props.dataStore.setSignOutStatus();
  }

  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("mainNavbarCollapse")}
      />
    );

    const { collapseID } = this.state;
    const dataStore = this.props.dataStore;
    return (
      <Router>
        <div className="flyout">
          <MDBNavbar color="indigo" dark expand="md" scrolling fixed="top" isLoggedIn={this.props.dataStore.getSignInStatus}>
            <MDBNavbarBrand href="/" className="py-0 font-weight-bold">
              <i className="fas fa-school" style={{ height: "1.5rem", width: "2rem", paddingRight: "10px" }}></i>
              <strong className="align-middle">MODREG</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler
              onClick={this.toggleCollapse("mainNavbarCollapse")}
            />
            <MDBCollapse
              id="mainNavbarCollapse"
              isOpen={this.state.collapseID}
              navbar
            >
              <MDBNavbarNav right>
                <MDBNavItem style={{ paddingRight: 10 }}>
                  <MDBNavLink
                    exact
                    to="/"
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                  >
                    <strong>Home</strong>
                  </MDBNavLink>
                </MDBNavItem>
                {/* { (this.props.dataStore.getUserType === "student" || "admin") && <> */}
                <MDBNavItem style={{ paddingRight: 10 }}>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/student/:studentId/classes"
                  >
                    <strong>My Classes</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem style={{ paddingRight: 10 }}>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/student/:studentId/select-modules"
                  >
                    <strong>Select Modules</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem style={{ paddingRight: 10 }}>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/student/:studentId/select-tutorials"
                  >
                    <strong>Select Tutorials</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem style={{ paddingRight: 10 }}>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/student/appeals"
                  >
                    <strong>Submit Appeals</strong>
                  </MDBNavLink>
                </MDBNavItem>
                {/* </> } */}
                {/* {this.props.dataStore.getUserType === "admin" && <> */}
                <MDBNavItem style={{ paddingRight: 10 }}>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/users"
                  >
                    <strong>Users Management</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem style={{ paddingRight: 10 }}>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/allocate-modules"
                  >
                    <strong>Allocate Modules</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem style={{ paddingRight: 10 }}>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/scheduleSettings"
                  >
                    <strong>Schedule Settings</strong>
                  </MDBNavLink>
                </MDBNavItem>
                {/* </> } */}
                {dataStore.getSignInStatus ?
                  <MDBNavItem style={{ paddingRight: 10 }}>
                    <MDBNavLink
                      onClick={() => this.logOutUser()}
                      to="/"
                    >
                      <strong>Logout</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                  :
                  <MDBNavItem style={{ paddingRight: 10 }}>
                    <MDBNavLink
                      onClick={this.closeCollapse("mainNavbarCollapse")}
                      to="/login"
                    >
                      <strong>Login</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                }
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
          {collapseID && overlay}
          <main style={{ marginTop: "3rem" }}>
            <Routes />
          </main>
          <MDBFooter color="indigo">
            <p className="footer-copyright mb-0 py-3 text-center">
              &copy; {new Date().getFullYear()} Copyright Module Registration System
            </p>
          </MDBFooter>
        </div>
      </Router>
    );
  }
}

export default App;
