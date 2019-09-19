import React, { Component } from "react";
import { MDBDataTable, MDBInputGroup, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from "mdbreact";
import data from '../test/users_data'

const widerData = {
    columns: [...data().columns.map(col => {
        col.width = 200;
        return col;
    })], rows: [...data().rows]
}

class UsersManagementPage extends Component {

    state = {
        modal1: false
    };

    toggle = nr => () => {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    render() {
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
                                <MDBDataTable striped bordered hover scrollX scrollY maxHeight="400px" data={widerData} pagesAmount={4} />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default UsersManagementPage;
