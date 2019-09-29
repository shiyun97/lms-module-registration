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
import 'babel-polyfill';
import { observer, inject } from 'mobx-react'

const classColumns = [
    {
        label: "Class",
        field: "classId",
        sort: "asc"
    },
    {
        label: "Details",
        field: "details",
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
]

@inject('dataStore')
@observer
class MyClassesPage extends Component {

    state = {
        modules: []
    }

    componentDidMount() {
        this.initPage();
    }

    async initPage() {
        let studentId = this.props.match.params.studentId;
        if (studentId) {
            console.log(studentId);
            // retrieve student & set state for classes
            let arr = [];
            await axios
                .get("http://localhost:8080/LMS-war/webresources/studentEnrollment/retrieveStudentTutorials/" + studentId,{ validateStatus: false })
                .then(result => {
                    console.log(result)
                    let data = result.data.tutorials;
                    Object.keys(data).forEach(function (key) {
                        let classesArr = [];
                        let lecture = {
                            classId: 1,
                            details: data[key].module.lectureDetails,
                            type: "Lecture",
                            credits: data[key].module.creditUnit,
                            enrollStatus: "Enrolled"
                        }
                        classesArr.push(lecture);
                        let tutorial = {
                            classId: data[key].tutorialId,
                            details: data[key].timing,
                            type: "Tutorial",
                            credits: "-",
                            enrollStatus: "Enrolled"
                        }
                        classesArr.push(tutorial);
                        /*let classes = data[key].classes;
                        Object.keys(classes).forEach(function (key2) {
                            let tempClass = {
                                classCode: classes[key2].classCode,
                                type: classes[key2].type,
                                credits: classes[key2].credits,
                                enrollStatus: classes[key2].enrollStatus
                            }
                            classesArr.push(tempClass);
                        })*/
                        let tempModule = {
                            moduleCode: data[key].module.code,
                            moduleName: data[key].module.title,
                            classes: {
                                columns: classColumns,
                                rows: classesArr
                            }
                        }
                        arr.push(tempModule);
                    });
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });

            // get modules without tutorials
            axios
                .get("http://localhost:8080/LMS-war/webresources/studentEnrollment/retrieveStudentModules/" + studentId,{ validateStatus: false })
                .then(result => {
                    console.log(result)
                    let data = result.data.modules;
                    Object.keys(data).forEach(function (key) {
                        let classesArr = [];
                        let exist = false;
                        for (var i=0; i<arr.length && exist == false; i++) {
                            if (arr[i].moduleCode == data[key].code) {
                                exist = true
                            }
                        }
                        // module with no tutorial
                        if (exist == false) {
                            let lecture = {
                                classId: 1,
                                details: data[key].lectureDetails,
                                type: "Lecture",
                                credits: data[key].creditUnit,
                                enrollStatus: "Enrolled"
                            }
                            classesArr.push(lecture);
                            let tutorial = {
                                classId: "-",
                                details: "-",
                                type: "Tutorial",
                                credits: "-",
                                enrollStatus: "Not Enrolled"
                            }
                            classesArr.push(tutorial);
                            let tempModule = {
                                moduleCode: data[key].code,
                                moduleName: data[key].title,
                                classes: {
                                    columns: classColumns,
                                    rows: classesArr
                                }
                            }
                            arr.push(tempModule);
                        }
                    });
                    this.setState({
                        modules: arr
                    });
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });
        }
    }

    render() {
        let modules = this.state.modules;
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
                                <ModuleListItem key={module.moduleCode}
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
