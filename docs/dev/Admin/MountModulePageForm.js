import React, { Component } from "react";
import axios from "axios";
import SectionContainer from "../../components/sectionContainer";
import { MDBContainer, MDBCol, MDBRow } from "mdbreact";
import { Button } from "@material-ui/core";

let url = "http://localhost:3001/";

class MountModulePageForm extends Component {

    state = {
        moduleDetails: "",
        disabled: true,
        index: 0
    }

    componentDidMount() {
        var loc = this.props.history.location.pathname
        var index = loc.lastIndexOf('/');
        if (index !== -1) {
            var newStr = loc.substring(index + 1);
        }
        this.setState({index: newStr})

        axios.get(url + "modules")
            .then(result => {
                this.setState({ moduleDetails: result.data[newStr] })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    //TODO: improve on logic
    handleOnChange = event => {
        var changedValue = event.target.value
        console.log(changedValue)

        if (event.target.name === "moduleCode") {
            this.setState(prevState => ({
                moduleDetails: {
                    ...prevState.moduleDetails,  
                    moduleCode: changedValue       
                }
            }))
        } else if (event.target.name === "moduleName") {
            this.setState(prevState => ({
                moduleDetails: {
                    ...prevState.moduleDetails,  
                    moduleName: changedValue      
                }
            }))
        } else if (event.target.name === "semester") {
            this.setState(prevState => ({
                moduleDetails: {
                    ...prevState.moduleDetails,    
                    semester: changedValue      
                }
            }))
        } else if (event.target.name === "year") {
            this.setState(prevState => ({
                moduleDetails: {
                    ...prevState.moduleDetails,  
                    year: changedValue       
                }
            }))
        } else if (event.target.name === "faculty") {
            this.setState(prevState => ({
                moduleDetails: {
                    ...prevState.moduleDetails,  
                    faculty: changedValue       
                }
            }))
        } else if (event.target.name === "department") {
            this.setState(prevState => ({
                moduleDetails: {
                    ...prevState.moduleDetails,  
                    department: changedValue       
                }
            }))
        } else if (event.target.name === "maxCapacity") {
            this.setState(prevState => ({
                moduleDetails: {
                    ...prevState.moduleDetails,  
                    maxCapacity: changedValue       
                }
            }))
        } else {
            this.setState(prevState => ({
                moduleDetails: {
                    ...prevState.moduleDetails,  
                    professor: changedValue       
            }}))
        }
    }

    displayModuleDetails = () => {
        return (
            <MDBContainer>
                <SectionContainer>

                    <MDBRow>
                        <MDBCol sm="4">Module Code: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.moduleDetails.moduleCode}
                                name="moduleCode"
                                type="text"
                                className="form-control"
                                placeholder="Module Code"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" >Module Title: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.moduleDetails.moduleName}
                                name="moduleName"
                                type="text"
                                className="form-control"
                                placeholder="Module Title"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Semester: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.moduleDetails.semester}
                                name="semester"
                                type="text"
                                className="form-control"
                                placeholder="Semester"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Year: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.moduleDetails.year}
                                name="year"
                                type="text"
                                className="form-control"
                                placeholder="Year"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Faculty: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.moduleDetails.faculty}
                                name="faculty"
                                type="text"
                                className="form-control"
                                placeholder="Faculty"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Department: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.moduleDetails.department}
                                name="department"
                                type="text"
                                className="form-control"
                                placeholder="Department"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Maximum Capacity: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.moduleDetails.maxCapacity}
                                name="maxCapacity"
                                type="text"
                                className="form-control"
                                placeholder="Maximum Capacity"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>Professor: </MDBCol>
                        <MDBCol sm="8">
                            <input
                                defaultValue={this.state.moduleDetails.professor}
                                name="professor"
                                type="text"
                                className="form-control"
                                placeholder="Professor"
                                disabled={this.state.disabled}
                                onChange={this.handleOnChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>
                            <Button onClick={this.edit}>Edit</Button>
                        </MDBCol>
                        <MDBCol sm="8">

                        </MDBCol>
                    </MDBRow>

                    <MDBRow style={{ paddingTop: "20px" }}>
                        <MDBCol sm="4" style={{ paddingTop: "10px" }}>
                            <Button onClick={this.save}>Save</Button>
                        </MDBCol>
                        <MDBCol sm="8">

                        </MDBCol>
                    </MDBRow>

                </SectionContainer>
            </MDBContainer>
        )
    }

    edit = event => {
        this.setState({ disabled: false })
    }

    save = event => {
        this.setState({ disabled: true})
        //FIXME: fix index
        console.log("this.state.index"+ this.state.index)

        axios.put(url + "modules/" + this.state.index , this.state.moduleDetails)
            .then(result => {
                alert("Updated")
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }


    render() {
        return (
            <MDBContainer style={{ paddingTop: "80px" }}>
                <h3>Module Details</h3>
                <MDBRow>{this.displayModuleDetails()}</MDBRow>

            </MDBContainer>
        )
    }
}

export default MountModulePageForm