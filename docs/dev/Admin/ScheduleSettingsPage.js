import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInputGroup, MDBCard, MDBCardBody } from "mdbreact";
import TextField from '@material-ui/core/TextField';

class ScheduleSettingsPage extends Component {
    getPickerValue = (value) => {
        console.log(value);
    }

    render() {
        return (
            <MDBContainer className="mt-3">
                <MDBRow style={{ paddingTop: 60 }}>
                    <MDBCol md="12">
                        <h2 className="font-weight-bold">
                            ModReg Schedule Settings
                        </h2>
                    </MDBCol>
                    <MDBRow className="py-3">
                        <MDBCol md="12" style={{ paddingBottom: 240 }}>
                            <MDBCard>
                                <MDBCardBody>
                                    <form className="mx-3 grey-text">
                                        <MDBRow>
                                            <MDBCol md="12" style={{ paddingTop: 20 }}>
                                                <h4 className="font-weight-bold">
                                                    Semester Details
                                                </h4>
                                            </MDBCol>
                                            <MDBCol md="6" className="mt-4">
                                                <MDBInputGroup
                                                    containerClassName="mb-3"
                                                    prepend="Year"
                                                    inputs={
                                                        <select className="browser-default custom-select">
                                                            <option value="0">Choose...</option>
                                                            <option value="1">2019</option>
                                                            <option value="2">2020</option>
                                                            <option value="3">2021</option>
                                                            <option value="4">2022</option>
                                                        </select>
                                                    }
                                                />
                                            </MDBCol>
                                            <MDBCol md="6" className="mt-4">
                                                <MDBInputGroup
                                                    containerClassName="mb-3"
                                                    prepend="Semester"
                                                    inputs={
                                                        <select className="browser-default custom-select">
                                                            <option value="0">Choose...</option>
                                                            <option value="1">Sem 1</option>
                                                            <option value="2">Sem 2</option>
                                                        </select>
                                                    }
                                                />
                                            </MDBCol>
                                            <MDBCol md="6" className="mt-4">
                                                <TextField
                                                    id="datetime-local"
                                                    label="Start Date"
                                                    type="datetime-local"
                                                    defaultValue="2019-05-24T10:30"
                                                    fullWidth
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </MDBCol>
                                            <MDBCol md="6" className="mt-4">
                                                <TextField
                                                    id="datetime-local"
                                                    label="End Date"
                                                    type="datetime-local"
                                                    defaultValue="2019-05-24T10:30"
                                                    fullWidth
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </MDBCol>
                                            <MDBCol md="12" className="mt-4">
                                                <br />
                                                <hr />
                                            </MDBCol>
                                            <MDBCol md="4" className="mt-4">
                                                <h5 className="font-weight-bold">
                                                    Select Modules Round 1
                                                </h5>
                                                <MDBRow>
                                                    <MDBCol md="12" className="mt-4">
                                                        <TextField
                                                            id="datetime-local"
                                                            label="Start Date"
                                                            type="datetime-local"
                                                            defaultValue="2019-05-24T10:30"
                                                            fullWidth
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </MDBCol>
                                                    <MDBCol md="12" className="mt-4">
                                                        <TextField
                                                            id="datetime-local"
                                                            label="End Date"
                                                            type="datetime-local"
                                                            defaultValue="2019-05-24T10:30"
                                                            fullWidth
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCol>
                                            <MDBCol md="4" className="mt-4">
                                                <h5 className="font-weight-bold">
                                                    Select Modules Round 2
                                                </h5>
                                                <MDBRow>
                                                    <MDBCol md="12" className="mt-4">
                                                        <TextField
                                                            id="datetime-local"
                                                            label="Start Date"
                                                            type="datetime-local"
                                                            defaultValue="2019-05-24T10:30"
                                                            fullWidth
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </MDBCol>
                                                    <MDBCol md="12" className="mt-4">
                                                        <TextField
                                                            id="datetime-local"
                                                            label="End Date"
                                                            type="datetime-local"
                                                            defaultValue="2019-05-24T10:30"
                                                            fullWidth
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCol>
                                            <MDBCol md="4" className="mt-4">
                                                <h5 className="font-weight-bold">
                                                    Select Modules Round 3
                                                </h5>
                                                <MDBRow>
                                                    <MDBCol md="12" className="mt-4">
                                                        <TextField
                                                            id="datetime-local"
                                                            label="Start Date"
                                                            type="datetime-local"
                                                            defaultValue="2019-05-24T10:30"
                                                            fullWidth
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </MDBCol>
                                                    <MDBCol md="12" className="mt-4">
                                                        <TextField
                                                            id="datetime-local"
                                                            label="End Date"
                                                            type="datetime-local"
                                                            defaultValue="2019-05-24T10:30"
                                                            fullWidth
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCol>
                                            <MDBCol md="12" className="mt-4">
                                                <br />
                                                <hr />
                                            </MDBCol>
                                            <MDBCol md="6" className="mt-4">
                                                <h5 className="font-weight-bold">
                                                    Select Tutorials Round 1
                                                </h5>
                                                <MDBRow>
                                                    <MDBCol md="12" className="mt-4">
                                                        <TextField
                                                            id="datetime-local"
                                                            label="Start Date"
                                                            type="datetime-local"
                                                            defaultValue="2019-05-24T10:30"
                                                            fullWidth
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </MDBCol>
                                                    <MDBCol md="12" className="mt-4">
                                                        <TextField
                                                            id="datetime-local"
                                                            label="End Date"
                                                            type="datetime-local"
                                                            defaultValue="2019-05-24T10:30"
                                                            fullWidth
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCol>
                                            <MDBCol md="6" className="mt-4">
                                                <h5 className="font-weight-bold">
                                                    Select Tutorials Round 2
                                                </h5>
                                                <MDBRow>
                                                    <MDBCol md="12" className="mt-4">
                                                        <TextField
                                                            id="datetime-local"
                                                            label="Start Date"
                                                            type="datetime-local"
                                                            defaultValue="2019-05-24T10:30"
                                                            fullWidth
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </MDBCol>
                                                    <MDBCol md="12" className="mt-4">
                                                        <TextField
                                                            id="datetime-local"
                                                            label="End Date"
                                                            type="datetime-local"
                                                            defaultValue="2019-05-24T10:30"
                                                            fullWidth
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCol>
                                        </MDBRow>
                                    </form>
                                    <br />
                                    <MDBCol md="12" className="mt-4" align="right">
                                        <MDBBtn color="primary">Update</MDBBtn>
                                    </MDBCol>
                                    <br />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default ScheduleSettingsPage;
