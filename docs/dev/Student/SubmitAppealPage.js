import React, { Component } from "react";
import SectionContainer from "../../components/sectionContainer";
import { MDBContainer, MDBCol, MDBRow, MDBTableBody, MDBTableHead, MDBTable, MDBBtn } from "mdbreact";
import axios from "axios";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import { toJS } from "mobx"


@inject('dataStore')
@observer
class SubmitAppealPage extends Component {
  state = {
    value: "",
    schedule: "",
    appealModule: "",
    appealReason: "",
    appealStatus: "Pending",
    availableModules: "",
    allAppeals: "",
    appealOpen: false,
    open: false,
    viewDetailsIndex: 0,
    currentGroup: "",
    appealGroup: "",
  };

  componentDidMount() {
    axios.get("http://localhost:8080/LMS-war/webresources/studentEnrollment/retrieveAvailableModules")
      .then(result => {
        this.setState({ availableModules: result.data.modules })
      })
      .catch(error => {
        console.error("error in axios " + error);
        alert("Please try again later")
      });

    let userId = localStorage.getItem("userId")
    axios.get(`http://localhost:8080/LMS-war/webresources/studentEnrollment/retrieveStudentAppeals?userId=${userId}`)
      .then(result => {
        this.setState({ allAppeals: result.data.appeals })
      })
      .catch(error => {
        console.error("error in axios " + error);
        alert("Please try again later")
      });

    axios.get("http://localhost:8080/LMS-war/webresources/studentEnrollment/isAppealOpen")
      .then(result => {
        this.setState({ appealOpen: result.data })
      })
      .catch(error => {
        console.error("error in axios " + error);
        alert("Please try again later")
      });
  }

  handleSelect = event => {
    event.preventDefault();
    this.setState({ value: event.target.value }, () => event);
  };

  handleChangeCode = event => {
    this.setState({ appealModule: event.target.value });
    this.props.dataStore.setAppealModuleId(event.target.value)
  };

  handleChangeReason = event => {
    this.setState({ appealReason: event.target.value });
  };

  handleChangeCurrentGroup = event => {
    this.setState({ currentGroup: event.target.value })
  }

  handleChangeAppealGroup = event => {
    this.setState({ appealGroup: event.target.value })
  }

  handleSubmitAppealMod = event => {
    event.preventDefault();
    const { value, appealModule, appealReason } = this.state;

    axios.post("http://localhost:8080/LMS-war/webresources/studentEnrollment/createAppeal/", { 
      reason: appealReason, 
      userId: 2, 
      type: value, 
      moduleId: appealModule 
    })
      .then(res => {
        window.location.reload();
        alert("Successful");
      })
      .catch(error => {
        console.error("error in axios " + error);
        alert("Please try again later")
      });
  };

  handleSubmitChangeGroup = event => {
    event.preventDefault();
    let userId = localStorage.getItem("userId")
    const { appealReason, value, currentGroup, appealGroup } = this.state;

    axios.post("http://localhost:8080/LMS-war/webresources/studentEnrollment/createAppeal/", { 
      reason: appealReason, 
      userId: userId, 
      type: value, 
      oldTutorialId: currentGroup, 
      newTutorialId: appealGroup 
    })
      .then(res => {
        window.location.reload();
        alert("Successful");
      })
      .catch(error => {
        window.location.reload();
        console.error("error in axios " + error);
        alert("Please try again later")
      });
  }

  checkSchedule = () => {
    if (this.state.appealOpen) {
      return this.appealOpen();
    } else {
      return this.appealClosed();
    }
  };

  appealOpen = () => {
    return (
      <MDBContainer>
        <SectionContainer>
          <MDBRow>
            <MDBCol sm="4">Select Cateogry: </MDBCol>
            <MDBCol sm="8">
              <select onChange={this.handleSelect} className="browser-default custom-select">
                <option>Choose your option</option>
                <option value="Module">
                  Unable to secure module
                  </option>
                <option value="Tutorial">
                  Change tutorial group
                  </option>
              </select>
            </MDBCol>
            <MDBCol>{this.appealModForm()}</MDBCol>
          </MDBRow>
        </SectionContainer>
        {this.showAllAppeals()}
      </MDBContainer>
    );
  };

  appealClosed = () => {
    return (
      <MDBContainer>
        <SectionContainer>
          <h3>Appeal Period Closed</h3>
        </SectionContainer>
        {this.showAllAppeals()}
      </MDBContainer>
    )
  };

  appealModForm = () => {
    if (this.state.value === "Module") {
      return (
        <div>
          <MDBRow style={{ paddingTop: "20px" }}>
            <MDBCol sm="4">Module Code: </MDBCol>
            <MDBCol sm="8">
              <select value={this.state.appealModule} onChange={this.handleChangeCode} className="browser-default custom-select">
                <option>Choose your option</option>
                {this.state.availableModules && this.state.availableModules.map(
                  (code) => <option key={code.moduleId} value={code.moduleId}>{code.code}</option>)
                }
              </select>
            </MDBCol>
          </MDBRow>

          <MDBRow style={{ paddingTop: "20px" }}>
            <MDBCol sm="4">Appeal Reason: </MDBCol>
            <MDBCol>
              <textarea
                className="form-control"
                rows="5"
                onChange={this.handleChangeReason}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow style={{ paddingTop: "20px" }}>
            <MDBBtn color="primary" onClick={this.handleSubmitAppealMod}>
              Submit
            </MDBBtn>
          </MDBRow>
        </div>
      );
    }
    else if (this.state.value === "Tutorial") {
      return (
        <div>
          <MDBRow style={{ paddingTop: "20px" }}>
            <MDBCol sm="4">Module Code: </MDBCol>
            <MDBCol sm="8">
              <select value={this.state.appealModule} onChange={this.handleChangeCode} className="browser-default custom-select">
                <option>Choose your option</option>
                {this.state.availableModules && this.state.availableModules.map(
                  (code) => <option key={code.moduleId} value={code.moduleId}>{code.code}</option>)
                }
              </select>
            </MDBCol>
          </MDBRow>

          {this.getTutorials()}

          <MDBRow style={{ paddingTop: "20px" }}>
            <MDBCol sm="4">Appeal Reason: </MDBCol>
            <MDBCol>
              <textarea
                className="form-control"
                rows="5"
                onChange={this.handleChangeReason}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow style={{ paddingTop: "20px" }}>
            <MDBBtn color="primary" onClick={this.handleSubmitChangeGroup}>
              Submit
            </MDBBtn>
          </MDBRow>
        </div>
      );
    } else {
      return null;
    }
  };

  getTutorials = () => {
    const tutorial = (toJS(this.props.dataStore.getTutorialList))
    return (
      <div>
        <MDBRow style={{ paddingTop: "20px" }}>
          <MDBCol sm="4">Current Group: </MDBCol>
          <MDBCol sm="8">
            <select onChange={this.handleChangeCurrentGroup} className="browser-default custom-select">
              <option>Choose your option</option>
              {
                tutorial && tutorial.map(
                (code) => <option key={code.tutorialId} value={code.tutorialId}>{code.tutorialId}</option>)
              }
            </select>
          </MDBCol>
        </MDBRow>

        <MDBRow style={{ paddingTop: "20px" }}>
          <MDBCol sm="4">Appeal Group: </MDBCol>
          <MDBCol sm="8">
            <select onChange={this.handleChangeAppealGroup} className="browser-default custom-select">
              <option>Choose your option</option>
              {
                tutorial && tutorial.map(
                (code) => <option key={code.tutorialId} value={code.tutorialId}>{code.tutorialId}</option>)
              }
            </select>
          </MDBCol>
        </MDBRow>
      </div>
    )
  }

  viewAppealDetails = () => {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol sm="4">Appeal Date: </MDBCol>
          <MDBCol sm="8">{(this.state.allAppeals[this.state.viewDetailsIndex]).createDate}</MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol sm="4">Appeal Module: </MDBCol>
          <MDBCol sm="8">{(this.state.allAppeals[this.state.viewDetailsIndex]).module.code}</MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol sm="4">Appeal Reason: </MDBCol>
          <MDBCol sm="8">{(this.state.allAppeals[this.state.viewDetailsIndex]).reason}</MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol sm="4">Appeal Status: </MDBCol>
          <MDBCol sm="8">{(this.state.allAppeals[this.state.viewDetailsIndex]).status}</MDBCol>
          {this.showReject()}
        </MDBRow>
      </MDBContainer>
    )
  }

  showReject = () => {
    return ((this.state.allAppeals[this.state.viewDetailsIndex]).status === "Rejected") ?
      <MDBContainer>
        <MDBRow>
          <MDBCol sm="4">Reject Reason: </MDBCol>
          <MDBCol sm="8">{(this.state.allAppeals[this.state.viewDetailsIndex]).reason}</MDBCol>
        </MDBRow>
      </MDBContainer>
      : null
  }

  handleClickOpen = index => {
    this.setState({ open: true, viewDetailsIndex: index })
  }

  handleClickClose = event => {
    this.setState({ open: false })
  }

  enableViewDetails = (status, index) => {
    return (status === "Pending") ? //disable view details button
      <Button fullWidth={true} color="primary" disabled>View Details</Button>
      :
      <div>
        <Button color="primary" onClick={() => this.handleClickOpen(index)} fullWidth={true}>View Details</Button>
        <Dialog open={this.state.open} maxWidth="sm" fullWidth={true}>
          <DialogTitle>Appeal Result</DialogTitle>
          <DialogContent>
            {this.viewAppealDetails()}
            <DialogActions>
              <Button variant="contained" color="primary" onClick={this.handleClickClose}>Cancel</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
  }

  showAllAppeals = () => {
    if (this.state.allAppeals.length !== 0) {
      return (
        <MDBTable responsive bordered>
          <MDBTableHead color="rgba-blue-slight" align="center">
            <tr>
              <th>ID</th>
              <th>Module Code</th>
              <th>Appeal Type</th>
              <th>Status</th>
              <th>View Details</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody align="center">
            {this.state.allAppeals ? (this.state.allAppeals.map((appeals, index) =>
              <tr key={index}>
                <td>{appeals.appealId}</td>
                <td>{appeals.module.code}</td>
                <td>{appeals.type}</td>
                <td>{appeals.status}</td>
                <td>{this.enableViewDetails(appeals.status, index)}</td>
              </tr>
            )
            ) : null
            }
          </MDBTableBody>
        </MDBTable>
      );
    } else {
      return null
    }
  };

  render() {
    return (
      <MDBContainer style={{ paddingTop: "40px" }}>
        <MDBRow>{this.checkSchedule()}</MDBRow>
      </MDBContainer>
    );
  }
}

export default SubmitAppealPage;
