import React, { Component } from "react";
import styled from 'styled-components';
import { 
    MDBContainer, 
    MDBRow, 
    MDBCol,
    MDBBtn, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody, 
    MDBCard, 
    MDBCardBody,
    MDBModal,
    MDBModalBody,
    MDBDataTable
} from "mdbreact";
import axios from "axios";
import 'babel-polyfill';
import SectionContainer from '../../components/sectionContainer';
import { GetCurrentScheduleAPI } from '../Api/ScheduleApi';
import { GetAllAvailableModulesAPI, GetStudentModulesAPI } from '../Api/ModulesApi';

class SelectModulesPage extends Component {

    state = {
        currentRound: "",
        currentSemester: "",
        currentYear: "",
        searchedModules: {
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
                },
                {
                    label: "",
                    field: "handle",
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
        selectedModules: {
            columns: [
                {
                    label: "Module Code",
                    field: "moduleCode",
                    sort: "asc"
                },
                {
                    label: "Module Name",
                    field: "moduleName",
                    width: 150,
                    sort: "asc"
                },
                {
                    label: "",
                    field: "deleteButton",
                    width: 150
                }
            ],
            rows: []
        }
    }

    componentDidMount() {
        this.initPage();
    }

    async initPage() {
        let studentId = this.props.match.params.studentId;
        if (studentId) {
            const schedule = await GetCurrentScheduleAPI()
            this.setState({
                ...this.state,
                currentRound: schedule.currentRound,
                currentSemester: schedule.currentSemester,
                currentYear: schedule.currentYear
            })

            // retrieve student & set state for classes
            let arr = [];
            await GetStudentModulesAPI(studentId)
                .then(result => {
                    let data = result.data.modules;
                    const deleteMethod = this.deleteModule;
                    Object.keys(data).forEach(function (key) {
                        let temp = {
                            moduleCode: data[key].code,
                            moduleName: data[key].title,
                            deleteButton: (
                                <MDBBtn color="danger" size="sm" onClick={e => deleteMethod(data[key].moduleId)}>
                                    Delete
                                </MDBBtn>
                            )
                        }
                        arr.push(temp);
                    });
                    this.setState({
                        selectedModules: {
                            ...this.state.selectedModules,
                            rows: arr
                        }
                    });
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });

            await GetAllAvailableModulesAPI()
                .then(result => {
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
                        }
                    });
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });
        }
        return;
    }

    addModule = (moduleId) => {
        let studentId = this.props.match.params.studentId;
        
        axios.post(`http://localhost:8080/LMS-war/webresources/studentEnrollment/enrollModule?userId=${studentId}&moduleId=${moduleId}`)
            .then((result) => {
                this.setState({
                    ...this.state,
                    availableModules: {
                        ...this.state.availableModules,
                        rows: []
                    },
                    selectedModules: {
                        ...this.state.selectedModules,
                        rows: []
                    }
                })
                return this.initPage()
            })
            .catch(error => {
                alert("An error occurred: " + error);
            });
    }

    deleteModule = (moduleId) => {
        let studentId = this.props.match.params.studentId;
        axios.delete(`http://localhost:8080/LMS-war/webresources/studentEnrollment/dropModule?userId=${studentId}&moduleId=${moduleId}`)
            .then((result) => {
                this.setState({
                    ...this.state,
                    availableModules: {
                        ...this.state.availableModules,
                        rows: []
                    },
                    selectedModules: {
                        ...this.state.selectedModules,
                        rows: []
                    }
                })
                return this.initPage();
            })
            .catch(error => {
                alert("An error occurred: " + error);
            });
    }

    render() {
        let availableModules = this.state && this.state.availableModules;
        let selectedModules = this.state && this.state.selectedModules;
        if (!this.state.currentRound || !this.state.currentSemester) return (
            <div className={this.props.className}>
                <MDBContainer className="mt-3">
                    Rounds closed
                </MDBContainer>
            </div>
        )
        return (
            <div className={this.props.className}>
                <MDBContainer className="mt-3">
                    <MDBRow className="py-5">
                        <MDBCol>
                            <MDBRow>
                                <MDBCol>
                                    <div style={{ color: "rgb(220, 108, 43)", fontSize: "smaller", fontWeight: "bold" }}>{this.state.currentYear} Semester {this.state.currentSemester} Module Bidding Round {this.state.currentRound}</div>
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
                    <MDBRow className="py-3">
                        <MDBCol>
                            <MDBRow>
                                <MDBCol>
                                    <h5>Selected Modules</h5>
                                    <div className="mb-3"></div>
                                </MDBCol>
                            </MDBRow>
                            {
                                selectedModules.rows.length > 0 &&
                                <MDBDataTable striped bordered hover searching={false} sortable={true} paging={false} data={selectedModules} />
                            }
                            {
                                selectedModules.rows.length == 0 &&
                                <div>No modules selected.</div>
                            }
                            <div className="mb-3" />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}

export default styled(SelectModulesPage)`
tbody + thead{
    display: none;
}
`;
