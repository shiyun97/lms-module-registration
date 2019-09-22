import React, { Component } from "react";
import { MDBDataTable, MDBInputGroup, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from "mdbreact";
import axios from "axios";

function goToProfilePage(userId) {
    console.log(userId);
}

class UsersManagementPage extends Component {

    state = {
        modal1: false,
        columns: [
            {
                "label": "First Name",
                "field": "firstName",
                "width": 150,
                "attributes": {
                    "aria-controls": "DataTable",
                    "aria-label": "Name"
                }
            },
            {
                "label": "Last Name",
                "field": "lastName",
                "width": 150,
                "attributes": {
                    "aria-controls": "DataTable",
                    "aria-label": "Name"
                }
            },
            {
                "label": "Gender",
                "field": "gender",
                "width": 100
            },
            {
                "label": "Email",
                "field": "email",
                "width": 270
            },
            {
                "label": "Password",
                "field": "password",
                "width": 200
            },
            {
                "label": "User Role",
                "field": "userRole",
                "width": 100
            },
            {
                "label": "Faculty",
                "field": "faculty",
                "width": 100
            }
        ],
        rows: [{ text: "Retrieving data..." }],
        status: "retrieving"
    };


    componentDidMount() {
        axios
            .get("http://localhost:3001/users")
            .then(result => {
                this.setState({
                    rows: result.data.users,
                    status: "done"
                });
            })
            .catch(error => {
                this.setState({
                    status: "error"
                });
                console.error("error in axios " + error);
            });
    }

    toggle = nr => () => {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    renderUserTable = (tableData) => {
        return (
            <MDBContainer className="mt-3">
                <MDBRow style={{ paddingTop: 60 }}>
                    <MDBCol md="8">
                        <h2 className="font-weight-bold">
                            Users Management
                </h2>
                    </MDBCol>
                    <MDBCol md="4" align="right">
                        <MDBBtn onClick={this.toggle(1)} color="primary">Create User</MDBBtn>
                    </MDBCol>
                    <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)}>
                        <MDBModalHeader
                            className="text-center"
                            titleClass="w-100 font-weight-bold"
                            toggle={this.toggle(1)}
                        >
                            Create User
                        </MDBModalHeader>
                        <MDBModalBody>
                            <form className="mx-3 grey-text">
                                <MDBRow>
                                    <MDBCol md="6" className="mt-4">
                                        <label className="grey-text">
                                            First Name
                                        </label>
                                        <input type="text" className="form-control" />
                                    </MDBCol>
                                    <MDBCol md="6" className="mt-4">
                                        <label className="grey-text">
                                            Last Name
                                        </label>
                                        <input type="text" className="form-control" />
                                    </MDBCol>
                                    <br />
                                    <MDBCol md="12" className="mt-4">
                                        <label className="grey-text">
                                            Email
                                        </label>
                                        <input type="text" className="form-control" />
                                    </MDBCol>
                                    <MDBCol md="12" className="mt-4">
                                        <label className="grey-text">
                                            Password
                                        </label>
                                    </MDBCol>
                                    <MDBCol md="6">
                                        <input type="text" className="form-control" />
                                    </MDBCol>
                                    <MDBCol md="6" align="right">
                                        <MDBBtn outline size="sm" color="primary">Generate Password</MDBBtn>
                                    </MDBCol>
                                    <MDBCol md="12" className="mt-4">
                                        <label className="grey-text">
                                            Gender
                                        </label>
                                        <input type="text" className="form-control" />
                                    </MDBCol>
                                    <MDBCol md="6" className="mt-4">
                                        <label className="grey-text">
                                            Faculty
                                        </label>
                                        <input type="text" className="form-control" />
                                    </MDBCol>
                                    <MDBCol md="6" className="mt-4">
                                        <MDBInputGroup
                                            style={{ paddingTop: 32 }}
                                            containerClassName="mb-3"
                                            prepend="User Role"
                                            inputs={
                                                <select className="browser-default custom-select">
                                                    <option value="0">Choose...</option>
                                                    <option value="1">Teacher</option>
                                                    <option value="2">Student</option>
                                                    <option value="3">Admin</option>
                                                </select>
                                            }
                                        />
                                    </MDBCol>
                                </MDBRow>
                            </form>
                        </MDBModalBody>
                        <MDBModalFooter className="justify-content-center">
                            <MDBRow>
                                <MDBCol md="6">
                                    <MDBBtn onClick={this.toggle(1)} color="grey">Cancel</MDBBtn>
                                </MDBCol>
                                <MDBCol md="6">
                                    <MDBBtn onClick={this.toggle(1)} color="primary">Create</MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBRow>
                <MDBRow className="py-3">
                    <MDBCol md="12">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBDataTable striped bordered hover scrollX scrollY maxHeight="400px" data={tableData} pagesAmount={4} />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }

    renderTableWithMessage = (message) => {
        const data = () => ({ columns: this.state.columns, rows: [{ label: message }] })

        const tableData = {
            columns: [...data().columns.map(col => {
                col.width = 200;
                return col;
            })], rows: [...data().users]
        }
        return (
            <MDBContainer className="mt-3">
                <MDBRow style={{ paddingTop: 60 }}>
                    <MDBCol md="12">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBDataTable striped bordered hover scrollX scrollY maxHeight="400px" data={tableData} pagesAmount={4} />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }

    renderAwaiting = () => {
        return (
            <MDBContainer className="mt-3">
                <MDBRow style={{ paddingTop: 60 }} align="center">
                    <MDBCol md="12">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }

    render() {
        const data = () => ({ columns: this.state.columns, rows: this.state.rows })
        // clickEvent: () => goToProfilePage(1)

        const widerData = {
            columns: [...data().columns.map(col => {
                col.width = 200;
                return col;
            })], rows: [...data().rows]
        }

        if (this.state.status === "retrieving")
            return this.renderAwaiting();
        else if (this.state.status === "error")
            return this.renderTableWithMessage("Error in Retrieving Data. Please try again later.");
        else if (this.state.status === "done")
            return this.renderUserTable(widerData);
        else
            return this.renderTableWithMessage("No data found.");
    }
}

export default UsersManagementPage;
