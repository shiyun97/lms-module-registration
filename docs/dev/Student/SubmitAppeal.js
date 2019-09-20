import React, { Component } from "react";
import SectionContainer from "../../components/sectionContainer";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBDataTable,
  MDBBtn
} from "mdbreact";
import axios from "axios";

class SubmitAppeal extends Component {
  state = {
    value: "",
    scheduledDate: "",
    scheduledMonth: "",
    scheduledYear: "",
    scheduledHour: "",
    scheduledMinute: "",
    scheduledSecond: "",
    scheduledMillisecond: ""
  };

  componentDidMount() {
    axios
      .get("http://localhost:3001/schedule")
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
  }
  
  handleSelect = event => {
    event.preventDefault();
    this.setState({ value: event.target.value }, () => event);
  };

  handleChange = event => {
    console.log(event.target.value);
  };

  handleSubmit = event => {
    console.log("submit");
  };

  checkSchedule = () => {
    //if current date exceeds schedule, display past appeals and unable to submit appeal
    // else display the submit appeal options and past appeals

    var date = new Date();
    var currentYear = date.getFullYear();
    var currentMonth = date.getMonth();
    var currentDate = date.getDate();
    var currentHour = date.getHours();
    var currentMinute = date.getMinutes();
    var currentSeconds = date.getSeconds();
    var currentMillisecond = date.getMilliseconds();

    if (
      currentYear < this.state.scheduledYear ||
      currentMonth < this.state.scheduledMonth ||
      currentDate < this.state.scheduledDate ||
      currentHour < this.state.scheduledHour ||
      currentMinute < this.state.minute ||
      currentSeconds < this.state.seconds ||
      currentMillisecond < this.state.millisecond
    ) {
      return this.appealOpen();
    } else {
      return this.appealClosed();
    }
  };

  appealOpen = () => {
    return (
      <MDBContainer>
        <SectionContainer>
          <MDBContainer>
            <MDBRow>
              <MDBCol sm="4">Select Cateogry: </MDBCol>
              <MDBCol sm="8">
                <select onChange={this.handleSelect}>
                  <option>Choose your option</option>
                  <option value="1">Unable to secure module</option>
                  <option value="2">Change lecture/ tutorial group</option>
                </select>
              </MDBCol>
              <MDBCol>{this.appealModForm()}</MDBCol>
            </MDBRow>
          </MDBContainer>
        </SectionContainer>
        {this.showPastAppeals()}
      </MDBContainer>
    );
  };

  appealClosed = () => {
    return <div>closed</div> /* this.showPastAppeals() */;
  };


  appealModForm = () => {
    if (this.state.value === "1") {
      return (
        <div>
          <MDBRow style={{ paddingTop: "20px" }}>
            <MDBCol sm="4">Module Code: </MDBCol>
            <MDBCol sm="8">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                onChange={this.handleChange}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow style={{ paddingTop: "20px" }}>
            <MDBCol sm="4">Appeal Reason: </MDBCol>
            <MDBCol>
              <textarea
                className="form-control"
                rows="5"
                onChange={this.handleChange}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow style={{ paddingTop: "20px" }}>
            <MDBBtn color="primary" onClick={this.handleSubmit}>
              Submit
            </MDBBtn>
          </MDBRow>
        </div>
      );
    } else if (this.state.value === "2") {
      return <div>change lec/tut form</div>;
    } else {
      return null;
    }
  };

  showPastAppeals = () => {
    //if past appeal exist, show this:
    return (
      <MDBRow className="py-3">
        <MDBCol md="12">
          <SectionContainer noBorder>
            <MDBCard>
              <MDBCardBody>
                <MDBDataTable
                  striped
                  bordered
                  hover
                  entriesOptions={[5, 20, 25]}
                  entries={5}
                  pagesAmount={4}
                />
              </MDBCardBody>
            </MDBCard>
          </SectionContainer>
        </MDBCol>
      </MDBRow>
    );
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
