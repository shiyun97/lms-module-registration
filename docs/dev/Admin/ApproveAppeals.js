import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBBtn, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import axios from "axios";
import { MDBDataTable } from 'mdbreact';
import { Button } from "@material-ui/core";

let url = "http://localhost:3001/";

class ApproveAppeals extends Component {
    state = {
        activeItem: "1"
    };

    componentDidMount() {
        axios.get(url + "allAppeals")
            .then(result => {
                this.setState({ allAppeals: result.data })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };

    showAppeals = () => {
        return (
            <MDBContainer>
                <MDBNav className="nav-tabs mt-5">
                    <MDBNavItem>
                        <MDBNavLink to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab" >All Appeals</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="#" active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab" >Pending Approval</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="#" active={this.state.activeItem === "3"} onClick={this.toggle("3")} role="tab" >Closed</MDBNavLink>
                    </MDBNavItem>
                </MDBNav>
                <MDBTabContent activeItem={this.state.activeItem} >
                    <MDBTabPane tabId="1" role="tabpanel">
                        {this.showAllAppeals()}
                    </MDBTabPane>
                    <MDBTabPane tabId="2" role="tabpanel">
                        <p className="mt-2">pending approval</p>

                    </MDBTabPane>
                    <MDBTabPane tabId="3" role="tabpanel">
                        <p className="mt-2">closed appeals</p>
                    </MDBTabPane>
                </MDBTabContent>
            </MDBContainer>
        )
    }

    showAllAppeals = () => {
        const data = {
            columns: [
                {
                    label: 'Id',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Date',
                    field: 'date',
                    sort: 'asc',
                },
                {
                    label: 'Module Code',
                    field: 'moduleCode',
                    sort: 'asc',
                },
                {
                    label: 'Appeal Type',
                    field: 'appealType',
                    sort: 'asc',
                },
                {
                    label: 'Student Year',
                    field: 'studentYear',
                    sort: 'asc',
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc',
                },
                {
                    label: 'Details',
                    field: 'button',
                },
            ],
            rows:
                this.rowsData()
/*                 this.state.allModules
*/        }

        return (
            <MDBDataTable
                style={{ textAlign: "center", verticalAlign: "center" }}
                autoWidth={true}
                bordered
                hover
                data={data}
                responsive
                responsiveSm
                responsiveMd
                responsiveLg
                responsiveXl
                theadColor="rgba-blue-slight"
            />
        )
    }

    rowsData = () => {
        let allAppeals = [];
        this.state.allAppeals && this.state.allAppeals.map((eachAppeal, index) =>
            allAppeals.push({
                id: eachAppeal.id,
                date: eachAppeal.date,
                moduleCode: eachAppeal.appealModule,
                appealType: eachAppeal.value,
                studentYear: eachAppeal.studentYear,
                status: eachAppeal.appealStatus,
                button: this.showButton(),
                clickEvent: () => this.handleRowClick(index)
            })
        )
        return allAppeals
    }

    showButton = () => {
        return (
            <div>
                <Button size="small" color="primary">View</Button>
            </div>
        )
    }

    handleRowClick = index => {
        //create a new page. go to form edit page. 
        console.log(index)
    }

    render() {
        return (
            <MDBContainer center="true" style={{ paddingTop: "40px" }}>
                <h3>Approve Appeals</h3>
                <MDBRow>{this.showAppeals()}</MDBRow>
            </MDBContainer>
        );
    }
}

export default ApproveAppeals;