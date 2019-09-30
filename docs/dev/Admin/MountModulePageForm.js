import React, { Component } from "react";
import axios from "axios";
import SectionContainer from "../../components/sectionContainer";
import { MDBContainer, MDBCol, MDBRow } from "mdbreact";
import { Button } from "@material-ui/core";

const url = "http://localhost:8080/LMS-war/webresources/";

class MountModulePageForm extends Component {

    state = {
        moduleDetails: "",
        disabled: true,
        index: 0,
        editSave: "Edit"
    }

    componentDidMount() {
        var loc = this.props.history.location.pathname
        var index = loc.lastIndexOf('/');
        if (index !== -1) {
            var newStr = loc.substring(index + 1);
        }
        this.setState({ index: newStr })

        axios.get(url + "ModuleMounting/getAllModule")
            .then(result => {
                this.setState({ moduleDetails: result.data.module[newStr] })
                console.log(this.state.moduleDetails)
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    //TODO: improve on logic
    // handleOnChange = event => {
    //     var changedValue = event.target.value
    //     console.log(changedValue)

    //     if (event.target.name === "code") {
    //         this.setState(prevState => ({
    //             moduleDetails: {
    //                 ...prevState.moduleDetails,
    //                 code: changedValue
    //             }
    //         }))
    //     } else if (event.target.name === "title") {
    //         this.setState(prevState => ({
    //             moduleDetails: {
    //                 ...prevState.moduleDetails,
    //                 title: changedValue
    //             }
    //         }))
    //     } else if (event.target.name === "semesterOffered") {
    //         this.setState(prevState => ({
    //             moduleDetails: {
    //                 ...prevState.moduleDetails,
    //                 semesterOffered: changedValue
    //             }
    //         }))
    //     } else if (event.target.name === "yearOffered") {
    //         this.setState(prevState => ({
    //             moduleDetails: {
    //                 ...prevState.moduleDetails,
    //                 yearOffered: changedValue
    //             }
    //         }))
    //     }  else if (event.target.name === "creditUnit") {
    //         this.setState(prevState => ({
    //             moduleDetails: {
    //                 ...prevState.moduleDetails,
    //                 creditUnit: changedValue
    //             }
    //         }))
    //     }
    // else if (event.target.name === "faculty") {
    //         this.setState(prevState => ({
    //             moduleDetails: {
    //                 ...prevState.moduleDetails,
    //                 faculty: changedValue
    //             }
    //         }))
    //     } else if (event.target.name === "department") {
    //         this.setState(prevState => ({
    //             moduleDetails: {
    //                 ...prevState.moduleDetails,
    //                 department: changedValue
    //             }
    //         }))
    //     } else if (event.target.name === "maxEnrollment") {
    //         this.setState(prevState => ({
    //             moduleDetails: {
    //                 ...prevState.moduleDetails,
    //                 maxEnrollment: changedValue
    //             }
    //         }))
    //     } else {
    //         this.setState(prevState => ({
    //             moduleDetails: {
    //                 ...prevState.moduleDetails,
    //                 assignedTeacher: changedValue
    //             }
    //         }))
    //     }
    // }

    displayModuleDetails = () => {
        return (
            <MDBContainer>
                <SectionContainer>

                    <MDBRow>
                        <MDBCol sm="4">Module Code: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.moduleDetails.code}
                                name="code"
                                type="text"
                                className="form-control"
                                placeholder="Module Code"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" >Module Title: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.moduleDetails.title}
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
                            <input
                                defaultValue={this.state.moduleDetails.semesterOffered}
                                name="semesterOffered"
                                type="text"
                                className="form-control"
                                placeholder="Semester Offered"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Year Offered: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.moduleDetails.yearOffered}
                                name="yearOffered"
                                type="text"
                                className="form-control"
                                placeholder="Year Offered"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Credit Unit: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.moduleDetails.creditUnit}
                                name="creditUnit"
                                type="text"
                                className="form-control"
                                placeholder="Credit Unit"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Faculty: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.moduleDetails.faculty}
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
                                defaultValue={this.state.moduleDetails.department}
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
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Maximum Enrollment: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.moduleDetails.maxEnrollment}
                                name="maxEnrollment"
                                type="text"
                                className="form-control"
                                placeholder="Maximum Enrollment"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Assigned Teacher: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.moduleDetails.assignedTeacher}
                                name="assignedTeacher"
                                type="text"
                                className="form-control"
                                placeholder="Assigned Teacher"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Exam: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.moduleDetails.hasExam}
                                name="hasExam"
                                type="text"
                                className="form-control"
                                placeholder="hasExam"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Exam Time: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.moduleDetails.examTime}
                                name="examTime"
                                type="text"
                                className="form-control"
                                placeholder="Exam Time"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Exam Venue: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.moduleDetails.examVenue}
                                name="examVenue"
                                type="text"
                                className="form-control"
                                placeholder="Exam Venue"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Lecture Details: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.moduleDetails.lectureDetails}
                                name="lectureDetails"
                                type="text"
                                className="form-control"
                                placeholder="Lecture Details"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Tutorials: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.moduleDetails.tutorials}
                                name="tutorials"
                                type="text"
                                className="form-control"
                                placeholder="Tutorials"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

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

    editSave = event => {
        this.setState({ disabled: false, editSave: "Save" })
        if (this.state.editSave === "Save") {
            this.setState({ disabled: true })
            var putIndex = parseInt(this.state.index) + 1
            console.log(putIndex)

            axios.put(url + "modules/" + putIndex, this.state.moduleDetails)
                .then(result => {
                    console.log(result.data)
                    alert("Updated")
                    this.props.history.go(-1)
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });
        }
    }

    cancel = event => {
        this.props.history.go(-1)
    }

    delete = event => {
        console.log("delete mod")
        var deleteIndex = parseInt(this.state.index) + 1
        console.log(deleteIndex)
        axios.put(url + "modules/" + deleteIndex)
            .then(result => {
                console.log(result.data)
                alert("deleted")
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    render() {
        return (
            <MDBContainer style={{ paddingTop: "80px" }}>
                <h3>Module Details</h3>
                <MDBRow>{this.displayModuleDetails()}</MDBRow>
            </MDBContainer>
        )
    }
}

export default MountModulePageForm