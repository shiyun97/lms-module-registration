import React, { Component } from "react";
import { MDBContainer, MDBCol, MDBRow, MDBInput, MDBFormInline } from "mdbreact";
import SectionContainer from "../../components/sectionContainer";
import axios from "axios";
import { Button, TextField, Switch, FormControlLabel, Grid } from "@material-ui/core";

const url = "http://localhost:8080/LMS-war/webresources/";

class MountModulePageFormCreate extends Component {

    state = {
        userList: "",
        moduleCode: "",
        moduleTitle: "",
        semester: "",
        year: "",
        credit: "",
        hasExam: "",
        examDate: "",
        examTime: "",
        examVenue: "",
        faculty: "",
        department: "",
        maxEnrollment: "",
        assignedTeacher: "",
        lectureDay: "",
        lectureStartTime: "",
        lectureEndTime: "",
        lectureDetails: "",
        tutorial: "",
    }

    // get the list of all users and filter out teacher
    componentDidMount() {
        axios.get(url + "User/getAllUser")
            .then(result => {
                this.setState({ userList: result.data.userList })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    handleOnChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleChangeTeacher = event => {
        this.setState({ assignedTeacher: event.target.value })
    }

    handleSelectSemester = event => {
        this.setState({ semester: event.target.value }, () => event);
    }

    handleSelectExam = event => {
        if (event.target.value === "true") {
            this.setState({ hasExam: true }, () => event)
        } else {
            this.setState({ hasExam: false }, () => event)
        }
    }

    handleSelectLecture = event => {
        this.setState({ lectureDay: event.target.value }, () => event);
    }

    displayMountModuleForm = () => {
        var teachers = []
        var userList = this.state.userList
        var userListLength = userList.length
        for (var i = 0; i < userListLength; i++) {
            if (userList[i].accessRight === "Teacher") { //take note of the id
                teachers.push({
                    userId: userList[i].userId,
                    name: userList[i].firstName + " " + userList[i].lastName
                })
            }
        }

        return (
            <SectionContainer>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol sm="4">Module Code: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                value={this.state.moduleCode}
                                name="moduleCode"
                                type="text"
                                className="form-control"
                                placeholder="Module Code"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" >Module Title: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                value={this.state.moduleTitle}
                                name="moduleTitle"
                                type="text"
                                className="form-control"
                                placeholder="Module Title"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Semester Offered: </MDBCol>
                        <MDBCol sm="8">
                            <select value={this.state.semester} onChange={this.handleSelectSemester} className="browser-default custom-select">
                                <option >Select Semester</option>
                                <option value="1">
                                    1
                                </option>
                                <option value="2">
                                    2
                                </option>
                            </select>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Year Offered: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                value={this.state.year}
                                name="year"
                                type="text"
                                className="form-control"
                                placeholder="Year Offered"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Credit Unit: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                value={this.state.credit}
                                name="credit"
                                type="number"
                                pattern="[0-9]*"
                                inputMode="numeric"
                                className="form-control"
                                placeholder="Credit Unit"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Maximum Enrollment: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                value={this.state.maxEnrollment}
                                name="maxEnrollment"
                                type="number"
                                pattern="[0-9]*"
                                inputMode="numeric"
                                className="form-control"
                                placeholder="Maximum Enrollment"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Exam: </MDBCol>
                        <MDBCol sm="8">
                            <select value={this.state.hasExam} onChange={this.handleSelectExam} className="browser-default custom-select">
                                <option >Select Exam</option>
                                <option value="true">
                                    Yes
                                </option>
                                <option value="false">
                                    No
                                </option>
                            </select>
                        </MDBCol>
                    </MDBRow>

                    {this.inputExamDetails()}

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Faculty: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                value={this.state.faculty}
                                name="faculty"
                                type="text"
                                className="form-control"
                                placeholder="Faculty"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Department: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                value={this.state.department}
                                name="department"
                                type="text"
                                className="form-control"
                                placeholder="Department"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>


                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Assigned Teacher: </MDBCol>
                        <MDBCol sm="8">
                            <select value={this.state.assignedTeacher} onChange={this.handleChangeTeacher} className="browser-default custom-select">
                                <option>Choose your option</option>
                                {teachers && teachers.map(
                                    (teachers) => <option key={teachers.userId} value={teachers.userId}>{teachers.name}</option>)
                                }
                            </select>
                        </MDBCol>
                    </MDBRow>

                    {this.renderLecture()}
                    <MDBRow style={{ paddingTop: "20px" }}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="center"
                        >
                        <Grid style={{ paddingRight: '20px' }}>
                            <Button onClick={this.create} color="secondary" variant="contained">Create</Button>
                        </Grid>
                        <Grid style={{ paddingRight: '20px' }}>
                            <Button onClick={this.cancel} color="primary" variant="contained">Cancel</Button>
                        </Grid>
                        </Grid>

                    </MDBRow>
                </MDBContainer>
            </SectionContainer >

        )
    }

    renderLecture = () => {
        return (
            <div>
                <MDBRow style={{ paddingTop: "20px" }}>
                    <MDBCol sm="4">Lecture Day: </MDBCol>
                    <MDBCol sm="8">
                        <select className="browser-default custom-select" onChange={this.handleSelectLecture}>
                            <option>Choose your option</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                        </select>
                    </MDBCol>
                </MDBRow>

                <MDBRow style={{ paddingTop: "20px" }}>
                    <MDBCol sm="4">Lecture Start Time: </MDBCol>
                    <MDBCol sm="8">
                        <input
                            value={this.state.lectureStartTime}
                            name="lectureStartTime"
                            type="time"
                            className="form-control"
                            placeholder="Lecture Start Time"
                            min="08:00"
                            max="20:00"
                            onChange={this.handleOnChange}
                        />
                    </MDBCol>
                </MDBRow>

                <MDBRow style={{ paddingTop: "20px" }}>
                    <MDBCol sm="4">Lecture End Time: </MDBCol>
                    <MDBCol sm="8">
                        <input
                            value={this.state.lectureEndTime}
                            name="lectureEndTime"
                            type="time"
                            className="form-control"
                            placeholder="Lecture End Time"
                            min="08:00"
                            max="20:00"
                            onChange={this.handleOnChange}
                        />
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }

    inputExamDetails = () => {
        if (this.state.hasExam) {
            return (
                <div>
                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Exam Date: </MDBCol>

                        <MDBCol sm="8">
                            <input
                                value={this.state.examDate}
                                name="examDate"
                                type="date"
                                className="form-control"
                                placeholder="Exam Date"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Exam Time: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                value={this.state.examTime}
                                name="examTime"
                                type="time"
                                className="form-control"
                                placeholder="Exam Time"
                                min="08:00"
                                max="20:00"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Exam Venue: </MDBCol>

                        <MDBCol sm="8">
                            <input
                                value={this.state.examVenue}
                                name="examVenue"
                                type="text"
                                className="form-control"
                                placeholder="Exam Venue"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                </div>
            )
        } else {
            return null
        }
    }

    cancel = event => {
        this.props.history.go(-1)
    }

    create = event => {
        //var examFullDateTime = this.state.examDate + " " + this.state.examTime
        const { moduleCode, moduleTitle, semester, year, credit, maxEnrollment, hasExam, examVenue, faculty, department, assignedTeacher } = this.state
        var lectureDetails = this.state.lectureDay + " " + this.state.lectureStartTime + " - " + this.state.lectureEndTime
        axios.put(`http://localhost:8080/LMS-war/webresources/ModuleMounting/mountModule?userId=${assignedTeacher}`, {
            code: moduleCode,
            title: moduleTitle,
            semesterOffered: semester,
            yearOffered: year,
            creditUnit: credit,
            maxEnrollment: maxEnrollment,
            hasExam: hasExam,
            lectureDetails: lectureDetails,
            faculty: faculty,
            department: department,
            //examTime: examFullDateTime,
            //examVenue: examVenue,
            assignedTeacher: assignedTeacher,
        })
            .then(result => {
                window.location.reload()
                this.props.history.go(-1)
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

    }

    render() {


        return (
            <MDBContainer style={{ paddingTop: "80px" }}>
                <h3>Mount Module</h3>
                <MDBRow>{this.displayMountModuleForm()}</MDBRow>
            </MDBContainer>
        )
    }
}

export default MountModulePageFormCreate