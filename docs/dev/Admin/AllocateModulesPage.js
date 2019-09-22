import React, { Component } from "react";
import { 
    MDBContainer, 
    MDBRow, 
    MDBCol, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody 
} from "mdbreact";
import axios from "axios";

class AllocateModulesPage extends Component {

    state = {
        studentNumberEntered: "",
        moduleCodeEntered: "",
        student: {
            studentNumber: "",
            studentName: ""
        },
        studentModules: {
            columns: [
                {
                    label: "Module Code",
                    field: "moduleCode",
                    sort: "asc"
                },
                {
                    label: "Module Name",
                    field: "moduleName",
                    sort: "asc"
                },
                {
                    label: "Lecture Code",
                    field: "lectureCode",
                    sort: "asc"
                }
            ],
            rows: []
        },
        showStudentModules: false
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {
    }

    inputChangeHandler = (e) => {
        e.preventDefault();
        if (e.target.name == "studentNumberInput") {
            this.setState({
                studentNumberEntered: e.target.value
            })
        }
        if (e.target.name == "moduleCodeInput") {
            this.setState({
                moduleCodeEntered: e.target.value
            });
        }
    }

    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";

        if (this.state.studentNumberEntered && this.state.moduleCodeEntered) {
            // call api with moduleCodeEntered & student number to add module for student, return student's new mods
            axios
                .get("http://localhost:3001/studentRetrieved")
                .then(result => {
                    let data = result.data;
                    let student = data.student;
                    let studentModules = data.studentModules;
                    let arr = [];
                    Object.keys(studentModules).forEach(function (key) {
                        let temp = {
                            moduleCode: studentModules[key].moduleCode,
                            moduleName: studentModules[key].moduleName,
                            lectureCode: studentModules[key].lectureCode
                        }
                        arr.push(temp);
                    });
                    this.setState({
                        student: {
                            studentNumber: student.studentNumber,
                            studentName: student.studentName
                        },
                        studentModules: {
                            ...this.state.studentModules,
                            rows: arr
                        },
                        showStudentModules: true
                    });
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });
        }
        else {
            this.setState({
                showStudentModules: false
            });
        }
    };

    render() {
        let studentModules = this.state.studentModules;
        console.log(studentModules);
        return (
            <MDBContainer className="mt-3">
                <MDBRow className="py-3">
                    <MDBCol>
                        <h4 className="mb-2">Allocate Modules</h4>
                        <div className="mb-3"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="py-3">
                    <MDBCol>
                        <form className="needs-validation" noValidate onSubmit={this.submitHandler}>
                            <div className="form-row align-items-center">
                                <div className="col-md-3">
                                    <label>Student Number</label>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" className="form-control mb-2" name="studentNumberInput" 
                                        onChange={this.inputChangeHandler}
                                        value={this.state.studentNumberEntered}
                                        required />
                                </div>
                            </div>
                            <div className="form-row align-items-center">
                                <div className="col-md-3">
                                    <label>Module Code</label>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" className="form-control mb-2" name="moduleCodeInput" 
                                        onChange={this.inputChangeHandler}
                                        value={this.state.moduleCodeEntered}
                                        required />
                                </div>
                                <div className="col-auto">
                                    <button type="submit" className="btn btn-primary btn-md mt-md-0 ml-0" >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
                {
                    this.state.showStudentModules && studentModules.rows && studentModules.rows.length > 0 &&
                    <MDBRow className="py-2">
                        <MDBCol>
                            <MDBRow>
                                <MDBCol>
                                <h5>Student's Modules</h5>
                                <div className="mb-4"></div>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    Student Number: {this.state.student.studentNumber}
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="mb-3">
                                <MDBCol>
                                    Student Name: {this.state.student.studentName}
                                </MDBCol>
                            </MDBRow>
                            <MDBTable bordered btn fixed>
                                <MDBTableHead columns={studentModules.columns} color="mdb-color lighten-5" />
                                <MDBTableBody rows={studentModules.rows} />
                            </MDBTable>
                        </MDBCol>
                    </MDBRow>
                }
            </MDBContainer>
        )
    }
}

export default AllocateModulesPage;
