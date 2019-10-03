import React, { Component } from "react";
import SectionContainer from "../../components/sectionContainer";
import { MDBContainer, MDBCol, MDBRow, MDBTableBody, MDBTableHead, MDBTable, MDBBtn } from "mdbreact";
import axios from "axios";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

var url = "http://localhost:3001/";

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
        console.log(result.data.modules)
        this.setState({ availableModules: result.data.modules })
      })
      .catch(error => {
        console.error("error in axios " + error);
      });
    axios.get("http://localhost:8080/LMS-war/webresources/studentEnrollment/retrieveStudentAppeals?userId=2")
      .then(result => {
        this.setState({ allAppeals: result.data.appeals })
      })
      .catch(error => {
        console.error("error in axios " + error);
      });

    axios.get("http://localhost:8080/LMS-war/webresources/studentEnrollment/isAppealOpen")
      .then(result => {
        this.setState({ appealOpen: result.data })
        console.log(this.state.appealOpen)
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
    console.log("submit")
    const { value, appealModule, appealReason } = this.state;
    const date = new Date();

    axios.post("http://localhost:8080/LMS-war/webresources/studentEnrollment/createAppeal/", { reason: appealReason, userId: 2, type: value, moduleId: appealModule })
      .then(res => {
        console.log(res.data);
        alert("Successful");
      })
      .catch(error => {
        console.error("error in axios " + error);
      });
  };

  // handleSubmitChangeGroup = event => {
  //   event.preventDefault();
  //   const { value, appealModule, currentGroup, appealGroup, appealReason, appealStatus } = this.state;

  //   axios.post(url + "allAppeals", { value, appealModule, currentGroup, appealGroup, appealReason, appealStatus })
  //     .then(res => {
  //       console.log(res.data);
  //       alert("Successful");
  //     })
  //     .catch(error => {
  //       console.error("error in axios " + error);
  //     });
  // }

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
                <option value="Unable to secure module">
                  Unable to secure module
                  </option>
                <option value="Change tutorial group">
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
    console.log(this.state.value)
    if (this.state.value === "Unable to secure module") {
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
            <MDBBtn color="primary" type="submit" onSubmit={this.handleSubmitAppealMod}>
              Submit
            </MDBBtn>
          </MDBRow>
        </div>
      );
    }
    else if (this.state.value === "Change tutorial group") {
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
          {this.renderGroup()}

          {/* <MDBRow style={{ paddingTop: "20px" }}>
            <MDBBtn color="primary" onClick={this.handleSubmitChangeGroup}>
              Submit
            </MDBBtn>
          </MDBRow> */}
        </div>
      );
    } else {
      return null;
    }
  };

  // currentGrp = event => {
  //   this.setState({ currentGroup: event.target.value });
  // }

  // appealGrp = event => {
  //   this.setState({ appealGroup: event.target.value });
  // }

 getTutorials = () => {
  axios.get("http://localhost:8080/LMS-war/webresources/ModuleMounting/getAllTutorialByModule?moduleId=" + this.state.appealModule)
  .then(result => {
    this.setState({ availableModules: result.data.tutorials })
    console.log(result.data.tutorials)
  })
  .catch(error => {
    console.error("error in axios " + error);
  });
 }
    //var moduleId = this.state.appealModule
    /* axios.get("http://localhost:8080/LMS-war/webresources/ModuleMounting/getAllTutorialByModule?moduleId=" + this.state.appealModule)
      .then(result => {
        this.setState({ availableModules: result.data.tutorials })
        console.log(result.data.tutorials)
      })
      .catch(error => {
        console.error("error in axios " + error);
      });  */
      renderGroup = () => {

    return (
      <div>
        {this.getTutorials()}
        {/* <MDBRow style={{ paddingTop: "20px" }}>
          <MDBCol sm="4">Current Group: </MDBCol>
          <MDBCol sm="8">
            <select value={this.state.currentGroup} onChange={this.currentGrp}>
              <option>Choose your option</option>
              {grp && grp.map((grp, index) => <option key={index} value={grp}>{grp}</option>)}
            </select>
          </MDBCol>
        </MDBRow>

        <MDBRow style={{ paddingTop: "20px" }}>
          <MDBCol sm="4">Appeal Group: </MDBCol>
          <MDBCol sm="8">
            <select value={this.state.appealGroup} onChange={this.appealGrp}>
              <option>Choose your option</option>
              {grp && grp.map((grp, index) => <option key={index} value={grp}>{grp}</option>)}
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
        </MDBRow> */}

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
    if (this.state.allAppeals.length !== 0) {
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
