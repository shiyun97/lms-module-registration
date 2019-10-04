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

  componentDidMount() {
    if (localStorage.getItem("email") !== null) {
      let email = localStorage.getItem("email")
      let password = localStorage.getItem("password")
      let accessRight = localStorage.getItem("accessRight")
      let userId = localStorage.getItem("userId")
      let gender = localStorage.getItem("gender")
      let firstName = localStorage.getItem("firstName")
      let lastName = localStorage.getItem("lastName")
      let username = localStorage.getItem("username")
      let path = localStorage.getItem("path")
      this.props.dataStore.setPath(path)
      this.props.dataStore.setSignInStatus(true, email, password, accessRight)
      this.props.dataStore.setUserDetails(userId, gender, firstName, lastName, username)
    }
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  closeCollapse = collapseID => () => {
    window.scrollTo(0, 0);
    this.state.collapseID === collapseID && this.setState({ collapseID: "" });
  };

  updatePath = (path) => {
    this.props.dataStore.setPath(path);
    this.closeCollapse("mainNavbarCollapse");
  }

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
    const userId = this.props.dataStore.getUserId;
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
                    onClick={() => this.updatePath('/')}
                  >
                    <strong>Home</strong>
                  </MDBNavLink>
                </MDBNavItem>
                {this.props.dataStore.getAccessRight === "Student" && <>
                  <MDBNavItem style={{ paddingRight: 10 }}>
                    <MDBNavLink
                      onClick={() => this.updatePath(`/student/${userId}/classes`)}
                      to={`/student/${userId}/classes`}
                    >
                      <strong>My Classes</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem style={{ paddingRight: 10 }}>
                    <MDBNavLink
                      onClick={() => this.updatePath(`/student/${userId}/select-modules`)}
                      to={`/student/${userId}/select-modules`}
                    >
                      <strong>Select Modules</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem style={{ paddingRight: 10 }}>
                    <MDBNavLink
                      onClick={() => this.updatePath(`/student/${userId}/select-tutorials`)}
                      to={`/student/${userId}/select-tutorials`}
                    >
                      <strong>Select Tutorials</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem style={{ paddingRight: 10 }}>
                    <MDBNavLink
                      onClick={() => this.updatePath(`/student/${userId}/appeals`)}
                      to={`/student/${userId}/appeals`}
                    >
                      <strong>Submit Appeals</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                </>}
                {this.props.dataStore.getAccessRight === "Admin" && <>
                  <MDBNavItem style={{ paddingRight: 10 }}>
                    <MDBNavLink
                      onClick={() => this.updatePath('/admin/users')}
                      to="/admin/users"
                    >
                      <strong>Users Management</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem style={{ paddingRight: 10 }}>
                    <MDBNavLink
                      onClick={() => this.updatePath('/admin/mountModule')}
                      to="/admin/mountModule"
                    >
                      <strong>Module Mounting</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem style={{ paddingRight: 10 }}>
                    <MDBNavLink
                      onClick={() => this.updatePath('/admin/appeals')}
                      to="/admin/appealsList"
                    >
                      <strong>Appeals</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem style={{ paddingRight: 10 }}>
                    <MDBNavLink
                      onClick={() => this.updatePath('/admin/allocate-modules')}
                      to="/admin/allocate-modules"
                    >
                      <strong>Allocate Modules</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem style={{ paddingRight: 10 }}>
                    <MDBNavLink
                      onClick={() => this.updatePath('/admin/scheduleSettings')}
                      to="/admin/scheduleSettings"
                    >
                      <strong>Schedule Settings</strong>
                    </MDBNavLink>
                  </MDBNavItem>
                </>}
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
