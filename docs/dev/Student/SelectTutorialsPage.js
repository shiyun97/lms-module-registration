import React, { Component } from "react";
import { 
    MDBContainer, 
    MDBRow, 
    MDBCol, 
    MDBBtn, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody, 
    MDBModal, 
    MDBModalHeader, 
    MDBModalBody, 
    MDBModalFooter } from "mdbreact";
import axios from "axios";
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
            rows: []
        },
        selectedTutorials: {
            columns: [
                {
                    label: "Module Code",
                    field: "moduleCode",
                    sort: "asc"
                },
                {
                    label: "Module Name",
                    field: "moduleName",
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
            rows: []
        },
        tutorialsToAdd: []
    }

    constructor(props) {
        super(props);
        this.rank1Change.bind(this)
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {
        let studentId = this.props.match.params.studentId;
        if (studentId) {
            console.log(studentId);
            // retrieve student's selected modules & set state for tutorial slots
            axios
                .get("http://localhost:3001/selectedTutorials")
                .then(result => {
                    let data = result.data;
                    let arr = [];
                    Object.keys(data).forEach(function (key) {
                        let temp = {
                            moduleCode: data[key].moduleCode,
                            moduleName: data[key].moduleName,
                            moduleActivity: data[key].moduleActivity,
                            rank1: data[key].rank1,
                            rank2: data[key].rank2
                        }
                        arr.push(temp);
                    });
                    this.setState({
                        selectedTutorials: {
                            ...this.state.selectedTutorials,
                            rows: arr
                        }
                    });
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });
        }
    }

    toggle = nr => () => {
        let modalNumber = "modal" + nr;
        this.setState({
          [modalNumber]: !this.state[modalNumber]
        });
    };

    openDialog = () => {
        this.setState({
            modalAdd: !this.state.modalAdd
        });

        axios
            .get("http://localhost:3001/availableTutorials")
            .then(result => {
                let data = result.data;
                let arr = [];
                const method1 = this.rank1Change;
                const method2 = this.rank2Change;
                Object.keys(data).forEach(function (key) {
                    let tutorialSlots = data[key].tutorialSlots;
                    let tutorialSlotsList = [<option key={""} value="">--</option>]
                    tutorialSlots.map((slot, i) => {
                        tutorialSlotsList.push(<option key={i} value={slot}>{slot}</option>)
                    })
                   
                    let temp = {
                        moduleCode: data[key].moduleCode,
                        moduleActivity: data[key].moduleActivity,
                        rank1: <select id={"rank1"+data[key].moduleCode} onChange={e => method1(data[key].moduleCode)}>{tutorialSlotsList}</select>,
                        rank2: <select id={"rank2"+data[key].moduleCode} onChange={e => method2(data[key].moduleCode)}>{tutorialSlotsList}</select>
                    }
                    arr.push(temp);
                });
                this.setState({
                    availableTutorials: {
                        ...this.state.availableTutorials,
                        rows: arr
                    }
                });
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

    }

    rank1Change = (moduleCode) => {
        let rank1 = document.getElementById("rank1"+moduleCode).value;
        let tutorialsToAdd = this.state.tutorialsToAdd;
        let exists = false;
        for (var i=0; i<tutorialsToAdd.length; i++) {
            if (tutorialsToAdd[i].moduleCode == moduleCode) {
                tutorialsToAdd[i].rank1 = rank1;
                exists = true;
                break;
            }
        }
        if (!exists) {
            let item = {
                moduleCode: moduleCode,
                rank1: rank1
            }
            tutorialsToAdd.push(item);
        }
        this.setState({
            tutorialsToAdd: tutorialsToAdd
        });
    }

    rank2Change = (moduleCode) => {
        let rank2 = document.getElementById("rank2"+moduleCode).value;
        let tutorialsToAdd = this.state.tutorialsToAdd;
        let exists = false;
        for (var i=0; i<tutorialsToAdd.length; i++) {
            if (tutorialsToAdd[i].moduleCode == moduleCode) {
                tutorialsToAdd[i].rank2 = rank2;
                exists = true;
                break;
            }
        }
        if (!exists) {
            let item = {
                moduleCode: moduleCode,
                rank2: rank2
            }
            tutorialsToAdd.push(item);
        }
        this.setState({
            tutorialsToAdd: tutorialsToAdd
        });
    }

    confirmTutorials = () => {
        console.log(this.state.tutorialsToAdd);
        // call api to set, update selectedTutorials
        this.setState({
            modalAdd: false
        })
    }

    render() {
        let availableTutorials = this.state.availableTutorials;
        let selectedTutorials = this.state.selectedTutorials;
        return (
            <MDBContainer className="mt-3">
                <MDBRow className="py-3">
                    <MDBCol>
                        <h4 className="mb-2">Select Tutorials</h4>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <button className="btn btn-primary btn-md mt-0 ml-3" onClick={this.openDialog}>Add / Edit</button>
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
                            <MDBTable bordered striped btn>
                                <MDBTableHead columns={availableTutorials.columns} />
                                <MDBTableBody rows={availableTutorials.rows} />
                            </MDBTable>
                        </form>
                    </MDBModalBody>
                    <MDBModalFooter className="justify-content-center">
                        <MDBBtn onClick={e => {this.confirmTutorials()}}>Confirm</MDBBtn>
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
