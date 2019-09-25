import React, { Component } from "react";
import SectionContainer from "../../components/sectionContainer";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from 'mdbreact';
import axios from "axios";
import { MDBDataTable } from 'mdbreact';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";

var url = "http://localhost:3001/";

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
            />)
    }

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

    handleRowClick = index => { //open up dialog page to show the details
    //crete a nwe page. go to form edit page. 
    }

    showButton = () => {
        return (
            <div>
                <Button size="small" color="primary">View</Button>
            </div>)
    }

    handleMountModule = event => {
        this.setState({
            modal: !this.state.modal
        });
    }

    submitHandler = event => {
        console.log("submit form")
        event.preventDefault();
        event.target.className += " was-validated";
    };

    changeHandler = event => {
        console.log(event.target.value)
        this.setState({ moduleCode: event.target.value });
    };

    mountModuleForm = () => {
        return (
            <div>
                <form
                    className="needs-validation"
                    onSubmit={this.submitHandler}
                >
                    <MDBRow>
                        {/*FIXME: unable to validate form */}
                        <MDBCol md="12">
                            <label htmlFor="formModuleCode" className="grey-text">Module Code</label>
                            <input
                                value={this.state.moduleCode}
                                name="moduleCode"
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                placeholder="Enter Module Code"
                                required
                                id="formModuleCode"
                            />
                            <div className="invalid-feedback">
                                Next step
              </div>
                            <div className="valid-feedback">Looks good!</div>

                        </MDBCol>{/* 
                        <MDBCol md="12">
                            <label className="grey-text">Module Title</label>
                            <input
                                value={this.state.moduleTitle}
                                name="moduleTitle"
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                placeholder="Enter Module Title"
                                required
                            />
                        </MDBCol>
                        <MDBCol md="12">
                            <label className="grey-text">Module Semester</label>
                            <input
                                value={this.state.moduleSemester}
                                name="moduleSemester"
                                onChange={this.changeHandler}
                                type="number"
                                className="form-control"
                                placeholder="Enter Module Semester"
                                required
                            />
                        </MDBCol>
                        <MDBCol md="12">
                            <label className="grey-text">Module Year</label>
                            <input
                                value={this.state.moduleYear}
                                name="moduleYear"
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                placeholder="Enter Module Year"
                                required
                            />
                        </MDBCol>
                        <MDBCol md="12">
                            <label className="grey-text">Module Faculty</label>
                            <input
                                value={this.state.moduleFaculty}
                                name="moduleFaculty"
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                placeholder="Enter Module Faculty"
                                required
                            />
                        </MDBCol>
                        <MDBCol md="12">
                            <label className="grey-text">Module Department</label>
                            <input
                                value={this.state.moduleDepartment}
                                name="moduleDepartment"
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                placeholder="Enter Module Department"
                                required
                            />
                        </MDBCol>
                        <MDBCol md="12">
                            <label className="grey-text">Module Capacity</label>
                            <input
                                value={this.state.moduleMaxCapacity}
                                name="moduleCapacity"
                                onChange={this.changeHandler}
                                type="number"
                                className="form-control"
                                placeholder="Enter Module Capacity"
                                required
                            />
                        </MDBCol>
                        <MDBCol md="12">
                            <label className="grey-text">Module Professor</label>
                            <input
                                value={this.state.moduleProfessor}
                                name="moduleProfessor"
                                onChange={this.changeHandler}
                                type="text"
                                className="form-control"
                                placeholder="Enter Module Professor"
                                required
                            />
                        </MDBCol>

 */}
                    </MDBRow>
                </form>
            </div>
        )
    }

    render() {
        return (
            <MDBContainer center="true" style={{ paddingTop: "40px" }}>
                {/* <MDBBtn color="primary" onClick={this.handleMountModule}>Mount Module</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.handleMountModule}>
                    <MDBModalHeader toggle={this.handleMountModule}>Mount Module</MDBModalHeader>
                    <MDBModalBody>
                        {this.mountModuleForm()}
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.handleMountModule}>Cancel</MDBBtn>
                        <MDBBtn color="primary">Create</MDBBtn>
                    </MDBModalFooter>
                </MDBModal> */}
                <MDBRow>{this.displayAllModules()}</MDBRow>
            </MDBContainer>
        );
    }
}

export default MountModulePage;

