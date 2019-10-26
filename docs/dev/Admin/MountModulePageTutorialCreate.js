import React, { Component } from "react";
import { MDBContainer, MDBCol, MDBRow } from "mdbreact";
import SectionContainer from "../../components/sectionContainer";
import axios from "axios";
import { Button } from "@material-ui/core";
import { observer, inject } from 'mobx-react'

const API = "http://localhost:8080/LMS-war/webresources/";

@inject('dataStore')
@observer
class MountModulePageTutorialCreate extends Component {

    state = {
        moduleCode: "",
        moduleId: 0,
        maxEnrollment: 0,
        startTime: "",
        endTime: "",
        tutorialDay: "",
        venue: "",
        venueList: ""
    }

    componentDidMount() {
        var pathname = window.location.pathname, part = pathname.substr(pathname.lastIndexOf('/') + 1);
        var pathnameSplit = pathname.split('/');
        var modId = pathnameSplit[pathnameSplit.length - 2]
        this.setState({ moduleId: modId })

        axios.get(`${API}ModuleMounting/getModule/${modId}`)
            .then(result => {
                this.setState({ moduleCode: result.data.code })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

        //get all venues
        axios.get(`${API}ModuleMounting/getAllVenue`)
            .then(result => {
                this.setState({ venueList: result.data.venueList })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    handleOnChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSelect = event => {
        this.setState({ tutorialDay: event.target.value })
    }

    handleChangeVenue = event => {
        this.setState({ venue: event.target.value })
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
                        <MDBCol sm="4">Start Time: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                value={this.state.startTime}
                                name="startTime"
                                type="time"
                                className="form-control"
                                placeholder="Start Time"
                                min="08:00"
                                max="20:00"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">End Time: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                value={this.state.endTime}
                                name="endTime"
                                type="time"
                                className="form-control"
                                placeholder="End Time"
                                min="10:00"
                                max="22:00"
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">Day: </MDBCol>
                        <MDBCol sm="8">
                            <select className="browser-default custom-select" onChange={this.handleSelect}>
                                <option>Choose your option</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                            </select>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4">Venue: </MDBCol>
                        <MDBCol sm="8">
                            <select value={this.state.venue} onChange={this.handleChangeVenue} className="browser-default custom-select">
                                <option>Choose your option</option>
                                {this.state.venueList && this.state.venueList.map(
                                    (venue) => <option key={venue.id} value={venue.id}>{venue.name}</option>)
                                }
                            </select>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }} >
                        <MDBCol align="right">
                            <Button onClick={this.create} variant="contained" color="primary">Create</Button>
                        </MDBCol>
                        <MDBCol>
                            <Button onClick={this.cancel} variant="contained" color="primary">Cancel</Button>
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
        const { startTime, endTime, tutorialDay, venue, maxEnrollment } = this.state
        var timing = tutorialDay + " " + startTime + " - " + endTime

        axios.put(`${API}ModuleMounting/mountTutorial?moduleId=${this.state.moduleId}&venueId=${this.state.venue}`, { maxEnrollment: maxEnrollment, venue: venue, timing: timing })
            .then(result => {
                window.location.reload()
                this.props.history.go(-1)
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