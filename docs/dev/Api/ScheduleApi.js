import axios from "axios";

const API_URL = "http://localhost:8080/LMS-war/webresources";

export function GetCurrentScheduleAPI() {
    return axios
        .get(API_URL + "/studentEnrollment/getCurrentScheduleDetails")
        .then(result => {
            let data = result.data;
            let today = new Date();
            let timezoneTemp = today.toString().match(/([-\+][0-9]+)\s/)[1];
            let timezone = timezoneTemp.substring(0, 3) + ":" + timezoneTemp.substring(3);
            let currentDate = today.getUTCFullYear() + "-" + twoDigits(1 + today.getUTCMonth()) + "-"
                + twoDigits(today.getUTCDate()) + "T" + twoDigits(today.getHours())
                + ":" + twoDigits(today.getMinutes()) + ":"
                + twoDigits(today.getSeconds()) + timezone;
            let currentRound = "";
            let currentSemester = "";
            let currentYear = data.year;
            let currentTutorialRound = "";
            if (currentDate >= data.moduleRound1StartDate && currentDate < data.moduleRound1EndDate) {
                currentRound = "1";
                currentSemester = data.semester;
            }
            else if (currentDate >= data.moduleRound2StartDate && currentDate < data.moduleRound2EndDate) {
                currentRound = "2";
                currentSemester = data.semester;
            }
            else if (currentDate >= data.moduleRound3StartDate && currentDate < data.moduleRound3EndDate) {
                currentRound = "3";
                currentSemester = data.semester;
            }
            if (currentDate >= data.tutorialRound1StartDate && currentDate < data.tutorialRound1EndDate) {
                currentTutorialRound = "1";
                currentSemester = data.semester;
            }
            else if (currentDate >= data.tutorialRound2StartDate && currentDate < data.tutorialRound2EndDate) {
                currentTutorialRound = "2";
                currentSemester = data.semester;
            }
            return {
                currentRound: currentRound,
                currentTutorialRound: currentTutorialRound,
                currentSemester: currentSemester,
                currentYear: currentYear
            }
        })
        .catch(error => {
            alert("error in axios " + error);
            return;
        });
}

function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}