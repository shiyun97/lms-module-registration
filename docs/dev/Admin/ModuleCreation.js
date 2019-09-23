import React, { Component } from "react";
import SectionContainer from "../../components/sectionContainer";
import { MDBContainer, MDBRow } from 'mdbreact';
import axios from "axios";


var url = "http://localhost:3001/";

class ModuleCreation extends Component {
    state = {
        allModules: ""
    };

    componentDidMount() {
        axios.get(url + "modules")
            .then(result => {
                this.setState({ allModules: result.data })
            })
            .catch(error => {
                console.error("error in axios " + error);
            });
    }

    displayAllModules = () => {

          return(<h1>here</h1>)
        
    }

    render() {
        return (
            <MDBContainer style={{ paddingTop: "40px" }}>
                <MDBRow>{this.displayAllModules()}</MDBRow>
            </MDBContainer>
        );
    }
}

export default ModuleCreation;

