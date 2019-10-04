import React, { Component } from "react";
import axios from "axios";
import SectionContainer from "../../components/sectionContainer";
import { MDBContainer, MDBCol, MDBRow, MDBInput, MDBFormInline, MDBBtn } from "mdbreact";
import { Button, FormControlLabel, RadioGroup, Radio, FormGroup, Switch } from "@material-ui/core";
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom';

const url = "http://localhost:8080/LMS-war/webresources/";

@inject('dataStore')
@observer
class MountModulePageForm extends Component {

    state = {
        disabled: true,
        index: 0,
        editSave: "Edit",
        userList: "",
        code: "",
        title: "",
        semesterOffered: "",
        yearOffered: "",
        creditUnit: "",
        hasExam: "",
        examDate: "",
        examTime: "",
        examFullDateTime: "",
        examVenue: "",
        faculty: "",
        department: "",
        maxEnrollment: "",
        assignedTeacherFirstName: "",
        assignedTeacherLastName: "",
        lectureDay: "",
        lectureTime: "",
        tutorial: "",
        checked: true,
    }

    componentDidMount() {
        var pathname = window.location.pathname, part = pathname.substr(pathname.lastIndexOf('/') + 1);
        this.setState({ index: part })

        axios.get(url + "ModuleMounting/getModule/" + part)
            .then(result => {
                this.setState({
                    code: result.data.code,
                    title: result.data.title,
                    semesterOffered: result.data.semesterOffered,
                    yearOffered: result.data.yearOffered,
                    creditUnit: result.data.creditUnit,
                    hasExam: result.data.hasExam,
                    examFullDateTime: result.data.examTime,
                    examVenue: result.data.examVenue,
                    faculty: result.data.faculty,
                    department: result.data.department,
                    maxEnrollment: result.data.maxEnrollment,
                    assignedTeacherFirstName: result.data.assignedTeacher.firstName,
                    assignedTeacherlastName: result.data.assignedTeacher.lastName,
                    lectureDetails: result.data.lectureDetails,
                    //lectureDay: result.data.lectureDetails.split(' ')[0],
                    //lectureTime: result.data.lectureDetails.substr(result.data.lectureDetails.indexOf(' ') + 1)
                })

            })
            .catch(error => {
                console.error("error in axios " + error);
            });

        axios.get(url + "User/getAllUser")
            .then(result => {
                this.setState({ userList: result.data.userList })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    handleOnChange = event => {
        console.log(event.target.value)
        console.log(event.target.name)
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSelectSemester = event => {
        this.setState({ semesterOffered: event.target.value }, () => event);
    }

    handleSelectLecture = event => {
        this.setState({ lectureDay: event.target.value }, () => event);
    }

    handleSelectExam = event => {
        if (event.target.value === "true") {
            this.setState({ hasExam: true }, () => event)
        } else {
            this.setState({ hasExam: false }, () => event)
        }
    }

    handleChangeTeacher = event => {
        this.setState({ assignedTeacher: event.target.value })
    }

    displayModuleDetails = () => {
        return (
            <MDBContainer>

                <SectionContainer>
                    <MDBRow>
                        <MDBCol sm="4">Module Code: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.code}
                                name="code"
                                type="text"
                                className="form-control"
                                placeholder="Module Code"
                                onChange={this.handleOnChange}
                                disabled={this.state.disabled}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" >Module Title: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.title}
                                name="title"
                                type="text"
                                className="form-control"
                                placeholder="Module Title"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Semester Offered: </MDBCol>
                        <MDBCol sm="8">
                            <select disabled={this.state.disabled} onChange={this.handleSelectSemester} className="browser-default custom-select" value={this.state.semesterOffered}>
                                <option >Select Semester</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Year Offered: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.yearOffered}
                                name="yearOffered"
                                type="text"
                                className="form-control"
                                placeholder="Year Offered"
                                onChange={this.handleOnChange}
                                disabled={this.state.disabled}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Credit Unit: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.creditUnit}
                                name="creditUnit"
                                type="number"
                                pattern="[0-9]*"
                                inputMode="numeric"
                                className="form-control"
                                placeholder="Credit Unit"
                                onChange={this.handleOnChange}
                                disabled={this.state.disabled}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Maximum Enrollment: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.maxEnrollment}
                                name="maxEnrollment"
                                type="number"
                                pattern="[0-9]*"
                                inputMode="numeric"
                                className="form-control"
                                placeholder="Maximum Enrollment"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Exam: </MDBCol>
                        <MDBCol sm="8">
                            <select disabled={this.state.disabled} onChange={this.handleSelectExam} className="browser-default custom-select" value={this.state.hasExam}>
                                <option >Select Exam</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </MDBCol>
                    </MDBRow>

                    {/* this.inputExamDetails() */}

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Faculty: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.faculty}
                                name="faculty"
                                type="text"
                                className="form-control"
                                placeholder="Faculty"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Department: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.department}
                                name="department"
                                type="text"
                                className="form-control"
                                placeholder="Department"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Assigned Teacher: </MDBCol>
                        <MDBCol sm="8">
                            {this.showAssignedTeacher()}
                        </MDBCol>
                    </MDBRow>
                    {this.renderLecture()}
                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol>
                            <Button onClick={this.delete} color="secondary" variant="contained">Delete</Button>
                        </MDBCol>
                        <MDBCol >
                            <Button onClick={this.editSave} color="primary" variant="contained" >{this.state.editSave}</Button>
                        </MDBCol>
                        <MDBCol >
                            <Button onClick={this.cancel} variant="contained">Cancel</Button>
                        </MDBCol>
                    </MDBRow>

                </SectionContainer>

            </MDBContainer>
        )
    }

    showAssignedTeacher = () => {
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
        if (this.state.disabled) {
            return (
                <input
                    defaultValue={this.state.assignedTeacherFirstName + this.state.assignedTeacherLastName}
                    name="assignedTeacher"
                    type="text"
                    className="form-control"
                    placeholder="Assigned Teacher"
                    disabled={this.state.disabled}
                />
            )
        } else {
            return (
                <select value={this.state.assignedTeacher} onChange={this.handleChangeTeacher} className="browser-default custom-select">
                    <option>Choose your option</option>
                    {
                        teachers && teachers.map(
                            (teachers) => <option key={teachers.userId} value={teachers.userId}>{teachers.name}</option>)
                    }
                </select>
            )
        }
    }



    renderLecture = () => {
        return (
            <div>
                <MDBRow style={{ paddingTop: "20px" }}>
                    <MDBCol sm="4">Lecture Day: </MDBCol>
                    <MDBCol sm="8">
                        <select disabled={this.state.disabled} className="browser-default custom-select" onChange={this.handleSelectLecture} value={this.state.lectureDay}>
                            <option>Choose your option</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                        </select>
                    </MDBCol>
                </MDBRow>

                {this.getLectureTime()}

            </div>
        )
    }

    getLectureTime = () => {
        if (this.state.disabled) {
            return (
                <MDBRow style={{ paddingTop: "20px" }}>
                    <MDBCol sm="4">Lecture Time: </MDBCol>
                    <MDBCol sm="8">
                        <input
                            defaultValue={this.state.lectureTime}
                            name="examDate"
                            type="text"
                            className="form-control"
                            placeholder="Lecture Time"
                            disabled={this.state.disabled}
                        />
                    </MDBCol>
                </MDBRow>
            )
        } else {
            var lectureTime = this.state.lectureTime.split(' ')[0]
            return (

                <MDBRow style={{ paddingTop: "20px" }}>
                    <MDBCol sm="4">Lecture Time: </MDBCol>
                    <MDBCol sm="8">
                        <input
                            value={lectureTime}
                            name="lectureTime"
                            type="time"
                            className="form-control"
                            placeholder="Lecture Time"
                            min="08:00"
                            max="20:00"
                            onChange={this.handleOnChange}
                        />
                    </MDBCol>
                </MDBRow>
            )
        }
    }

    inputExamDetails = () => {

        if (this.state.hasExam) {
            return (
                <div>
                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Exam Date: </MDBCol>

                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.examFullDateTime}
                                name="examDate"
                                type="date"
                                className="form-control"
                                placeholder="Exam Date"
                                onChange={this.handleOnChange}
                                disabled={this.state.disabled}
                            />
                        </MDBCol>
                    </MDBRow>

                    {/*FIXME:*/}
                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Exam Time: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.examTime}
                                name="examTime"
                                type="time"
                                className="form-control"
                                placeholder="Exam Time"
                                min="08:00"
                                max="20:00"
                                onChange={this.handleOnChange}
                                disabled={this.state.disabled}
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
                                disabled={this.state.disabled}
                            />
                        </MDBCol>
                    </MDBRow>
                </div>
            )
        } else {
            return null
        }
    }

    editSave = event => {
        this.setState({ disabled: false, editSave: "Save" })
        const { index } = this.state
        if (this.state.editSave === "Save") {
            this.setState({ disabled: true })
            const { code, title, semesterOffered, yearOffered, creditUnit, hasExam, examFullDateTime, examVenue, faculty, department, maxEnrollment, assignedTeacher, lectureDay } = this.state
            axios.post(`http://localhost:8080/LMS-war/webresources/ModuleMounting/updateModule?moduleId=${index}&userId=2`, {
                code: code,
                title: title,
                semesterOffered: semesterOffered,
                yearOffered: yearOffered,
                creditUnit: creditUnit,
                hasExam: hasExam,
                examFullDateTime: examFullDateTime,
                examVenue: examVenue,
                faculty: faculty,
                department: department,
                maxEnrollment: maxEnrollment,
                assignedTeacher: assignedTeacher,
                lectureDay: lectureDay
            })
                .then(result => {
                    console.log(result.data)
                    alert("Updated")
                    this.props.history.go(-1)
                })
                .catch(error => {
                    alert(error)
                    console.error("error in axios " + error);
                });
        }
    }

    mountModuleTutorialCreate = event => {
        var modId = this.props.dataStore.getMountSingleModuleIndex
        console.log("go to tutorial")
        let path = `${modId}/mountModule/create`;
        this.props.history.push(path);
    }

    viewTutorials = event => {
        var modId = this.props.dataStore.getMountSingleModuleIndex
        let path = modId + `/tutorial`;
        console.log(path)
        this.props.history.push(path);
    }
    render() {
        return (
            <MDBContainer style={{ paddingTop: "80px" }}>
                <h3>Module Details</h3>
                <MDBBtn color="primary" onClick={this.mountModuleTutorialCreate}>Mount Tutorial</MDBBtn>
                <MDBBtn color="primary" onClick={this.viewTutorials}>View Tutorial</MDBBtn>

                <MDBRow>{this.displayModuleDetails()}</MDBRow>
            </MDBContainer >
        )
    }
}

export default withRouter(MountModulePageForm)