import React, { Component } from "react";
import axios from "axios";
import SectionContainer from "../../components/sectionContainer";
import { MDBContainer, MDBCol, MDBRow, MDBInput, MDBFormInline, MDBBtn } from "mdbreact";
import { Button, FormControlLabel, RadioGroup, Radio } from "@material-ui/core";
import { observer, inject } from 'mobx-react'

const url = "http://localhost:8080/LMS-war/webresources/";

@inject('dataStore')
@observer
class MountModulePageForm extends Component {

    state = {
        moduleDetails: "",
        disabled: true,
        index: 0,
        editSave: "Edit"
    }

    componentDidMount() {
        var pathname = window.location.pathname, part = pathname.substr(pathname.lastIndexOf('/') + 1);
        this.setState({ index: part })

        axios.get(url + "ModuleMounting/getModule/" + part)
            .then(result => {
                this.setState({ moduleDetails: result.data })
                console.log(this.state.moduleDetails)
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    handleOnChange = event => {
        this.setState({ [event.target.name]: event.target.value })
        /*  var changedValue = event.target.value
         console.log(changedValue)
 
         if (event.target.name === "code") {
             this.setState(prevState => ({
                 moduleDetails: {
                     ...prevState.moduleDetails,
                     code: changedValue
                 }
             }))
         } else if (event.target.name === "title") {
             this.setState(prevState => ({
                 moduleDetails: {
                     ...prevState.moduleDetails,
                     title: changedValue
                 }
             }))
         } else if (event.target.name === "semesterOffered") {
             this.setState(prevState => ({
                 moduleDetails: {
                     ...prevState.moduleDetails,
                     semesterOffered: changedValue
                 }
             }))
         } else if (event.target.name === "yearOffered") {
             this.setState(prevState => ({
                 moduleDetails: {
                     ...prevState.moduleDetails,
                     yearOffered: changedValue
                 }
             }))
         }  else if (event.target.name === "creditUnit") {
             this.setState(prevState => ({
                 moduleDetails: {
                     ...prevState.moduleDetails,
                     creditUnit: changedValue
                 }
             }))
         }
     else if (event.target.name === "faculty") {
             this.setState(prevState => ({
                 moduleDetails: {
                     ...prevState.moduleDetails,
                     faculty: changedValue
                 }
             }))
         } else if (event.target.name === "department") {
             this.setState(prevState => ({
                 moduleDetails: {
                     ...prevState.moduleDetails,
                     department: changedValue
                 }
             }))
         } else if (event.target.name === "maxEnrollment") {
             this.setState(prevState => ({
                 moduleDetails: {
                     ...prevState.moduleDetails,
                     maxEnrollment: changedValue
                 }
             }))
         } else {
             this.setState(prevState => ({
                 moduleDetails: {
                     ...prevState.moduleDetails,
                     assignedTeacher: changedValue
                 }
             }))
         } */
    }

    /*     handleSelect = event => {
            console.log("handle select")
        } */

    examClick = (nr) => () => {
        this.setState({ exam: nr })
    }

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
                            {/*                             <input
                                defaultValue={this.state.moduleDetails.semesterOffered}
                                name="semesterOffered"
                                type="text"
                                className="form-control"
                                placeholder="Semester Offered"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            /> */}
                            <select disabled={this.state.disabled} onChange={this.handleSelect} className="browser-default custom-select" value={this.state.moduleDetails.semesterOffered}>
                                <option disabled>Select Semester</option>
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
                                type="number"
                                pattern="[0-9]*"
                                inputMode="numeric"
                                className="form-control"
                                placeholder="Credit Unit"
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
                            <RadioGroup aria-label="position" name="position" onChange={this.handleSelect} row defaultValue={(this.state.moduleDetails.hasExam) ? "Yes" : "No"}>
                                {console.log("exam:" + this.state.moduleDetails.hasExam)}
                                <FormControlLabel
                                    value="Yes"
                                    disabled={this.state.disabled}
                                    control={<Radio color="primary" />}
                                    label="Yes"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value="No"
                                    disabled={this.state.disabled}
                                    control={<Radio color="primary" />}
                                    label="No"
                                    labelPlacement="end"
                                />
                            </RadioGroup>
                            {this.inputExamDetails()}
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
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Assigned Teacher: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={(this.state.moduleDetails.assignedTeacher)}
                                name="assignedTeacher"
                                type="text"
                                className="form-control"
                                placeholder="Assigned Teacher"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    {/*FIXME: change to select*/}
                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Lecture: </MDBCol>
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

    inputExamDetails = () => {
        if (this.state.moduleDetails.hasExam) {
            return (
                <div>
                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="12">
                            <input
                                defaultValue={this.state.moduleDetails.examDate}
                                name="examDate"
                                type="text"
                                className="form-control"
                                placeholder="Exam Date"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="12">
                            <input
                                value={this.state.moduleDetails.examTime}
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
                        <MDBCol sm="12">
                            <input
                                value={this.state.moduleDetails.examVenue}
                                name="examVenue"
                                type="text"
                                className="form-control"
                                placeholder="Exam Venue"
                                disabled={this.state.disabled}
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

    editSave = event => {
        this.setState({ disabled: false, editSave: "Save" })
        const { index } = this.state
        if (this.state.editSave === "Save") {
            this.setState({ disabled: true })
            //FIXME: Post to update
            axios.post(`http://localhost:8080/LMS-war/webresources/ModuleMounting/updateModule?moduleId=${index}&userId=2`, {})
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
        console.log(this.state.index)
        var index = this.state.index
        axios.delete(url + `ModuleMounting/deleteModule?moduleId=${index}`)
            .then(result => {
                this.props.history.go(-1)
                alert("Deleted");
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    mountModuleTutorialCreate = event => {
        var modId = this.props.dataStore.getMountSingleModuleIndex
        console.log("go to tutorial")
        let path = modId + `mountModule/create`;
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
                {/*                 <MDBBtn color="primary" href={`/admin/mountModule/form/${this.props.dataStore.getMountSingleModuleIndex}/create`}>Mount Tutorial</MDBBtn>
 */}
                <MDBBtn color="primary" onClick={this.mountModuleTutorialCreate}>Mount Tutorial</MDBBtn>
                <MDBBtn color="primary" onClick={this.viewTutorials}>View Tutorial</MDBBtn>

                <MDBRow>{this.displayModuleDetails()}</MDBRow>
            </MDBContainer >
        )
    }
}

export default MountModulePageForm