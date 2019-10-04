import React, { Component } from "react";
import { MDBEdgeHeader, MDBJumbotron, MDBContainer, MDBRow, MDBCol } from "mdbreact";

class Home extends Component {

    state = {
    };

    render() {
        return (
            <>
                <MDBEdgeHeader color="indigo darken-3" className="loginPage" />
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="12" className="mt-3 mx-auto">
                            <MDBJumbotron align="center" style={{ padding: 50 }}>
                                <h2 className="font-weight-bold">
                                    About ModReg
                                </h2> <br />
                                <p className="text-muted mb-1">
                                    Module Registration (ModReg) is the University’s consolidated module registration platform for all students.<br />
                                    ModReg employs a rules-driven, priority-based engine to allocate modules based on each student’s curricular needs and module preferences.<br />
                                </p>
                                <img src='https://i.pinimg.com/originals/96/be/af/96beaf8a5f007a2eff43650928f70fe9.jpg' alt="ModReg Workflow" width="70%" />
                            </MDBJumbotron>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <MDBContainer style={{ paddingBottom: 240 }}>
                    <MDBRow>
                        <MDBCol md="12" className="mt-4">
                            <h2 className="text-center my-5 font-weight-bold">
                                ModReg Schedule
                            </h2>
                            <p className="text-center text-muted mb-1">
                                Module Registration will commence in January 2020.
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>
        );
    }
}

export default Home;

