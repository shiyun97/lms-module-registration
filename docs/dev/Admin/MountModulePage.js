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
                    width: 150
                },
                {
                    label: 'Module Title',
                    field: 'title',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Semester Offered',
                    field: 'semesterOffered',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Year Offered',
                    field: 'yearOffered',
                    sort: 'asc',
                    width: 150

                },
                {
                    label: 'Faculty',
                    field: 'faculty',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Department',
                    field: 'department',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Assigned Teacher',
                    field: 'assignedTeacher',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Details',
                    field: 'button',
                    width: 150
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
        let path = "mountModule/form/" + index;
        this.props.history.push(path)
    }

    showButton = () => {
        return (
            <div>
                <Button size="small" color="primary">View</Button>
            </div>
        )
    }

    handleMountModule = event => {
        let path = `mountModule/form-create`;
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