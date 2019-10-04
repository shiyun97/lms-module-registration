import React, { Component } from "react";
import { MDBContainer, MDBCol, MDBRow, MDBInput, MDBFormInline } from "mdbreact";
import SectionContainer from "../../components/sectionContainer";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";

const url = "http://localhost:8080/LMS-war/webresources/";

class MountModulePageFormCreate extends Component {

    state = {
        userList: "",
        moduleCode: "",
        moduleTitle: "",
        semester: "",
        year: "",
        credit: "",
        exam: "",
        examDate: "",
        examTime: "",
        examVenue: "",
        faculty: "",
        department: "",
        maxEnrollment: "",
        assignedTeacher: "",
        lectureDay: "",
        lectureTime: "",
        tutorial: ""
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

    handleSelect = event => {

        event.preventDefault();
        console.log(event.target.value)
        if (event.target.value === "semester") {
            this.setState({ semester: event.target.value }, () => event);
        } else {
            this.setState({ lectureDay: event.target.value }, () => event);
        }
    }

    examClick = (nr) => () => {
        this.setState({ exam: nr })
    }

    getPickerValue = value => {
        console.log(value);
    };

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
            <MDBContainer>
                <SectionContainer>

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
                            <select value={this.state.semester} onChange={this.handleSelect} className="browser-default custom-select">
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
                                placeholder="Year"
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
                            <MDBFormInline>
                                <MDBInput gap onClick={this.examClick(1)} checked={this.state.exam === 1 ? true : false} label="Yes" type="radio" />
                                <MDBInput gap onClick={this.examClick(2)} checked={this.state.exam === 2 ? true : false} label="No" type="radio" />
                            </MDBFormInline>
                            {this.inputExamDetails()}
                        </MDBCol>
                    </MDBRow>

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

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Lecture: </MDBCol>
                        <MDBCol sm="8">
                            {this.renderLecture()}

                        </MDBCol>
                    </MDBRow>
                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>
                            <Button onClick={this.cancel}>Cancel</Button>
                        </MDBCol>
                        <MDBCol sm="8">

                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>
                            <Button onClick={this.create}>Create</Button>
                        </MDBCol>
                        <MDBCol sm="8">

                        </MDBCol>
                    </MDBRow>

                </SectionContainer>
            </MDBContainer>

        )
    }

    renderLecture = () => {
        return (
            <div>
                <MDBRow>
                    <MDBCol sm="12">
                        <select className="browser-default custom-select" onChange={this.handleSelect}>
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
                    <MDBCol sm="12">
                        <input
                            value={this.state.lectureTime}
                            name="lectureTime"
                            type="text"
                            className="form-control"
                            placeholder="Lecture Time"
                            onChange={this.handleOnChange}
                        />
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }

    inputExamDetails = () => {
        if (this.state.exam === 1) { //yes
            return (
                <div>
                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="12">
                            <input
                                value={this.state.examDate}
                                name="examDate"
                                type="text"
                                className="form-control"
                                placeholder="Exam Date"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="12">
                            <input
                                value={this.state.examTime}
                                name="examTime"
                                type="text"
                                className="form-control"
                                placeholder="Exam Time"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="12">
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
        const { moduleCode, moduleTitle, semester, year, credit, maxEnrollment, exam, faculty, department, assignedTeacher } = this.state
        var lectureDetails = this.state.lectureDay + this.state.lectureTime
        axios.put(`http://localhost:8080/LMS-war/webresources/ModuleMounting/mountModule?userId=${assignedTeacher}`, { code: moduleCode, title: moduleTitle, semesterOffered: semester, yearOffered: year, credit, maxEnrollment: maxEnrollment, hasExam: exam, lectureDetails: lectureDetails, faculty: faculty, department: department })
            .then(result => {
                this.props.history.go(-1)
                alert("Successful mounted");
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