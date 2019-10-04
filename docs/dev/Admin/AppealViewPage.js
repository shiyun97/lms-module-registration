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
    }

    componentDidMount() {
        var pathname = window.location.pathname, part = pathname.substr(pathname.lastIndexOf('/') + 1);
        this.setState({ index: part })

        axios.get(url + "studentEnrollment/getAppealById/" + part)
            .then(result => {
                this.setState({ appealDetails: result.data })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    handleOnChange = event => {
        this.setState({ reason: event.target.value })
    }

    displayAppealDetails = () => {
        const { appealDetails } = this.state
        console.log(appealDetails.student)
        return (
            <MDBContainer>
                <SectionContainer>

                    <MDBRow>
                        <MDBCol sm="4"><h6>Appeal display:</h6> </MDBCol>
                        <MDBCol sm="8">
                            <h6>{appealDetails.createDete}</h6>
                        </MDBCol>
                    </MDBRow>
                    {/*                         <MDBRow>
                            <MDBCol sm="4">Student: </MDBCol>
                            <MDBCol sm="8">
                                <h3>{appealDetails.student[0].firstName + appealDetails.student[0].lastName}</h3>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol sm="4">Module: </MDBCol>
                            <MDBCol sm="8">
                                <h3>{appealDetails.module[0].code}</h3>
                            </MDBCol>
                        </MDBRow> */}

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
                                    <MDBBtn color="secondary" onClick={this.cancel}>Cancel</MDBBtn>
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
        const { appealDetails, reason } = this.state
        console.log(reason)
        console.log(appealDetails)

        //FIXME:
        axios.post(`http://localhost:8080/LMS-war/webresources/studentEnrollment/reviewAppeal?userId=1&appealId=${appealDetails.appealId}8&result=accept&detail=${reason}`)
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
        //axiost post to reject
        const { index, reason } = this.state

        axios.post(`http://localhost:8080/LMS-war/webresources/studentEnrollment/reviewAppeal?userId=1&appealId=${index}8&result=reject&detail=${reason}`)
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