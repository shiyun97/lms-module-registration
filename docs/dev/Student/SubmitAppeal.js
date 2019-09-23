import React, { Component } from "react";
import SectionContainer from "../../components/sectionContainer";
import { MDBContainer, MDBCol, MDBRow, MDBTableBody, MDBTableHead, MDBTable, MDBBtn } from "mdbreact";
import axios from "axios";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

var url = "http://localhost:3002/";

class SubmitAppeal extends Component {
  state = {
    value: "",
    schedule: "",
    appealModule: "",
    appealReason: "",
    appealStatus: "Pending",
    availableModules: "",
    allAppeals: "",
    open: false,
    viewDetailsIndex: 0,
  };

  componentDidMount() {
    axios.get(url + "schedule")
      .then(result => {
        this.setState({ schedule: result.data });
      })
      .catch(error => {
        console.error("error in axios " + error);
      });
    axios.get(url + "availableModules")
      .then(result => {
        this.setState({ availableModules: result.data })
      })
      .catch(error => {
        console.error("error in axios " + error);
      });
    axios.get(url + "allAppeals")
      .then(result => {
        this.setState({ allAppeals: result.data })
      })
      .catch(error => {
        console.error("error in axios " + error);
      });
  }

  handleSelect = event => {
    event.preventDefault();
    this.setState({ value: event.target.value }, () => event);
  };

  handleChangeCode = event => {
    console.log(event.target.value)
    this.setState({ appealModule: event.target.value });
  };

  handleChangeReason = event => {
    this.setState({ appealReason: event.target.value });
  };

  handleSubmitAppealMod = event => {
    event.preventDefault();
    const { value, appealModule, appealReason, appealStatus } = this.state;
    const date = new Date();

    axios.post(url + "currentAppeal", { value, appealModule, appealReason, date, appealStatus })
      .then(res => {
        console.log(res.data);
        alert("Successful");
      })
      .catch(error => {
        console.error("error in axios " + error);
      });
  };

  handleSubmitChangeGroup = event => {
    console.log("post to axios")
  }

  checkSchedule = () => {
    //if current date exceeds schedule, display all appeals and unable to submit appeal
    // else display the submit appeal options and all appeals
    var date = new Date();

    if (date.getFullYear() < this.state.schedule.year || date.getMonth() < this.state.schedule.month || date.getDate() < this.state.schedule.date ||
      date.getHours() < this.state.schedule.hour || date.getMinutes() < this.state.schedule.minute || date.getSeconds() < this.state.schedule.second || date.getMilliseconds() < this.state.schedule.millisecond) {
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
              <select onChange={this.handleSelect}>
                <option>Choose your option</option>
                <option value="Unable to secure module">
                  Unable to secure module
                  </option>
                <option value="Change lecture/ tutorial group<">
                  Change lecture/ tutorial group
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
      <div>
        <h2>Appeal Period Closed</h2>
        {this.showAllAppeals()}
      </div>
    )
  };

  appealModForm = () => {
    if (this.state.value === "Unable to secure module") {
      return (
        <div>
          <MDBRow style={{ paddingTop: "20px" }}>
            <MDBCol sm="4">Module Code: </MDBCol>
            <MDBCol sm="8">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                onChange={this.handleChangeCode}
              />
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
    else if (this.state.value === "Change lecture/ tutorial group<") {
      return (
        <div>
          {console.log(this.state.availableModules[0].moduleCode)}
          <MDBRow style={{ paddingTop: "20px" }}>
            <MDBCol sm="4">Module Code: </MDBCol>
            <MDBCol sm="8">
              <select onChange={this.handleChangeCode}>
                <option>Choose your option</option>
                {this.state.availableModules && this.state.availableModules.map(
                  (code) => <option key={code.id} value={code.moduleCode}>{code.moduleCode}</option>)
                }
              </select>
            </MDBCol>
          </MDBRow>

          <MDBRow style={{ paddingTop: "20px" }}>
            <MDBCol sm="4">Current Group: </MDBCol>
            <MDBCol sm="8">
              <select onChange={this.handleChangeCode}>
                <option>Choose your option</option>
                {/*FIXME:*/}

              </select>
            </MDBCol>
          </MDBRow>

          <MDBRow style={{ paddingTop: "20px" }}>
            <MDBCol sm="4">Appeal Group: </MDBCol>
            <MDBCol sm="8">
              {/*display appeal group based on whether it is lecture/ tutorial in the previous uption */}
              appeal group
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

  viewAppealDetails = () => {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol sm="4">Appeal Date: </MDBCol>
          <MDBCol sm="8">{(this.state.allAppeals[this.state.viewDetailsIndex]).date.slice(0, 10)}</MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol sm="4">Appeal Module: </MDBCol>
          <MDBCol sm="8">{(this.state.allAppeals[this.state.viewDetailsIndex]).appealModule}</MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol sm="4">Appeal Reason: </MDBCol>
          <MDBCol sm="8">{(this.state.allAppeals[this.state.viewDetailsIndex]).appealReason}</MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol sm="4">Appeal Status: </MDBCol>
          <MDBCol sm="8">{(this.state.allAppeals[this.state.viewDetailsIndex]).appealStatus}</MDBCol>
          {this.showReject()}
        </MDBRow>
      </MDBContainer>
    )
  }

  showReject = () => {
    return ((this.state.allAppeals[this.state.viewDetailsIndex]).appealStatus === "Rejected") ?
      <MDBContainer>
        <MDBRow>
          <MDBCol sm="4">Reject Reason: </MDBCol>
          <MDBCol sm="8">{(this.state.allAppeals[this.state.viewDetailsIndex]).rejectReason}</MDBCol>
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
        <Dialog open={this.state.open} maxWidth="sm">
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
    if (this.state.allAppeals !== null) {
      return (
        <MDBTable responsive bordered>
          <MDBTableHead color="rgba-blue-slight">
            <tr>
              <th>ID</th>
              <th>Module Code</th>
              <th>Appeal Type</th>
              <th>Status</th>
              <th>View Details</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {this.state.allAppeals ? (this.state.allAppeals.map((appeals, index) =>
              <tr key={index}>
                <td>{appeals.id}</td>
                <td>{appeals.appealModule}</td>
                <td>{appeals.value}</td>
                <td>{appeals.appealStatus}</td>
                <td>{this.enableViewDetails(appeals.appealStatus, index)}</td>
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
 
export default SubmitAppeal;
