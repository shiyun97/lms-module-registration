import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInputGroup, MDBCard, MDBCardBody } from "mdbreact";
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import { observer, inject } from 'mobx-react';

@inject('dataStore')
@observer
class ScheduleSettingsPage extends Component {

    state = {
        year: "2019/2020",
        semester: 1,
        moduleRound1StartDate: "",
        moduleRound1EndDate: "",
        moduleRound2StartDate: "",
        moduleRound2EndDate: "",
        moduleRound3StartDate: "",
        moduleRound3EndDate: "",
        tutorialRound1StartDate: "",
        tutorialRound1EndDate: "",
        tutorialRound2StartDate: "",
        tutorialRound2EndDate: "",
        status: "retrieving"
    }

    getPickerValue = (value) => {
        console.log(value);
    }

    calculateUnixToISODateFormat = (value) => {
        var formattedDate = new Date(value)
        formattedDate.setTime(formattedDate.getTime() + (8 * 60 * 60 * 1000)) // added 8 hours due to time diff
        return formattedDate.toISOString().replace(':00.000Z', '');
    }

    updateScheduleDetails = () => {
        const userId = this.props.dataStore.getUserId;
        axios
            .post(`http://localhost:8080/LMS-war/webresources/studentEnrollment/updateSchedule?userId=${userId}`, {
                year: this.state.year,
                semester: this.state.semester,
                moduleRound1StartDate: this.state.moduleRound1StartDate + ":00",
                moduleRound1EndDate: this.state.moduleRound1EndDate + ":00",
                moduleRound2StartDate: this.state.moduleRound2StartDate + ":00",
                moduleRound2EndDate: this.state.moduleRound2EndDate + ":00",
                moduleRound3StartDate: this.state.moduleRound3StartDate + ":00",
                moduleRound3EndDate: this.state.moduleRound3EndDate + ":00",
                tutorialRound1StartDate: this.state.tutorialRound1StartDate + ":00",
                tutorialRound1EndDate: this.state.tutorialRound1EndDate + ":00",
                tutorialRound2StartDate: this.state.tutorialRound2StartDate + ":00",
                tutorialRound2EndDate: this.state.tutorialRound2EndDate + ":00"
            })
            .then(result => {
                console.log(result)
                this.setState({
                    status: "done"
                });
                console.log("successfully updated");
            })
            .catch(error => {
                this.setState({
                    status: "error"
                });
                console.error("error in axios " + error);
                console.log(error.response.data.errorMessage)
            });
    }

    getScheduleDetails = () => {
        this.setState({ status: "retrieving" })
        axios
            .get(`http://localhost:8080/LMS-war/webresources/studentEnrollment/getScheduleDetails?year=${this.state.year}&semester=${this.state.semester}`)
            .then(result => {
                console.log(result)
                this.setState({
                    year: result.data.year,
                    semester: result.data.semester,
                    moduleRound1StartDate: this.calculateUnixToISODateFormat(result.data.moduleRound1StartDate),
                    moduleRound1EndDate: this.calculateUnixToISODateFormat(result.data.moduleRound1EndDate),
                    moduleRound2StartDate: this.calculateUnixToISODateFormat(result.data.moduleRound2StartDate),
                    moduleRound2EndDate: this.calculateUnixToISODateFormat(result.data.moduleRound2EndDate),
                    moduleRound3StartDate: this.calculateUnixToISODateFormat(result.data.moduleRound3StartDate),
                    moduleRound3EndDate: this.calculateUnixToISODateFormat(result.data.moduleRound3EndDate),
                    tutorialRound1StartDate: this.calculateUnixToISODateFormat(result.data.tutorialRound1StartDate),
                    tutorialRound1EndDate: this.calculateUnixToISODateFormat(result.data.tutorialRound1EndDate),
                    tutorialRound2StartDate: this.calculateUnixToISODateFormat(result.data.tutorialRound2StartDate),
                    tutorialRound2EndDate: this.calculateUnixToISODateFormat(result.data.tutorialRound2EndDate),
                    status: "done"
                });
            })
            .catch(error => {
                this.setState({
                    status: "error",
                    moduleRound1StartDate: "",
                    moduleRound1EndDate: "",
                    moduleRound2StartDate: "",
                    moduleRound2EndDate: "",
                    moduleRound3StartDate: "",
                    moduleRound3EndDate: "",
                    tutorialRound1StartDate: "",
                    tutorialRound1EndDate: "",
                    tutorialRound2StartDate: "",
                    tutorialRound2EndDate: "",
                });
                console.error("error in axios " + error);
            });
    }

    createSchedule = () => {
        const userId = this.props.dataStore.getUserId;
        axios
            .put(`http://localhost:8080/LMS-war/webresources/studentEnrollment/createSchedule?userId=${userId}`, {
                year: this.state.year,
                semester: this.state.semester,
                moduleRound1StartDate: this.state.moduleRound1StartDate + ":00",
                moduleRound1EndDate: this.state.moduleRound1EndDate + ":00",
                moduleRound2StartDate: this.state.moduleRound2StartDate + ":00",
                moduleRound2EndDate: this.state.moduleRound2EndDate + ":00",
                moduleRound3StartDate: this.state.moduleRound3StartDate + ":00",
                moduleRound3EndDate: this.state.moduleRound3EndDate + ":00",
                tutorialRound1StartDate: this.state.tutorialRound1StartDate + ":00",
                tutorialRound1EndDate: this.state.tutorialRound1EndDate + ":00",
                tutorialRound2StartDate: this.state.tutorialRound2StartDate + ":00",
                tutorialRound2EndDate: this.state.tutorialRound2EndDate + ":00"
            })
            .then(result => {
                console.log(result)
                this.setState({
                    status: "done"
                });
                console.log("successfully created");
            })
            .catch(error => {
                this.setState({
                    status: "error"
                });
                console.error("error in axios " + error);
                console.log(error.response.data.errorMessage)
            });
    }

    componentDidMount() {
        this.getScheduleDetails();
    }

    handleYearChange = (event) => this.setState({ [event.target.name]: event.target.value });
    handleSemChange = (event) => this.setState({ [event.target.name]: event.target.value });
    handleDateChange = (event) => {
        console.log(this.state.tutorialRound2StartDate)
        console.log(this.state.tutorialRound2EndDate)
        this.setState({ [event.target.name]: event.target.value });
    }

    renderRoundDetails = () => {
        return (
            <>
                <MDBCol md="4" className="mt-4">
                    <h5 className="font-weight-bold">
                        Select Modules Round 1
                                                </h5>
                    <MDBRow>
                        <MDBCol md="12" className="mt-4">
                            <TextField
                                id="datetime-local"
                                label="Start Date"
                                type="datetime-local"
                                name="moduleRound1StartDate"
                                value={this.state.moduleRound1StartDate}
                                onChange={this.handleDateChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </MDBCol>
                        <MDBCol md="12" className="mt-4">
                            <TextField
                                id="datetime-local"
                                label="End Date"
                                type="datetime-local"
                                name="moduleRound1EndDate"
                                value={this.state.moduleRound1EndDate}
                                onChange={this.handleDateChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
                <MDBCol md="4" className="mt-4">
                    <h5 className="font-weight-bold">
                        Select Modules Round 2
                                                </h5>
                    <MDBRow>
                        <MDBCol md="12" className="mt-4">
                            <TextField
                                id="datetime-local"
                                label="Start Date"
                                type="datetime-local"
                                name="moduleRound2StartDate"
                                value={this.state.moduleRound2StartDate}
                                onChange={this.handleDateChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </MDBCol>
                        <MDBCol md="12" className="mt-4">
                            <TextField
                                id="datetime-local"
                                label="End Date"
                                type="datetime-local"
                                name="moduleRound2EndDate"
                                value={this.state.moduleRound2EndDate}
                                onChange={this.handleDateChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
                <MDBCol md="4" className="mt-4">
                    <h5 className="font-weight-bold">
                        Select Modules Round 3
                                                </h5>
                    <MDBRow>
                        <MDBCol md="12" className="mt-4">
                            <TextField
                                id="datetime-local"
                                label="Start Date"
                                type="datetime-local"
                                name="moduleRound3StartDate"
                                value={this.state.moduleRound3StartDate}
                                onChange={this.handleDateChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </MDBCol>
                        <MDBCol md="12" className="mt-4">
                            <TextField
                                id="datetime-local"
                                label="End Date"
                                type="datetime-local"
                                name="moduleRound3EndDate"
                                value={this.state.moduleRound3EndDate}
                                onChange={this.handleDateChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
                <MDBCol md="12" className="mt-4">
                    <br />
                    <hr />
                </MDBCol>
                <MDBCol md="6" className="mt-4">
                    <h5 className="font-weight-bold">
                        Select Tutorials Round 1
                                                </h5>
                    <MDBRow>
                        <MDBCol md="12" className="mt-4">
                            <TextField
                                id="datetime-local"
                                label="Start Date"
                                type="datetime-local"
                                name="tutorialRound1StartDate"
                                value={this.state.tutorialRound1StartDate}
                                onChange={this.handleDateChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </MDBCol>
                        <MDBCol md="12" className="mt-4">
                            <TextField
                                id="datetime-local"
                                label="End Date"
                                type="datetime-local"
                                name="tutorialRound1EndDate"
                                value={this.state.tutorialRound1EndDate}
                                onChange={this.handleDateChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
                <MDBCol md="6" className="mt-4">
                    <h5 className="font-weight-bold">
                        Select Tutorials Round 2
                                                </h5>
                    <MDBRow>
                        <MDBCol md="12" className="mt-4">
                            <TextField
                                id="datetime-local"
                                label="Start Date"
                                type="datetime-local"
                                name="tutorialRound2StartDate"
                                value={this.state.tutorialRound2StartDate}
                                onChange={this.handleDateChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </MDBCol>
                        <MDBCol md="12" className="mt-4">
                            <TextField
                                id="datetime-local"
                                label="End Date"
                                type="datetime-local"
                                name="tutorialRound2EndDate"
                                value={this.state.tutorialRound2EndDate}
                                onChange={this.handleDateChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            </>
        )
    }
    render() {
        if (this.state.status === "retrieving") {
            return (<h1>Retrieving</h1>)
        }
        else {
            return (
                <MDBContainer className="mt-3">
                    <MDBRow style={{ paddingTop: 60 }}>
                        <MDBCol md="12">
                            <h2 className="font-weight-bold">
                                ModReg Schedule Settings
                        </h2>
                        </MDBCol>
                        <MDBRow className="py-3">
                            <MDBCol md="12" style={{ paddingBottom: 240 }}>
                                <MDBCard>
                                    <MDBCardBody>
                                        <form className="mx-3 grey-text">
                                            <MDBRow>
                                                <MDBCol md="12" style={{ paddingTop: 20 }}>
                                                    <h4 className="font-weight-bold">
                                                        Semester Details
                                                </h4>
                                                </MDBCol>
                                                <MDBCol md="6" className="mt-4">
                                                    <MDBInputGroup
                                                        containerClassName="mb-3"
                                                        prepend="Year"
                                                        inputs={
                                                            <select name="year" className="browser-default custom-select" onChange={this.handleYearChange}>
                                                                <option value={this.state.year}>{this.state.year}</option>
                                                                <option value="2019/2020">2019/2020</option>
                                                                <option value="2020/2021">2020/2021</option>
                                                                <option value="2021/2022">2021/2022</option>
                                                            </select>
                                                        }
                                                    />
                                                </MDBCol>
                                                <MDBCol md="6" className="mt-4">
                                                    <MDBInputGroup
                                                        containerClassName="mb-3"
                                                        prepend="Semester"
                                                        inputs={
                                                            <select name="semester" className="browser-default custom-select" onChange={this.handleSemChange}>
                                                                <option value={this.state.semester}>{this.state.semester}</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                            </select>
                                                        }
                                                    />
                                                </MDBCol>
                                                <MDBCol align="right" md="12" className="mt-4">
                                                    <MDBBtn color="primary" onClick={() => this.getScheduleDetails()}>Retrieve Round Details</MDBBtn>
                                                    <br /><hr />
                                                </MDBCol>
                                                {this.renderRoundDetails()}
                                            </MDBRow>
                                        </form>
                                        <br />
                                        <MDBCol md="12" className="mt-4" align="right">
                                            {this.state.status === "error" && <MDBBtn color="primary" onClick={() => this.createSchedule()}>Create</MDBBtn>}
                                            {this.state.status === "done" && <MDBBtn color="primary" onClick={() => this.updateScheduleDetails()}>Update</MDBBtn>}
                                        </MDBCol>
                                        <br />
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBRow>
                </MDBContainer>
            )
        }
    }
}

export default ScheduleSettingsPage;
