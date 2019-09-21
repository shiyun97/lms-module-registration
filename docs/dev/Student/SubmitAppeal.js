import React, { Component, Fragment } from "react";
import SectionContainer from "../../components/sectionContainer";
import { MDBContainer, MDBCol, MDBRow, MDBTableBody, MDBTableHead, MDBTable, MDBBtn, MDBModal, MDBModalHeader } from "mdbreact";
import axios from "axios";
import Button from '@material-ui/core/Button';

var url = "http://localhost:3001/";

class SubmitAppeal extends Component {
  state = {
    value: "",
    scheduledDate: "",
    scheduledMonth: "",
    scheduledYear: "",
    scheduledHour: "",
    scheduledMinute: "",
    scheduledSecond: "",
    scheduledMillisecond: "",
    appealModule: "",
    appealReason: "",
    appealStatus: "Pending",
    availableModules: "",
    allAppeals: "",
    modal: false
  };

  componentDidMount() {
    axios.get(url + "schedule")
      .then(result => {
        this.setState({
          scheduledDate: result.data.date,
          scheduledMonth: result.data.month,
          scheduledYear: result.data.year,
          scheduledHour: result.data.hour,
          scheduledMinute: result.data.minute,
          scheduledSecond: result.data.seconds,
          scheduledMillisecond: result.data.millisecond
        });
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

  checkSchedule = () => {
    //if current date exceeds schedule, display all appeals and unable to submit appeal
    // else display the submit appeal options and all appeals
    var date = new Date();
    var currentYear = date.getFullYear();
    var currentMonth = date.getMonth();
    var currentDate = date.getDate();
    var currentHour = date.getHours();
    var currentMinute = date.getMinutes();
    var currentSeconds = date.getSeconds();
    var currentMillisecond = date.getMilliseconds();

    if (currentYear < this.state.scheduledYear || currentMonth < this.state.scheduledMonth || currentDate < this.state.scheduledDate ||
      currentHour < this.state.scheduledHour || currentMinute < this.state.minute || currentSeconds < this.state.seconds || currentMillisecond < this.state.millisecond) {
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
    return <div>closed</div> /* this.showAllAppeals() */;
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
            <MDBCol sm="4">Current Group: </MDBCol>
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

  viewAppealDetails = event => {
    event.preventDefault()
    this.setState({ modal: !this.state.modal })
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
            {this.state.allAppeals && this.state.allAppeals.map((appeals, index) => {
              return (
                  <tr key={index}>
                    <td>{appeals.id}</td>
                    <td>{appeals.appealModule}</td>
                    <td>{appeals.value}</td>
                    <td>{appeals.appealStatus}</td>
                    <td><Button color="primary" onClick={this.viewAppealDetails}>View Details</Button>
                      <MDBModal isOpen={this.state.modal} toggle={this.viewAppealDetails}>
                        <MDBModalHeader toggle={this.viewAppealDetails}>Appeal Result</MDBModalHeader>
                      </MDBModal>
                    </td>
                  </tr>
              )
            })
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
