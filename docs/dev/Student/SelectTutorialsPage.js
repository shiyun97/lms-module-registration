import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, 
    MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from "mdbreact";
import SectionContainer from '../../components/sectionContainer';

class SelectTutorialsPage extends Component {

    state = {
        modalAdd: false,
        availableTutorials: {
            columns: [
                {
                    label: "Module Code",
                    field: "moduleCode",
                    sort: "asc"
                },
                {
                    label: "Module Activity",
                    field: "moduleActivity",
                    sort: "asc"
                },
                {
                    label: "Rank 1",
                    field: "rank1",
                    sort: "asc"
                },
                {
                    label: "Rank 2",
                    field: "rank2",
                    sort: "asc"
                }
            ],
            rows: [
                {
                    moduleCode: "IS4103",
                    moduleActivity: "Tutorial",
                    rank1: (<select id="rank1" onChange={e => this.rank1Change("moduleId1")}>
                        <option>--</option>
                        <option value="T1">T1</option>
                        <option value="T2">T2</option>
                        <option value="T3">T3</option>
                        <option value="T4">T4</option>
                        <option value="T5">T5</option>
                    </select>),
                    rank2: (<select id="rank2" onChange={e => this.rank2Change("moduleId1")}>
                        <option>--</option>
                        <option value="T1">T1</option>
                        <option value="T2">T2</option>
                        <option value="T3">T3</option>
                        <option value="T4">T4</option>
                        <option value="T5">T5</option>
                    </select>)
                },
                {
                    moduleCode: "IS3106",
                    moduleActivity: "Tutorial",
                    rank1: (<select id="rank1" onChange={e => this.rank1Change("moduleId2")}>
                        <option>--</option>
                        <option value="T1">T1</option>
                        <option value="T2">T2</option>
                        <option value="T3">T3</option>
                        <option value="T4">T4</option>
                        <option value="T5">T5</option>
                    </select>),
                    rank2: (<select id="rank2" onChange={e => this.rank2Change("moduleId2")}>
                        <option>--</option>
                        <option value="T1">T1</option>
                        <option value="T2">T2</option>
                        <option value="T3">T3</option>
                        <option value="T4">T4</option>
                        <option value="T5">T5</option>
                    </select>)
                }
            ]
        },
        selectedTutorials: {
            columns: [
                {
                    label: "Module Code",
                    field: "moduleCode",
                    sort: "asc"
                },
                {
                    label: "Module Activity",
                    field: "moduleActivity",
                    sort: "asc"
                },
                {
                    label: "Rank 1",
                    field: "rank1",
                    sort: "asc"
                },
                {
                    label: "Rank 2",
                    field: "rank2",
                    sort: "asc"
                }
            ],
            rows: [
                {
                    moduleCode: "IS4103",
                    moduleActivity: "Tutorial",
                    rank1: "T1",
                    rank2: "T3"
                },
                {
                    moduleCode: "IS3106",
                    moduleActivity: "Tutorial",
                    rank1: "T2",
                    rank2: "T3"
                }
            ]
        }
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {
        let studentId = this.props.match.params.studentId;
        if (studentId) {
            console.log(studentId);
            // retrieve student's selected modules & set state for tutorial slots

        }
    }

    toggle = nr => () => {
        let modalNumber = "modal" + nr;
        this.setState({
          [modalNumber]: !this.state[modalNumber]
        });
    };

    rank1Change(moduleId) {
        let rank1 = document.getElementById("rank1").value;
        console.log(rank1);
        console.log(moduleId);
    }

    rank2Change(moduleId) {
        let rank2 = document.getElementById("rank2").value;
        console.log(rank2);
        console.log(moduleId);
    }

    render() {
        let availableTutorials = this.state.availableTutorials;
        let selectedTutorials = this.state.selectedTutorials;
        console.log(availableTutorials);
        return (
            <MDBContainer className="mt-3">
                <MDBRow className="py-3">
                    <MDBCol>
                        <h4 className="mb-2">Select Tutorials</h4>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <button className="btn btn-primary btn-md mt-0 ml-3" onClick={this.toggle("Add")}>Add / Edit</button>
                </MDBRow>
                <MDBModal isOpen={this.state.modalAdd} toggle={this.toggle("Add")}>
                    <MDBModalHeader
                        className="text-center"
                        titleClass="w-100 font-weight-bold"
                        toggle={this.toggle("Add")}
                    >
                        Rank Tutorials
                    </MDBModalHeader>
                    <MDBModalBody>
                        <form className="mx-3 grey-text">
                            <MDBTable bordered striped btn fixed>
                                <MDBTableHead columns={availableTutorials.columns} />
                                <MDBTableBody rows={availableTutorials.rows} />
                            </MDBTable>
                        </form>
                    </MDBModalBody>
                    <MDBModalFooter className="justify-content-center">
                        <MDBBtn onClick={this.toggle("Add")}>Confirm</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
                {
                    selectedTutorials.rows.length > 0 &&
                    <MDBRow>
                        <MDBCol>
                            <MDBRow>
                                <MDBCol>
                                    <div className="mb-5"></div>
                                    <h5 className="mb-3">Selected Tutorials</h5>
                                </MDBCol>
                            </MDBRow>

                            <MDBTable bordered btn fixed>
                                <MDBTableHead columns={selectedTutorials.columns} color="mdb-color lighten-5"/>
                                <MDBTableBody rows={selectedTutorials.rows} />
                            </MDBTable>
                        </MDBCol>
                    </MDBRow>
                }
            </MDBContainer>
        )
    }
}

export default SelectTutorialsPage;
