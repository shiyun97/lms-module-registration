import React, { Component } from "react";
import { MDBContainer, MDBCol, MDBRow, MDBInput, MDBFormInline, MDBBtn } from "mdbreact";
import axios from "axios";
import SectionContainer from "../../components/sectionContainer";
import { Button } from "@material-ui/core";


class MountModulePageTutorialView extends Component {

    state = {
        tutorialDetails: "",
        disabled: true,
        editSave: "Edit",
        moduleId: "",
        maxEnrollment: "",
        venue: "",
        timing: "",
    }

    componentDidMount() {
        var pathname = window.location.pathname, part = pathname.substr(pathname.lastIndexOf('/') + 1);
        var pathnameSplit = pathname.split('/');
        var modId = pathnameSplit[pathnameSplit.length - 2]
        this.setState({ moduleId: modId })

        axios.get("http://localhost:8080/LMS-war/webresources/ModuleMounting/getAllTutorialByModule?moduleId=" + modId)
            .then(result => {
                this.setState({ tutorialDetails: result.data.tutorials })
                console.log(this.state.tutorialDetails[1])
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    handleOnChange = event => {
        if (event.target.name === "maxEnrollment") {
            this.setState({ maxEnrollment: event.target.value })
        } else if (event.target.name === "venue") {
            this.setState({ venue: event.target.value })

        } else {
            this.setState({ timing: event.target.value })
        }
    }

    displayTutorialDetails = () => {
        if (this.state.tutorialDetails.length !== 0) {
            return (

                <MDBContainer>
                    <h3>Tutorial Details</h3>

                    {this.state.tutorialDetails && this.state.tutorialDetails.map(
                        (tutorials) =>
                            <SectionContainer key={tutorials.tutorialId}>
                                <MDBRow>
                                    <MDBCol sm="4">Tutorial: </MDBCol>
                                    <MDBCol sm="8">
                                        <input
                                            defaultValue={tutorials.tutorialId}
                                            name="tutorialId"
                                            type="number"
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                            className="form-control"
                                            placeholder="Tutorial Id"
                                            disabled={true}
                                        />
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow style={{ paddingTop: "20px" }}>
                                    <MDBCol sm="4">Max Enrollment: </MDBCol>
                                    <MDBCol sm="8">
                                        <input
                                            defaultValue={tutorials.maxEnrollment}
                                            name="maxEnrollment"
                                            type="number"
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                            className="form-control"
                                            placeholder="Maximum Enrollment"
                                            disabled={this.state.disabled}
                                            onChange={this.handleOnChange} />
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow style={{ paddingTop: "20px" }}>
                                    <MDBCol sm="4" style={{ paddingTop: "10px" }}>Venue: </MDBCol>
                                    <MDBCol sm="8">
                                        <input
                                            defaultValue={tutorials.venue}
                                            name="venue"
                                            type="text"
                                            className="form-control"
                                            placeholder="Venue"
                                            disabled={this.state.disabled}
                                            onChange={this.handleOnChange}
                                        />
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow style={{ paddingTop: "20px" }}>
                                    <MDBCol sm="4" style={{ paddingTop: "10px" }}>Timing: </MDBCol>
                                    <MDBCol sm="8">
                                        <input
                                            defaultValue={tutorials.timing}
                                            name="timing"
                                            type="text"
                                            className="form-control"
                                            placeholder="Timing"
                                            disabled={this.state.disabled}
                                            onChange={this.handleOnChange}
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <Button onClick={() => this.delete(tutorials.tutorialId)} color="secondary" variant="contained">Delete</Button>
                                <Button onClick={() => this.editSave(tutorials.tutorialId)} color="primary" variant="contained" >{this.state.editSave}</Button>

                            </SectionContainer>
                    )}
                </MDBContainer>
            )
        } else {
            return (
                <h3> No tutorial</h3>
            )
        }
    }

    delete = (tutorialId) => {
        const { moduleId } = this.state
        axios.delete(`http://localhost:8080/LMS-war/webresources/ModuleMounting/deleteTutorial?moduleId=${moduleId}&tutorialId=${tutorialId}`)
            .then(result => {
                window.location.reload()
                alert("Successfully deleted")
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

    }

    editSave = id => {
        this.setState({ disabled: false, editSave: "Save" })
        if (this.state.editSave === "Save") {
            this.setState({ disabled: true })
            axios.post(`http://localhost:8080/LMS-war/webresources/ModuleMounting/updateTutorial?tutorialId=${id}`, {
                maxEnrollment: this.state.maxEnrollment,
                venue: this.state.venue,
                timing: this.state.timing
            })
                .then(result => {
                    console.log(result.data)
                    alert("Updated")
                    this.props.history.go(-1)
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });
        }
    }

    render() {
        return (
            <MDBContainer style={{ paddingTop: "80px" }}>
                <MDBRow>{this.displayTutorialDetails()}</MDBRow>
            </MDBContainer >)
    }
}

export default MountModulePageTutorialView;