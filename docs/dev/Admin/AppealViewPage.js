import React, { Component } from "react";
import axios from "axios";
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import SectionContainer from "../../components/sectionContainer";
import { Button } from "@material-ui/core";


let url = "http://localhost:3001/";

class AppealViewPage extends Component {

    state = {
        appealDetails: "",
        rejectModal: false,
    }

    componentDidMount() {
        var loc = this.props.history.location.pathname
        var index = loc.lastIndexOf('/');
        if (index !== -1) {
            var newStr = loc.substring(index + 1);
        }
        this.setState({ index: newStr })

        axios.get(url + "allAppeals")
            .then(result => {
                this.setState({ appealDetails: result.data[newStr] })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    displayAppealDetails = () => {
        return (
            <MDBContainer>
                <SectionContainer>

                    <MDBRow>
                        <MDBCol sm="4">Student: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                // defaultValue={this.state.moduleDetails.moduleCode}
                                name="student"
                                type="text"
                                className="form-control"
                                disabled={true}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">Appeal Date: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.appealDetails.date}
                                name="date"
                                type="text"
                                className="form-control"
                                disabled={true}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">Appeal Type: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.appealDetails.value}
                                name="date"
                                type="text"
                                className="form-control"
                                disabled={true}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">Appeal Module: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.appealDetails.appealModule}
                                name="appealModule"
                                type="text"
                                className="form-control"
                                disabled={true}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">Appeal Reason: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.appealDetails.appealReason}
                                name="date"
                                type="text"
                                className="form-control"
                                disabled={true}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">
                        </MDBCol>
                        <MDBCol sm="8">
                            <MDBBtn color="success" onClick={this.handleAccept}>Accept</MDBBtn>
                            <MDBBtn color="red" onClick={this.handleReject}>Reject</MDBBtn>
                            <MDBModal isOpen={this.state.rejectModal} toggle={this.handleReject}>
                                <MDBModalHeader toggle={this.rejectModal}>Reject Appeal</MDBModalHeader>
                                <MDBModalBody>
                                    <textarea
                                        className="form-control"
                                        rows="5"
                                        placeholder="Enter reject reason"
                                        required
                                    />
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="secondary" onClick={this.handleReject}>Cancel</MDBBtn>
                                    <MDBBtn color="primary" onClick={this.submitRejectReason}>Submit</MDBBtn>
                                </MDBModalFooter>
                            </MDBModal>
                        </MDBCol>
                    </MDBRow>

                </SectionContainer>
            </MDBContainer>

        )
    }

    handleAccept = event => {
        console.log("accept")
    }

    handleReject = () => {
        this.setState({ rejectModal: !this.state.rejectModal });
    }

    submitRejectReason = event => {
        console.log("submit reject reason")
    }

    render() {
        return (
            <MDBContainer style={{ paddingTop: "80px" }}>
                <h3>Appeal Details</h3>
                <MDBRow>{this.displayAppealDetails()}</MDBRow>
            </MDBContainer>
        )
    }
}

export default AppealViewPage