import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInputGroup, MDBCard, MDBCardBody } from "mdbreact";
import TextField from '@material-ui/core/TextField';
import axios from "axios";
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

    getScheduleDetails = () => {
        axios
            .get(`http://localhost:8080/LMS-war/webresources/studentEnrollment/getCurrentScheduleDetails`)
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
                    status: "error"
                });
                console.error("error in axios " + error);
            });
    }

    createSchedule = () => {
        const { userId } = 1;
        axios
            .get(`http://localhost:8080/LMS-war/webresources/studentEnrollment/createSchedule?userId=${userId}`)
            .then(result => {
                console.log(result)
                this.setState({
                    year: result.data.year,
                    semester: result.data.semester,
                    moduleRound1StartDate: result.data.moduleRound1StartDate,
                    moduleRound1EndDate: result.data.moduleRound1EndDate,
                    moduleRound2StartDate: result.data.moduleRound2StartDate,
                    moduleRound2EndDate: result.data.moduleRound2EndDate,
                    moduleRound3StartDate: result.data.moduleRound3StartDate,
                    moduleRound3EndDate: result.data.moduleRound3EndDate,
                    tutorialRound1StartDate: result.data.tutorialRound1StartDate,
                    tutorialRound1EndDate: result.data.tutorialRound1EndDate,
                    tutorialRound2StartDate: result.data.tutorialRound2StartDate,
                    tutorialRound2EndDate: result.data.tutorialRound2EndDate,
                    status: "done"
                });
            })
            .catch(error => {
                this.setState({
                    status: "error"
                });
                console.error("error in axios " + error);
            });
    }

    componentDidMount() {
        this.getScheduleDetails();
    }

    handleDateChange = (event) => this.setState({ [event.target.name]: event.target.value });

    render() {
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
                                                        <select className="browser-default custom-select">
                                                            <option value={this.state.year}>{this.state.year}</option>
                                                            <option value="1">2019/2020</option>
                                                            <option value="2">2020/2021</option>
                                                            <option value="3">2021/2022</option>
                                                        </select>
                                                    }
                                                />
                                            </MDBCol>
                                            <MDBCol md="6" className="mt-4">
                                                <MDBInputGroup
                                                    containerClassName="mb-3"
                                                    prepend="Semester"
                                                    inputs={
                                                        <select className="browser-default custom-select">
                                                            <option value={this.state.semester}>{this.state.semester}</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                        </select>
                                                    }
                                                />
                                            </MDBCol>
                                            <MDBCol md="12" className="mt-4">
                                                <br />
                                                <hr />
                                            </MDBCol>
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
                                        </MDBRow>
                                    </form>
                                    <br />
                                    <MDBCol md="12" className="mt-4" align="right">
                                        {this.state.status === "error" && <MDBBtn color="primary">Create</MDBBtn>}
                                        {this.state.status === "done" && <MDBBtn color="primary">Update</MDBBtn>}
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

export default ScheduleSettingsPage;
