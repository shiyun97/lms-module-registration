import React, { Component } from "react";
import axios from "axios";
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import SectionContainer from "../../components/sectionContainer";

//let url = "http://localhost:3001/";
const url = "http://localhost:8080/LMS-war/webresources/"

class AppealViewPage extends Component {

    state = {
        appealDetails: "",
        rejectModal: false,
        index: 0,
        pendingAppeals: "",
        reviewAppeals: "",
        allAppeals: "",
    }
// need retrieve appeal by id

    componentDidMount() {
        var pathname = window.location.pathname, part = pathname.substr(pathname.lastIndexOf('/') + 1);
        this.setState({ index: part })

        axios.get(url + "studentEnrollment/retrievePendingAppeals?userId=1")
            .then(result => {
                this.setState({ pendingAppeals: result.data.appeals })
                //console.log(this.state.pendingAppeals)
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

        axios.get(url + "studentEnrollment/retrieveReviewedAppeals?userId=1")
            .then(result => {
                this.setState({ reviewedAppeals: result.data.appeals, allAppeals: allAppeals.push(pendingAppeals) })
                //console.log(this.state.reviewAppeals)
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
        
    } 

/*     displayAppealDetails = () => {
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
    } */

    render() {
        
        return (
            <MDBContainer style={{ paddingTop: "80px" }}>
                <h3>Appeal Details</h3>
                {/* <MDBRow>{this.displayAppealDetails()}</MDBRow> */}
            </MDBContainer>
        )
    }
}

export default AppealViewPage