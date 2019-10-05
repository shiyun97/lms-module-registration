import React, { Component } from "react";
import axios from "axios";
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import SectionContainer from "../../components/sectionContainer";

const url = "http://localhost:8080/LMS-war/webresources/"

class AppealViewPage extends Component {

    state = {
        appealDetails: "",
        rejectModal: false,
        index: "",
        pendingAppeals: "",
        reviewAppeals: "",
        allAppeals: "",
        reason: "",
        lastName: "",
        firstName: "",
        moduleCode: ""
    }

    componentDidMount() {
        var pathname = window.location.pathname, part = pathname.substr(pathname.lastIndexOf('/') + 1);
        this.setState({ index: part })

        axios.get(url + "studentEnrollment/getAppealById/" + part)
            .then(result => {
                this.setState({
                    appealDetails: result.data,
                    lastName: result.data.student.lastName,
                    firstName: result.data.student.firstName,
                    moduleCode: result.data.module.code
                })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    handleOnChange = event => {
        this.setState({ reason: event.target.value })
    }

    displayAppealDetails = () => {
        const { appealDetails, lastName, firstName, moduleCode } = this.state
        return (
            <MDBContainer>
                <SectionContainer>

                    <MDBRow>
                        <MDBCol sm="4"><h6>Appeal display:</h6> </MDBCol>
                        <MDBCol sm="8">
                            <h6>{appealDetails.createDate}</h6>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol sm="4"><h6>Student:</h6></MDBCol>
                        <MDBCol sm="8">
                            <h6>{firstName + " " + lastName}</h6>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                            <MDBCol sm="4"><h6>Module: </h6> </MDBCol>
                            <MDBCol sm="8">
                                <h6>{moduleCode}</h6>
                            </MDBCol>
                        </MDBRow>  

                    <MDBRow>
                        <MDBCol sm="4"><h6>Status: </h6></MDBCol>
                        <MDBCol sm="8">
                            <h6>{appealDetails.status}</h6>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol sm="4"><h6>Reason:</h6></MDBCol>
                        <MDBCol sm="8">
                            <h6>{appealDetails.reason}</h6>
                        </MDBCol>
                    </MDBRow>


                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">
                        </MDBCol>
                        <MDBCol sm="8">
                            {this.showAcceptRejectButton()}
                            {/*FIXME: only show when it is pending */}
                            {/* <MDBBtn color="success" onClick={this.handleAccept}>Accept</MDBBtn>
                            <MDBBtn color="red" onClick={this.handleReject}>Reject</MDBBtn>
                            <MDBModal isOpen={this.state.rejectModal} toggle={this.handleReject}>
                                <MDBModalHeader toggle={this.rejectModal}>Reject Appeal</MDBModalHeader>
                                <MDBModalBody>
                                    <textarea
                                        className="form-control"
                                        rows="5"
                                        placeholder="Enter reject reason"
                                        required
                                        onChange={this.handleOnChange}
                                    />
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="secondary" onClick={this.handleReject}>Cancel</MDBBtn>
                                    <MDBBtn color="primary" onClick={this.submitRejectReason}>Submit</MDBBtn>
                                </MDBModalFooter>
                            </MDBModal>
                        </MDBCol> */}
                        </MDBCol>
                    </MDBRow>

                </SectionContainer>
            </MDBContainer>

        )
    }

    showAcceptRejectButton = () => {
        if (this.state.appealDetails.status==="Pending") {
            return (
                <MDBContainer>
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
                                        onChange={this.handleOnChange}
                                    />
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn color="secondary" onClick={this.handleReject}>Cancel</MDBBtn>
                                    <MDBBtn color="primary" onClick={this.submitRejectReason}>Submit</MDBBtn>
                                </MDBModalFooter>
                            </MDBModal>
                </MDBContainer>
            )
        } else {
            return null
        }
    }

    handleAccept = event => {
        const { index, reason } = this.state
        let userId = localStorage.getItem("userId")

        axios.post(`http://localhost:8080/LMS-war/webresources/studentEnrollment/reviewAppeal?userId=${userId}&appealId=${index}&result=accept&detail=${reason}`)
            .then(result => {
                this.props.history.go(-1)
                alert("Successful accepted");
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    handleReject = () => {
        this.setState({ rejectModal: !this.state.rejectModal });
    }

    submitRejectReason = event => {
        const { index, reason } = this.state
        let userId = localStorage.getItem("userId")

        axios.post(`http://localhost:8080/LMS-war/webresources/studentEnrollment/reviewAppeal?userId=${userId}&appealId=${index}&result=reject&detail=${reason}`)
            .then(result => {
                this.props.history.go(-1)
                alert("Successful rejected");
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
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