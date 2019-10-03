import React, { Component } from "react";
import { MDBContainer, MDBBtn } from 'mdbreact';
import axios from "axios";
import { MDBDataTable } from 'mdbreact';
import { Button } from "@material-ui/core";
import { observer, inject } from 'mobx-react'


const url = "http://localhost:8080/LMS-war/webresources/";

@inject('dataStore')
@observer
class MountModulePage extends Component {
    state = {
        allModules: "",
    };

    componentDidMount() {
        axios.get(url + "ModuleMounting/getAllModule")
            .then(result => {
                this.setState({ allModules: result.data.module })
            })
            .catch(error => {
                alert("Error")
                console.error("error in axios " + error);
            });
    }

    displayAllModules = () => {
        const data = {
            columns: [
                {
                    label: 'Code',
                    field: 'code',
                    sort: 'asc',
                },
                {
                    label: 'Module Title',
                    field: 'title',
                    sort: 'asc',
                },
                {
                    label: 'Semester Offered',
                    field: 'semesterOffered',
                    sort: 'asc',
                },
                {
                    label: 'Year Offered',
                    field: 'yearOffered',
                    sort: 'asc',
                },
                {
                    label: 'Faculty',
                    field: 'faculty',
                    sort: 'asc',
                },
                {
                    label: 'Department',
                    field: 'department',
                    sort: 'asc',
                },
                {
                    label: 'Assigned Teacher',
                    field: 'assignedTeacher',
                    sort: 'asc',
                },
                {
                    label: 'Details',
                    field: 'button',
                },
            ],
            rows:
                this.rowsData()
        }

        if (this.state.allModules.length !== 0) {
            return (
                <MDBDataTable
                    style={{ textAlign: "center", verticalAlign: "center" }}
                    autoWidth={true}
                    bordered
                    hover
                    data={data}
                    responsive
                    responsiveSm
                    responsiveMd
                    responsiveLg
                    responsiveXl
                    small
                    theadColor="rgba-blue-slight"
                />
            )
        } else {
            return (
                <h5>Select "Mount Module" to create new modules</h5>
            )
        }
    }

    rowsData = () => {
        let modules = [];
        this.state.allModules && this.state.allModules.map((eachModule, index) =>
            modules.push({
                code: eachModule.code,
                title: eachModule.title,
                semesterOffered: eachModule.semesterOffered,
                yearOffered: eachModule.yearOffered,
                faculty: eachModule.faculty,
                department: eachModule.department,
                assignedTeacher: eachModule.assignedTeacher.firstName + " " + eachModule.assignedTeacher.lastName,
                button: this.showButton(),
                clickEvent: () => this.handleRowClick(eachModule.moduleId)
            })
        )
        return modules
    }

    handleRowClick = index => {
        this.props.dataStore.setMountSingleModuleIndex(index)
        console.log("table is: " + index)
        let path = "mountModule/form/" + index;
        this.state.path.push(path)
    }

    showButton = () => {
        return (
            <div>
                <Button size="small" color="primary">View</Button>
            </div>
        )
    }

    handleMountModule = event => {
        let path = `form-create/`;
        this.props.history.push(path);
    }

    handleMountTutorial = event => {
        let path = `mountModule/tutorial-create/`;
        this.props.history.push(path);
    }

    render() {
        return (
            <MDBContainer center="true" style={{ paddingTop: "40px" }}>
                <MDBBtn color="primary" onClick={this.handleMountModule}>Mount Module</MDBBtn>
                {this.displayAllModules()}
            </MDBContainer>
        );
    }
}

export default MountModulePage;