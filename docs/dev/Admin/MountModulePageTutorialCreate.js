import React, { Component } from "react";
import { MDBContainer, MDBCol, MDBRow, MDBInput, MDBFormInline } from "mdbreact";
import SectionContainer from "../../components/sectionContainer";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import { observer, inject } from 'mobx-react'

const url = "http://localhost:8080/LMS-war/webresources/";

@inject('dataStore')
@observer
class MountModulePageTutorialCreate extends Component {

    state = {
        moduleCode: "",
        moduleId: 0,
        maxEnrollment: 0,
        time: "",
        venue: "",
    }

    componentDidMount() {
        var pathname = window.location.pathname, part = pathname.substr(pathname.lastIndexOf('/') + 1);
        var pathnameSplit = pathname.split('/');
        var modId = pathnameSplit[pathnameSplit.length - 2]
        console.log(modId)
        this.setState({ moduleId: modId })

        axios.get(url + "ModuleMounting/getModule/" + modId)
            .then(result => {
                this.setState({ moduleCode: result.data.code })
                console.log(this.state.moduleCode)
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    handleOnChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    displayMountModuleTutorialForm = () => {

        return (
            <MDBContainer>
                <SectionContainer>
                    <MDBRow>
                        <MDBCol sm="4">Maximum Enrollment: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                value={this.state.maxEnrollment}
                                name="maxEnrollment"
                                type="number"
                                pattern="[0-9]*"
                                inputMode="numeric"
                                className="form-control"
                                placeholder="Maximum Enrollment"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">Time: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                value={this.state.time}
                                name="time"
                                type="text"
                                className="form-control"
                                placeholder="Time"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">Venue: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                value={this.state.venue}
                                name="venue"
                                type="text"
                                className="form-control"
                                placeholder="Venue"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>
                            <Button onClick={this.cancel}>Cancel</Button>
                        </MDBCol>
                        <MDBCol sm="8">

                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>
                            <Button onClick={this.create}>Create</Button>
                        </MDBCol>
                        <MDBCol sm="8">

                        </MDBCol>
                    </MDBRow>

                </SectionContainer>
            </MDBContainer>
        )
    }
    cancel = event => {
        this.props.history.go(-1)
    }

    create = event => {
        console.log(this.state.time)
        console.log(this.state.venue)
        console.log(this.state.maxEnrollment)

        const { time, venue, maxEnrollment } = this.state

        axios.post(url + `ModuleMounting/mountTutorial?moduleId=${this.state.moduleId}`, {maxEnrollment: maxEnrollment, venue: venue, timing: time})
            .then(result => {
                console.log(result.data);
                alert("Successful mounted tutorial");
                //FIXME: go to previous page
            })
            .catch(error => {
                console.error("error in axios " + error);
            });


    }


    render() {

        return (

            <MDBContainer style={{ paddingTop: "80px" }}>

                <h3>Mount Tutorial for {this.state.moduleCode} </h3>
                <MDBRow>{this.displayMountModuleTutorialForm()}</MDBRow>
            </MDBContainer>
        )
    }
}

export default MountModulePageTutorialCreate