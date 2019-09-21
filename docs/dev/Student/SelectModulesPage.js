import React, { Component } from "react";
import { 
    MDBContainer, 
    MDBRow, 
    MDBCol,
    MDBBtn, 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody, 
    MDBCard, 
    MDBCardBody,
    MDBModal,
    MDBModalBody
} from "mdbreact";
import SectionContainer from '../../components/sectionContainer';
import axios from "axios";

class SelectModulesPage extends Component {

    state = {
        modalCheckbox: false,
        moduleCodeEntered: "",
        showSearchedModule: false,
        searchedModules: {
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
                    label: "Lecture Code",
                    field: "lectureCode",
                    sort: "asc"
                },
                {
                    label: "",
                    field: "handle",
                    sort: "asc"
                  }
            ],
            rows: []
        },
        selectedModules: {
            columns: [
                {
                    label: "",
                    field: "check",
                    sort: "asc"
                },
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
                    label: "Lecture Code",
                    field: "lectureCode",
                    sort: "asc"
                }
            ],
            rows: []
        }
    }

    componentDidMount() {
        this.initPage();
    }

    initPage() {
        let studentId = this.props.match.params.studentId;
        if (studentId) {
            console.log(studentId);
            // retrieve student & set state for classes
            axios
                .get("http://localhost:3001/selectedModules")
                .then(result => {
                    let data = result.data;
                    let arr = [];
                    Object.keys(data).forEach(function (key) {
                        let temp = {
                            check: <input type="checkbox" style={{ 'height': '20px', 'width': '20px' }} id={data[key].lectureCode} />,
                            moduleCode: data[key].moduleCode,
                            moduleName: data[key].moduleName,
                            lectureCode: data[key].lectureCode
                        }
                        arr.push(temp);
                    });
                    this.setState({
                        selectedModules: {
                            ...this.state.selectedModules,
                            rows: arr
                        }
                    });
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });
        }
    }

    inputChangeHandler = (e) => {
        e.preventDefault();
        if (e.target.name == "moduleCodeInput") {
            this.setState({
                moduleCodeEntered: e.target.value
            });
        }
    }

    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";

        if (this.state.moduleCodeEntered) {
            // call api with moduleCodeEntered & student number
            axios
                .get("http://localhost:3001/searchedModules")
                .then(result => {
                    let data = result.data;
                    let arr = [];
                    const method = this.addModule;
                    Object.keys(data).forEach(function (key) {
                        let temp = {
                            moduleCode: data[key].moduleCode,
                            moduleName: data[key].moduleName,
                            lectureCode: data[key].lectureCode,
                            handle: (
                                <MDBBtn color="primary" size="sm" onClick={e => method(data[key].lectureCode)}>
                                    Add
                                </MDBBtn>
                            )
                        }
                        arr.push(temp);
                    });
                    this.setState({
                        searchedModules: {
                            ...this.state.searchedModules,
                            rows: arr
                        },
                        showSearchedModule: true
                    });
                })
                .catch(error => {
                    console.error("error in axios " + error);
                });
        }
        else {
            this.setState({
                showSearchedModule: false
            });
        }
    };

    addModule = (lectureCode) => {
        console.log(lectureCode);
        // call api to add module and update searchedModules, selectedModules
    }

    toggle = nr => () => {
        let modalNumber = "modal" + nr;
        this.setState({
          ...this.state,
          [modalNumber]: !this.state[modalNumber]
        });
      };

    deleteModule = (e) => {
        let arr = []
        let selectedModules = this.state.selectedModules.rows;
        for (var i=0; i < selectedModules.length; i++) {
            if (document.getElementById(selectedModules[i].lectureCode).checked == true) {
                arr.push(selectedModules[i].lectureCode);
            }
        }
        if (arr.length == 0) {
            this.setState({
                modalCheckbox: true
            })
        }
        // call api to remove && update state
    }

    render() {
        let searchedModules = this.state.searchedModules;
        let selectedModules = this.state.selectedModules;
        return (
            <MDBContainer className="mt-3">
                <MDBRow className="py-3">
                    <MDBCol>
                        <h4 className="mb-2">Select Modules</h4>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="py-3 mb-2">
                    <MDBCol>
                        <form className="needs-validation" noValidate onSubmit={this.submitHandler}>
                            <div className="form-row align-items-center">
                                <div className="col-auto">
                                    <label className="mb-1">Module Code</label>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" className="form-control" name="moduleCodeInput" 
                                        value={this.state.moduleCodeEntered} 
                                        onChange={this.inputChangeHandler} 
                                        required />
                                    <div style={{ top: "auto" }} className="invalid-tooltip">Required</div>
                                </div>
                                <div className="col-auto">
                                    <button type="submit" className="btn btn-primary btn-md mt-md-0 ml-0 mt-4" style={{"marginBottom":"0px"}}>
                                        Search
                                    </button>
                                </div>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
                <MDBModal
                    position="top"
                    backdrop={false}
                    frame
                    isOpen={this.state.modalCheckbox}
                    toggle={this.toggle("Checkbox")}
                >
                    <MDBModalBody>
                        <MDBRow className="justify-content-center align-items-center">
                            <p className="pt-3 pr-2">
                                Please select at least 1 checkbox to delete
                            </p>
                            <MDBBtn color="primary" outline onClick={this.toggle("Checkbox")}>
                                OK
                            </MDBBtn>
                        </MDBRow>
                    </MDBModalBody>
                </MDBModal>
                {
                    this.state.showSearchedModule && searchedModules.rows && searchedModules.rows.length > 0 &&
                    <MDBRow className="py-2">
                        <MDBCol md="8" sm="12">
                            <SectionContainer noBorder>
                                <MDBCard className="py-0">
                                    <MDBCardBody>
                                        <MDBTable scrollY>
                                            <MDBTableHead columns={searchedModules.columns} />
                                            <MDBTableBody rows={searchedModules.rows} />
                                        </MDBTable>
                                    </MDBCardBody>
                                </MDBCard>
                            </SectionContainer>
                        </MDBCol>
                    </MDBRow>
                }
                {
                    selectedModules.rows && selectedModules.rows.length > 0 &&
                    <MDBRow className="py-3">
                        <MDBCol>
                            <MDBRow>
                                <MDBCol>
                                    <h5>Selected Modules<button type="submit" style={{ "float": "right" }} className="btn btn-danger btn-md mt-0 mr-0" onClick={e => this.deleteModule()}>Delete</button></h5>
                                    <div className="mb-3"></div>
                                </MDBCol>
                            </MDBRow>

                            <MDBTable bordered btn fixed>
                                <MDBTableHead columns={selectedModules.columns} color="mdb-color lighten-5"/>
                                <MDBTableBody rows={selectedModules.rows} />
                            </MDBTable>
                            <div className="mb-5"/>
                        </MDBCol>
                    </MDBRow>
                }
            </MDBContainer>
        )
    }
}

export default SelectModulesPage;
