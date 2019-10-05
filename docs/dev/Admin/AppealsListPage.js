import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import axios from "axios";
import { MDBDataTable } from 'mdbreact';
import { Button } from "@material-ui/core";
import { observer, inject } from 'mobx-react'

const API = "http://localhost:8080/LMS-war/webresources/"

@inject('dataStore')
@observer
class AppealsListPage extends Component {
    state = {
        activeItem: "1",
        allAppeals: "",
        pendingAppeals: "",
        reviewedAppeals: "",
    };

    componentDidMount() {
        let userId = localStorage.getItem("userId")
        axios.get(`${API}studentEnrollment/retrievePendingAppeals?userId=${userId}`)
            .then(result => {
                this.setState({ pendingAppeals: result.data.appeals })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });

        axios.get(`${API}studentEnrollment/retrieveReviewedAppeals?userId=${userId}`)
            .then(result => {
                this.setState({ reviewedAppeals: result.data.appeals })
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
                        <MDBNavLink to="#" active={this.state.activeItem === "3"} onClick={this.toggle("3")} role="tab" >Reviewed</MDBNavLink>
                    </MDBNavItem>
                </MDBNav>
                <MDBTabContent activeItem={this.state.activeItem} >
                    <MDBTabPane tabId="1" role="tabpanel">
                        {this.showAllAppeals()}
                    </MDBTabPane>
                    <MDBTabPane tabId="2" role="tabpanel">
                        {this.showAllPendingAppeals()}
                    </MDBTabPane>
                    <MDBTabPane tabId="3" role="tabpanel">
                        {this.showAllReviewedAppeals()}
                    </MDBTabPane>
                </MDBTabContent>
            </MDBContainer>
        )
    }

    getColumns = () => {
        return (
            [
                {
                    label: 'Id',
                    field: 'appealId',
                    sort: 'asc',
                    width: 150,
                },
                {
                    label: 'Date',
                    field: 'createDate',
                    sort: 'asc',
                    width: 150,
                },
                {
                    label: 'Module Code',
                    field: 'moduleCode',
                    sort: 'asc',
                    width: 150,
                },
                {
                    label: 'Appeal Type',
                    field: 'type',
                    sort: 'asc',
                    width: 150,
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Details',
                    field: 'button',
                    width: 150
                },
            ]
        )
    }

    showAllReviewedAppeals = () => {
        const data = {
            columns: this.getColumns(),
            rows: this.rowsDataReviewed()
        }

        if (this.state.reviewedAppeals.length !== 0) {
            return (
                <MDBDataTable
                    style={{ textAlign: "center", verticalAlign: "center" }}
                    striped
                    bordered
                    hover
                    data={data}
                    responsive
                />
            )
        } else {
            return (
                <h6>No appeals</h6>
            );
        }
    }

    showAllAppeals = () => {
        const data = {
            columns: this.getColumns(),
            rows: this.rowsDataAll()
        }
        if (this.state.pendingAppeals.length !== 0 && this.state.reviewedAppeals.length !== 0) {
            return (
                <MDBDataTable
                    style={{ textAlign: "center", verticalAlign: "center" }}
                    striped
                    bordered
                    hover
                    data={data}
                    responsive
                />
            )
        } else {
            return (
                <h6>No appeals</h6>
            )
        }
    }

    showAllPendingAppeals = () => {
        const data = {
            columns: this.getColumns(),
            rows: this.rowsDataPending()
        }

        if (this.state.pendingAppeals.length !== 0) {
            return (

                <MDBDataTable
                    style={{ textAlign: "center", verticalAlign: "center" }}
                    striped
                    bordered
                    hover
                    data={data}
                    responsive
                />
            )
        } else {
            return (
                <h6>No appeals</h6>
            )
        }
    }

    rowsDataAll = () => {
        let allAppeals = []
        let displayAll = []
        if (this.state.pendingAppeals.length !== 0 && this.state.reviewedAppeals.length !== 0) {
            allAppeals = this.state.pendingAppeals.concat(this.state.reviewedAppeals)
        } else if (this.state.pendingAppeals.length !== 0) {
            allAppeals = this.state.pendingAppeals
        } else {
            allAppeals = this.state.reviewedAppeals
        }

        allAppeals && allAppeals.map((eachAppeal, index) =>
            displayAll.push({
                appealId: eachAppeal.appealId,
                createDate: (eachAppeal.createDate).slice(0, 10),
                moduleCode: eachAppeal.module.code,
                type: eachAppeal.type,
                status: eachAppeal.status,
                button: this.showButton(),
                clickEvent: () => this.handleRowClick(eachAppeal.appealId)
            })
        )
        return displayAll
    }

    rowsDataPending = () => {
        let pendingAppeals = [];
        this.state.pendingAppeals && this.state.pendingAppeals.map((eachAppeal, index) =>
            pendingAppeals.push({
                appealId: eachAppeal.appealId,
                createDate: (eachAppeal.createDate).slice(0, 10),
                moduleCode: eachAppeal.module.code,
                type: eachAppeal.type,
                status: eachAppeal.status,
                button: this.showButton(),
                clickEvent: () => this.handleRowClick(eachAppeal.appealId)
            })
        )
        return pendingAppeals
    }

    rowsDataReviewed = () => {
        let reviewedAppeals = [];
        this.state.reviewedAppeals && this.state.reviewedAppeals.map((eachAppeal, index) =>
            reviewedAppeals.push({
                appealId: eachAppeal.appealId,
                createDate: (eachAppeal.createDate).slice(0, 10),
                moduleCode: eachAppeal.module.code,
                type: eachAppeal.type,
                status: eachAppeal.status,
                button: this.showButton(),
                clickEvent: () => this.handleRowClick(eachAppeal.appealId)
            })
        )
        return reviewedAppeals
    }

    showButton = () => {
        return (
            <div>
                <Button size="small" color="primary">View</Button>
            </div>
        )
    }

    handleRowClick = index => {
        let path = `appealsList/view/` + index;
        this.props.history.push(path);
    }

    render() {
        return (
            <MDBContainer center="true" style={{ paddingTop: "40px" }}>
                <h3>All Appeals</h3>
                <MDBRow>{this.showAppeals()}</MDBRow>
            </MDBContainer>
        );
    }
}
export default AppealsListPage;