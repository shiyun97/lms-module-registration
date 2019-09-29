import React, { Component } from "react";
import styled from 'styled-components';
import { 
    MDBContainer, 
    MDBRow, 
    MDBCol, 
    MDBBtn, 
    MDBDataTable 
} from "mdbreact";
import axios from "axios";
import 'babel-polyfill';
import { GetCurrentScheduleAPI } from '../Api/ScheduleApi';
import { GetAvailableTutorialsAPI, GetStudentTutorialsAPI } from '../Api/ModulesApi';

class SelectTutorialsPage extends Component {

    state = {
        currentRound: "",
        currentSemester: "",
        currentYear: "",
        availableTutorials: {
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
                    label: "Tutorial Id",
                    field: "tutorialId",
                    sort: "asc"
                },
                {
                    label: "",
                    field: "addButton",
                    sort: "asc"
                }
            ],
            rows: []
        },
        selectedTutorials: {
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
                    label: "Tutorial Id",
                    field: "tutorialId",
                    sort: "asc"
                },
                {
                    label: "",
                    field: "deleteButton",
                    sort: "asc"
                }
            ],
            rows: []
        },
        tutorialsToAdd: []
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.initPage();
    }

    async initPage() {
        let studentId = this.props.match.params.studentId;
        if (studentId) {
            const schedule = await GetCurrentScheduleAPI();
            this.setState({
                ...this.state,
                currentRound: schedule.currentTutorialRound,
                currentSemester: schedule.currentSemester,
                currentYear: schedule.currentYear
            })
            // retrieve student's selected modules & available tutorials for bidding
            await GetStudentTutorialsAPI(studentId)
                .then(result => {
                    if (result) {
                        let data = result.data && result.data.tutorials;
                        let arr = [];
                        const deleteMethod = this.deleteTutorial;
                        Object.keys(data).forEach(function (key) {
                            let temp = {
                                moduleCode: data[key].module.code,
                                moduleName: data[key].module.title,
                                tutorialId: data[key].tutorialId,
                                deleteButton: (
                                    <MDBBtn color="danger" size="sm" onClick={e => deleteMethod(data[key].tutorialId)}>
                                        Delete
                                    </MDBBtn>
                                )
                            }
                            arr.push(temp);
                        });
                        this.setState({
                            selectedTutorials: {
                                ...this.state.selectedTutorials,
                                rows: arr
                            }
                        });
                    }
                    else {
                        this.setState({
                            selectedTutorials: {
                                ...this.state.selectedTutorials,
                                rows: []
                            }
                        })
                    }

                })
                .catch(error => {
                    alert(JSON.stringify(error.response.data.errorMessage));
                });

            await GetAvailableTutorialsAPI(studentId)
                .then(result => {
                    if (result) {
                        let data = result.data.tutorials;
                        let availableTutorials = [];
                        const addMethod = this.addTutorial;
                        Object.keys(data).forEach(function (key) {
                            let temp = {
                                moduleCode: data[key].module.code,
                                moduleName: data[key].module.title,
                                tutorialId: data[key].tutorialId,
                                addButton: (
                                    <MDBBtn color="primary" size="sm" onClick={e => addMethod(data[key].tutorialId)}>
                                        Add
                                    </MDBBtn>
                                )
                            }
                            availableTutorials.push(temp);
                        });
                        this.setState({
                            availableTutorials: {
                                ...this.state.availableTutorials,
                                rows: availableTutorials
                            }
                        });
                    }

                })
                .catch(error => {
                    alert(JSON.stringify(error.response.data.errorMessage));
                });
        }
        return;
    }

    addTutorial = (tutorialId) => {
        let studentId = this.props.match.params.studentId;

        axios.post(`http://localhost:8080/LMS-war/webresources/studentEnrollment/enrollTutorial?userId=${studentId}&tutorialId=${tutorialId}`,{ validateStatus: false })
            .then((result) => {
                this.setState({
                    ...this.state,
                    availableTutorials: {
                        ...this.state.availableTutorials,
                        rows: []
                    },
                    selectedTutorials: {
                        ...this.state.selectedTutorials,
                        rows: []
                    }
                })
                return this.initPage()
            })
            .catch(error => {
                alert(JSON.stringify(error.response.data.errorMessage));
                return;
            });
    }

    deleteTutorial = (tutorialId) => {
        let studentId = this.props.match.params.studentId;
        axios.delete(`http://localhost:8080/LMS-war/webresources/studentEnrollment/dropTutorial?userId=${studentId}&tutorialId=${tutorialId}`)
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
                alert(JSON.stringify(error.response.data.errorMessage));
            });
    }

    render() {
        let availableTutorials = this.state.availableTutorials;
        let selectedTutorials = this.state.selectedTutorials;
        if (!this.state.currentRound || !this.state.currentSemester) return (
            <div className={this.props.className}>
                <MDBContainer className="mt-5">
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
                                    <div style={{ color: "rgb(220, 108, 43)", fontSize: "smaller", fontWeight: "bold" }}>{this.state.currentYear} Semester {this.state.currentSemester} Tutorial Bidding Round {this.state.currentRound}</div>
                                    <div className="mb-3" />
                                    <h5>Available Tutorials for Selection</h5>
                                    <div className="mb-3"></div>
                                </MDBCol>
                            </MDBRow>
                            {
                                availableTutorials.rows.length > 0 &&
                                <MDBDataTable striped bordered hover searching={true} sortable={true} data={availableTutorials} />
                            }
                            {
                                availableTutorials.rows.length == 0 &&
                                <div className="mb-5">No tutorials available</div>
                            }
                        </MDBCol>
                    </MDBRow>
                    
                    <MDBRow>
                        <MDBCol>
                            <MDBRow>
                                <MDBCol>
                                    <h5 className="mb-3">Selected Tutorials</h5>
                                </MDBCol>
                            </MDBRow>
                            {
                                selectedTutorials.rows.length == 0 &&
                                <div className="mb-5">No tutorials enrolled</div>
                            }
                            {
                                selectedTutorials.rows.length > 0 &&
                                <MDBDataTable striped bordered hover searching={false} sortable={true} paging={false} data={selectedTutorials} />
                            }
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}

export default styled(SelectTutorialsPage)`
tbody + thead{
    display: none;
}
`;
