import React, { Component } from "react";
import styled from 'styled-components';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBDataTable,
    MDBBtn
} from "mdbreact";
import axios from "axios";
import 'babel-polyfill';
import { GetStudentAvailableModulesAPI, GetStudentModulesAPI, GetAllAvailableModulesAPI } from '../Api/ModulesApi';

class AllocateModulesPage extends Component {

    state = {
        studentIdEntered: "",
        moduleIdEntered: "",
        currentStudentId: "",
        studentModules: {
            columns: [
                {
                    label: "Module Id",
                    field: "moduleId",
                    sort: "asc"
                },
                {
                    label: "Module Code",
                    field: "moduleCode",
                    sort: "asc"
                },
                {
                    label: "Module Name",
                    field: "moduleName",
                    sort: "asc"
                }
            ],
            rows: []
        },
        availableModules: {
            columns: [
                {
                    label: "Module Code",
                    field: "moduleCode",
                    width: 150,
                    sort: "asc"
                },
                {
                    label: "Module Name",
                    field: "moduleName",
                    width: 150,
                    sort: "asc"
                },
                {
                    label: "Credit",
                    field: "creditUnit",
                    width: 150,
                    sort: "asc"
                },
                {
                    label: "",
                    field: "addButton",
                    width: 150
                  }
            ],
            rows: []
        },
        showStudentModules: false,
        errorWrongStudentId: false,
        modalAddModule: false
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {

    }

    inputChangeHandler = (e) => {
        e.preventDefault();
        if (e.target.name == "studentIdInput") {
            this.setState({
                studentIdEntered: e.target.value
            })
        }
        if (e.target.name == "moduleIdInput") {
            this.setState({
                moduleIdEntered: e.target.value
            });
        }
    }

    async retrieveModules(currentStudentId) {
        let arr = []
        await axios
            .get("http://localhost:8080/LMS-war/webresources/studentEnrollment/retrieveStudentModules/" + currentStudentId)
            .then(result => {
                if (result) {
                    let data = result.data.modules;
                    Object.keys(data).forEach(function (key) {
                        let temp = {
                            moduleId: data[key].moduleId,
                            moduleCode: data[key].code,
                            moduleName: data[key].title
                        }
                        arr.push(temp);
                    });
                    this.setState({
                        studentModules: {
                            ...this.state.studentModules,
                            rows: arr
                        },
                        errorWrongStudentId: false
                    });
                }
            })
            .catch(error => {
                console.error("error in axios " + error);
                let errorMessage = error.response.data.errorMessage;
                console.log(errorMessage)
                if (errorMessage == "User has no enrolled modules") {
                    this.setState({
                        errorWrongStudentId: false
                    })
                }
                else {
                    this.setState({
                        errorWrongStudentId: true
                    })
                }
                
                return;
            });

        await axios
            .get("http://localhost:8080/LMS-war/webresources/studentEnrollment/retrieveAvailableModules")
            .then(result => {
                if (result) {
                    let data = result.data.modules;
                    let availableModules = [];
                    const addMethod = this.addModule;
                    Object.keys(data).forEach(function (key) {
                        let selectedAlr = false;
                        for (var i = 0; i < arr.length && selectedAlr === false; i++) {
                            if (arr[i].moduleCode === data[key].code) {
                                selectedAlr = true;
                            }
                        }
                        if (selectedAlr === false) {
                            let temp = {
                                moduleCode: data[key].code,
                                moduleName: data[key].title,
                                creditUnit: data[key].creditUnit,
                                addButton: (
                                    <MDBBtn color="primary" size="sm" onClick={e => addMethod(data[key].moduleId)}>
                                        Add
                                </MDBBtn>
                                )
                            }
                            availableModules.push(temp);
                        }
                    });
                    this.setState({
                        availableModules: {
                            ...this.state.availableModules,
                            rows: availableModules
                        },
                    });
                }
            })
            .catch(error => {
                console.error("error in axios " + error);
                return;
            });
            return;
    }

    retrieveStudentModules = (e) => {
        event.preventDefault();
        event.target.className += " was-validated";

        let studentIdEntered = this.state.studentIdEntered;
        if (studentIdEntered) {
            this.setState({
                currentStudentId: studentIdEntered
            })
            return this.retrieveModules(studentIdEntered)
        }
        else {
            this.setState({
                studentModules: {
                    ...this.state.studentModules,
                    rows: []
                },
                availableModules: {
                    ...this.state.availableModules,
                    rows: []
                },
                errorWrongStudentId: true
            })
        }
        return;
    }

    addModule = (moduleId) => {
        let studentId = this.state.currentStudentId;
        axios.post(`http://localhost:8080/LMS-war/webresources/studentEnrollment/enrollModuleAdmin?userId=${studentId}&moduleId=${moduleId}&adminId=${1}`)
            .then((result) => {
                console.log(result);
                return this.retrieveModules()
            })
            .catch(error => {
                alert(JSON.stringify(error.response.data.errorMessage));
            });
    }

    render() {
        let studentModules = this.state.studentModules;
        let availableModules = this.state.availableModules;
        return (
            <div className={this.props.className}>
            <MDBContainer className="mt-3">
                <MDBRow className="py-3">
                    <MDBCol>
                        <h4 className="mb-2">Allocate Modules</h4>
                        <div className="mb-3" />
                    </MDBCol>
                </MDBRow>
                <MDBRow className="py-3">
                    <MDBCol>
                        <form className="needs-validation" noValidate onSubmit={this.retrieveStudentModules}>
                            <div className="form-row align-items-center">
                                <div className="col-md-2 col-sm-12">
                                    <label>Student Id</label>
                                </div>
                                <div className="col-md-4 col-sm-12">
                                    <input type="text" className="form-control mb-2" name="studentIdInput"
                                        onChange={this.inputChangeHandler}
                                        value={this.state.studentIdEntered}
                                        required />
                                </div>
                                <div className="col-auto">
                                    <button type="submit" className="btn btn-primary btn-md mt-md-0 ml-0">
                                        Retrieve
                                    </button>
                                </div>
                            </div>
                            {
                                this.state.errorWrongStudentId &&
                                <div style={{ color: "red" }}>Invalid student Id</div>
                            }
                        </form>
                    </MDBCol>
                </MDBRow>
                {
                    !this.state.errorWrongStudentId && this.state.currentStudentId &&
                    <MDBRow className="py-2">
                        <MDBCol>
                            <MDBRow>
                                <MDBCol>
                                    <h5>Student's Modules</h5>
                                    <div className="mb-4 mt-2"></div>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow className="mb-3">
                                <MDBCol>
                                    Student Id: {this.state.currentStudentId}
                                </MDBCol>
                            </MDBRow>
                            {
                                studentModules.rows.length > 0 &&
                                <MDBDataTable striped bordered hover searching={false} paging={false} sortable={true} data={studentModules} />
                            }
                            {
                                studentModules.rows.length == 0 &&
                                <div>No modules enrolled</div>
                            }
                            <MDBRow className="py-5">
                        <MDBCol>
                            <MDBRow>
                                <MDBCol>
                                    <div className="mb-3" />
                                    <h5>Available Modules for Selection</h5>
                                    <div className="mb-3"></div>
                                </MDBCol>
                            </MDBRow>
                            {
                                availableModules.rows.length > 0 &&
                                <MDBDataTable striped bordered hover searching={true} sortable={true} data={availableModules} />
                            }
                            {
                                availableModules.rows.length == 0 &&
                                <div>No modules available.</div>
                            }
                        </MDBCol>
                    </MDBRow>
                        </MDBCol>
                    </MDBRow>
                }
            </MDBContainer>
            </div>
        )
    }
}

export default styled(AllocateModulesPage)`
tbody + thead{
    display: none;
}
`;
