import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";

class MyClassesPage extends Component {

    state = {
        modules: [
            {
                moduleId: "1",
                moduleName: "Module 1",
                moduleCode: "IS4103",
                classes: {
                    columns: [
                        {
                            label: "Class",
                            field: "classSlot",
                            sort: "asc"
                        },
                        {
                            label: "Activity",
                            field: "type",
                            sort: "asc"
                        },
                        {
                            label: "Units",
                            field: "credits",
                            sort: "asc"
                        },
                        {
                            label: "Status",
                            field: "enrollStatus",
                            sort: "asc"
                        },
                    ],
                    rows: [
                        {
                            classSlot: "L1",
                            type: "Lecture",
                            credits: 4.00,
                            enrollStatus: "Enrolled"
                        },
                        {
                            classSlot: "T1",
                            type: "Tutorial",
                            credits: "-",
                            enrollStatus: "Enrolled"
                        }
                    ]
                }
            },
            {
                moduleId: "2",
                moduleName: "Module 2",
                moduleCode: "IS3103",
                classes: {
                    columns: [
                        {
                            label: "Class",
                            field: "classSlot",
                            sort: "asc"
                        },
                        {
                            label: "Activity",
                            field: "type",
                            sort: "asc"
                        },
                        {
                            label: "Units",
                            field: "credits",
                            sort: "asc"
                        },
                        {
                            label: "Status",
                            field: "enrollStatus",
                            sort: "asc"
                        },
                    ],
                    rows: [
                        {
                            classSlot: "L2",
                            type: "Lecture",
                            credits: 4.00,
                            enrollStatus: "Enrolled"
                        },
                        {
                            classSlot: "T2",
                            type: "Tutorial",
                            credits: "-",
                            enrollStatus: "-"
                        }
                    ]
                },
            }
        ],
        
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

    render() {
        let modules = this.state.modules;
        console.log(modules);
        return (
                <MDBContainer className="mt-3">
                    <MDBRow className="py-3">
                        <MDBCol>
                            <h4 className="mb-4">View My Classes</h4>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="py-3">
                        <MDBCol>
                        {
                            modules.length == 0 && <h6>No Classes to show</h6>
                        }
                        {
                            modules.length > 0 &&
                            modules.map((module) => (
                                <ModuleListItem key={module.moduleId}
                                module={module}></ModuleListItem>
                            ))
                        }
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
        )
    }
}

class ModuleListItem extends Component {

    render() {
        let module = this.props.module;
        return <MDBRow>
            <MDBCol>
                <h5>{module.moduleCode + " " + module.moduleName}</h5>
                <hr className="my-3" />
                <MDBTable responsive bordered>
                    <MDBTableHead columns={module.classes.columns} color="mdb-color lighten-5"/>
                    <MDBTableBody rows={module.classes.rows} />
                </MDBTable>
                <div className="mb-4"></div>
            </MDBCol>
        </MDBRow>
    }
}

export default MyClassesPage;
