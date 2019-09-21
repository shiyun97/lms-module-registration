import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, 
    MDBCard, MDBCardBody } from "mdbreact";
import SectionContainer from '../../components/sectionContainer';

class AllocateModulesPage extends Component {

    state = {
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {
    }

    inputChangeHandler = (e) => {
        e.preventDefault();
        console.log(e.target.name + " " + e.target.value)
    }

    render() {
        let searchedModules = this.state.searchedModules;
        let selectedModules = this.state.selectedModules;
        console.log(searchedModules);
        return (
            <MDBContainer className="mt-3">
                <MDBRow className="py-3">
                    <MDBCol>
                        <h4 className="mb-2">Allocate Modules</h4>
                        <div className="mb-3"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="py-3">
                    <MDBCol>
                        <form>
                            <div className="form-row align-items-center">
                                <div className="col-md-3">
                                    <label>Student Number</label>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" className="form-control mb-2" name="studentNumberInput" placeholder="" onChange={this.inputChangeHandler} />
                                </div>
                            </div>
                            <div className="form-row align-items-center">
                                <div className="col-md-3">
                                    <label>Module Code</label>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" className="form-control mb-2" name="moduleCodeInput" placeholder="" onChange={this.inputChangeHandler} />
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-primary btn-md mt-md-0 ml-0" >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default AllocateModulesPage;
