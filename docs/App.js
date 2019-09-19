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

  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("mainNavbarCollapse")}
      />
    );

    const { collapseID } = this.state;

    return (
      <Router>
        <div className="flyout">
          <MDBNavbar color="indigo" dark expand="md" scrolling fixed="top">
            <MDBNavbarBrand href="/" className="py-0 font-weight-bold">
              <i class="fas fa-school" style={{ height: "1.5rem", width: "2rem", paddingRight: "10px" }}></i>
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
                    to="/home"
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                  >
                    <strong>Home</strong>
                  </MDBNavLink>
                </MDBNavItem>
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
                    to="/student/:/studentId/select-modules"
                  >
                    <strong>Select Modules</strong>
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem style={{ paddingRight: 10 }}>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/student/tutorials"
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
                <MDBNavItem style={{ paddingRight: 10 }}>
                  <MDBNavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/login"
                  >
                    <strong>Login</strong>
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
          {collapseID && overlay}
          <main style={{ marginTop: "3rem" }}>
            <Routes />
          </main>
          <MDBFooter color="indigo">
            <p className="footer-copyright mb-0 py-3 text-center">
              &copy; {new Date().getFullYear()} Copyright Learning Management System
            </p>
          </MDBFooter>
        </div>
      </Router>
    );
  }
}

export default App;
