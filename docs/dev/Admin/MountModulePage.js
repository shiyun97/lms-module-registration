import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBBtn } from 'mdbreact';
import axios from "axios";
import { MDBDataTable } from 'mdbreact';
import { Button } from "@material-ui/core";

let url = "http://localhost:3001/";

class MountModulePage extends Component {
    state = {
        allModules: "",
        moduleCode: "",
        moduleTitle: "",
        moduleSemester: 0,
        moduleYear: "",
        moduleFaculty: "",
        moduleDepartment: "",
        moduleMaxCapacity: "",
        moduleProfessor: "",
        open: false,
        viewModDetailsIndex: 0,
        modal: false
    };

    componentDidMount() {
        axios.get(url + "modules")
            .then(result => {
                this.setState({ allModules: result.data })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    displayAllModules = () => {
        //console.log(this.state.allModules)
        const data = {
            columns: [
                /*              {
                                 label: 'Id',
                                 field: 'id',
                                 sort: 'asc',
                             }, */
                {
                    label: 'Code',
                    field: 'code',
                    sort: 'asc',
                },
                {
                    label: 'Module Title',
                    field: 'moduleTitle',
                    sort: 'asc',
                },
                {
                    label: 'Semester',
                    field: 'semester',
                    sort: 'asc',
                },
                {
                    label: 'Year',
                    field: 'year',
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
                /*  {
                     label: 'Max Capacity',
                     field: 'max capacity',
                     sort: 'asc',
                 },*/
                {
                    label: 'Professor',
                    field: 'professor',
                    sort: 'asc',
                },
                {
                    label: 'Details',
                    field: 'button',
                },
            ],
            rows:
                this.rowsData()
/*                 this.state.allModules
 */        }


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
            )}

    rowsData = () => {
        let modules = [];
        this.state.allModules && this.state.allModules.map((eachModule, index) =>
            modules.push({
                /*                 id: eachModule.id, 
                 */
                code: eachModule.moduleCode,
                moduleTitle: eachModule.moduleName,
                semester: eachModule.semester,
                year: eachModule.year,
                faculty: eachModule.faculty,
                department: eachModule.department,
                /* maxCapacity: eachModule.maxCapacity,*/
                professor: eachModule.professor,
                button: this.showButton(),
                clickEvent: () => this.handleRowClick(index)
            })
        )
        return modules
    }

    handleRowClick = index => {
        //create a new page. go to form edit page. 
        console.log(index)
        let path = `form/` + index;
        this.props.history.push(path);
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

    render() {
        return (
            <MDBContainer center="true" style={{ paddingTop: "40px" }}>
                <MDBBtn color="primary" onClick={this.handleMountModule}>Mount Module</MDBBtn>
                <MDBRow>{this.displayAllModules()}</MDBRow>
            </MDBContainer>
        );
    }
}

export default MountModulePage;