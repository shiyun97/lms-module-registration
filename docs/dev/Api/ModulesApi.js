import axios from "axios";
import 'babel-polyfill';

const API_URL = "http://localhost:8080/LMS-war/webresources";

export function GetAllAvailableModulesAPI() {
    return axios
        .get(API_URL + "/studentEnrollment/retrieveAvailableModules")
        .catch(error => {
            console.log("error in axios " + error);
            return;
        });
}

export function GetStudentModulesAPI(studentId) {
    return axios
        .get("http://localhost:8080/LMS-war/webresources/studentEnrollment/retrieveStudentModules/" + studentId)
        .catch(error => {
            console.log("error in axios " + error);
            return;
        });
}

export function GetStudentAvailableModulesAPI(studentId) {
    let selectedModules = [];
    GetStudentModulesAPI(studentId)
        .then((result) => {
            if (result) {
                let data = result.data && result.data.modules;
                Object.keys(data).forEach(function (key) {
                    let temp = {
                        moduleId: data[key].moduleId,
                        moduleCode: data[key].code,
                        creditUnit: data[key].creditUnit,
                        moduleName: data[key].title,
                    }
                    selectedModules.push(temp);
                })
            }
        })
        .catch(error => {
            console.log("error in axios " + error);
            return;
        });
    let availableModules = [];
    GetAllAvailableModulesAPI()
        .then((result) => {
            if (result) {
                let data = result.data && result.data.modules;
                Object.keys(data).forEach(function (key) {
                    let selectedAlr = false;
                    for (var i = 0; i < selectedModules.length && selectedAlr === false; i++) {
                        if (selectedModules[i].moduleCode === data[key].code) {
                            selectedAlr = true;
                        }
                    }
                    if (selectedAlr === false) {
                        let temp = {
                            moduleId: data[key].moduleId,
                            moduleCode: data[key].code,
                            creditUnit: data[key].creditUnit,
                            moduleName: data[key].title,
                        }
                        availableModules.push(temp);
                    }
                })
            }
        })
        .catch(error => {
            console.log("error in axios " + error);
            return;
        });
    return availableModules;
}

export function GetStudentTutorialsAPI(studentId) {
    return axios
        .get("http://localhost:8080/LMS-war/webresources/studentEnrollment/retrieveStudentTutorials/" + studentId)
        .catch(error => {
            console.log("error in axios " + error);
            return;
        });
}

export function GetAvailableTutorialsAPI(studentId) {
    return axios
        .get("http://localhost:8080/LMS-war/webresources/studentEnrollment/retrieveTutorialsToBid/" + studentId)
        .catch(error => {
            console.log("error in axios " + error);
            return;
        });
}