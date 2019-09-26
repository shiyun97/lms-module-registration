import React, { Component } from "react";
import { MDBContainer, MDBCol, MDBRow } from "mdbreact";
import SectionContainer from "../../components/sectionContainer";
import axios from "axios";
import { Button } from "@material-ui/core";

var url = "http://localhost:3001/";

class MountModulePageFormCreate extends Component {

    state = {
        moduleCode: "",
        moduleName: "",
        semester: "",
        year: "",
        faculty: "",
        department: "",
        maxCapacity: "",
        professor: "",
    }

    handleOnChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    displayMountModuleForm = () => {
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
                                value={this.state.moduleName}
                                name="moduleName"
                                type="text"
                                className="form-control"
                                placeholder="Module Title"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Semester: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                value={this.state.semester}
                                name="semester"
                                type="text"
                                className="form-control"
                                placeholder="Semester"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Year: </MDBCol>
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
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Maximum Capacity: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                value={this.state.maxCapacity}
                                name="maxCapacity"
                                type="text"
                                className="form-control"
                                placeholder="Maximum Capacity"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Professor: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                value={this.state.professor}
                                name="professor"
                                type="text"
                                className="form-control"
                                placeholder="Professor"
                                onChange={this.handleOnChange}
                            />
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

    cancel = event => {
        this.props.history.go(-1)
    }

    create = event => {
        const { moduleCode, moduleName, semester, year, faculty, department, maxCapacity, professor } = this.state;

        //FIXME: check id created using json server
        axios.post(url + "modules", { moduleCode, moduleName, semester, year, faculty, department, maxCapacity, professor })
            .then(result => {
                console.log(result.data);
                alert("Successful mounted");
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
        this.props.history.go(-1)
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