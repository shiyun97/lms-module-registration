import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, 
    MDBCard, MDBCardBody } from "mdbreact";
import SectionContainer from '../../components/sectionContainer';

class SelectModulesPage extends Component {

    state = {
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
            rows: [
                {
                    moduleCode: "IS4103",
                    moduleName: "Capstone Project",
                    lectureCode: "L1",
                    handle: (
                        <MDBBtn color="primary" size="sm" onClick={e => { this.addModule(0)}}>
                          Add
                        </MDBBtn>
                    )
                },
                {
                    moduleCode: "IS4103",
                    moduleName: "Capstone Project",
                    lectureCode: "L2",
                    handle: (
                        <MDBBtn color="primary" size="sm">
                          Add
                        </MDBBtn>
                    )
                },
                {
                    moduleCode: "IS4103",
                    moduleName: "Capstone Project",
                    lectureCode: "L3",
                    handle: (
                        <MDBBtn color="primary" size="sm">
                          Add
                        </MDBBtn>
                    )
                }
            ]
        },
        selectedModules: {
            columns: [
                {
                    label: "",
                    field: "check",
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
                },
                {
                    label: "Lecture Code",
                    field: "lectureCode",
                    sort: "asc"
                }
            ],
            rows: [
                {
                    check: <input type="checkbox" style={{'height':'20px', 'width':'20px'}} id="0" />,
                    moduleCode: "IS4103",
                    moduleName: "Capstone Project",
                    lectureCode: "L1"
                },
                {
                    check: <input type="checkbox" style={{'height':'20px', 'width':'20px'}} id="1" />,
                    moduleCode: "IS4103",
                    moduleName: "Capstone Project",
                    lectureCode: "L2"
                },
                {
                    check: <input type="checkbox" style={{'height':'20px', 'width':'20px'}} id="2" />,
                    moduleCode: "IS4103",
                    moduleName: "Capstone Project",
                    lectureCode: "L3"
                }
            ]
        }
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {
        let studentId = this.props.match.params.studentId;
        if (studentId) {
            console.log(studentId);
            // retrieve student & set state for classes

        }
    }

    search() {
        // set state with searched modules, should not be in student's selected list
    }

    addModule(idx) {
        console.log(idx);
        // call api to add module and update searchedModules, selectedModules
        let moduleToAdd = this.state.searchedModules.rows[idx];
        let selectedModules = this.state.selectedModules.rows;
        
        this.setState(prevState => {
            const newSelectedModules = [...prevState.selectedModules];
            let size = newSelectedModules.length;
            newSelectedModules.rows[size].moduleCode = moduleToAdd.moduleCode;
            newSelectedModules.rows[size].moduleName = moduleToAdd.moduleName;
            newSelectedModules.rows[size].lectureCode = moduleToAdd.lectureCode;
            return {selectedModules: newSelectedModules};
        });
    }

    render() {
        let searchedModules = this.state.searchedModules;
        let selectedModules = this.state.selectedModules;
        console.log(searchedModules);
        return (
            <MDBContainer className="mt-3">
                <MDBRow className="py-3">
                    <MDBCol>
                        <h4 className="mb-2">Select Modules</h4>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="py-3">
                    <MDBCol>
                        <form>
                            <div className="form-row align-items-center">
                                <div className="col-auto">
                                    <label>Module Code</label>
                                </div>
                                <div className="col-4">
                                    <input type="text" className="form-control mb-2" id="inlineFormInput" placeholder="" />
                                </div>
                                <div className="col-auto">
                                    <button type="submit" className="btn btn-primary btn-md mt-0">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
                {
                    searchedModules.rows.length > 0 &&
                    <MDBRow className="py-2">
                        <MDBCol md="8" sm="12">
                            <SectionContainer noBorder>
                                <MDBCard className="py-0">
                                    <MDBCardBody>
                                        <MDBTable scrollY>
                                            <MDBTableHead columns={searchedModules.columns} />
                                            <MDBTableBody rows={searchedModules.rows} />
                                        </MDBTable>
                                    </MDBCardBody>
                                </MDBCard>
                            </SectionContainer>
                        </MDBCol>
                    </MDBRow>
                }
                {
                    selectedModules.rows.length > 0 &&
                    <MDBRow>
                        <MDBCol>
                            <MDBRow>
                                <MDBCol>
                                    <h5>Selected Modules<button type="submit" style={{ "float": "right" }} className="btn btn-danger btn-md mt-0 mr-0">Delete</button></h5>
                                    <div className="mb-3"></div>
                                </MDBCol>
                            </MDBRow>

                            <MDBTable bordered btn fixed>
                                <MDBTableHead columns={selectedModules.columns} color="mdb-color lighten-5"/>
                                <MDBTableBody rows={selectedModules.rows} />
                            </MDBTable>
                            <div className="mb-5"/>
                        </MDBCol>
                    </MDBRow>
                }
            </MDBContainer>
        )
    }
}

export default SelectModulesPage;
