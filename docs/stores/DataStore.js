import { action, computed, observable, toJS } from "mobx"
import axios from "axios";


class DataStore {
  @observable path = "/"
  @observable signInStatus = false
  @observable email = ""
  @observable password = ""
  @observable accessRight = ""
  @observable gender = ""
  @observable firstName = ""
  @observable lastName = ""
  @observable username = ""
  @observable userId = ""
  @observable mountSingleModuleIndex = ""
  @observable appealModuleId = ""
  @observable tutorialList = ""

  @action setSignInStatus(status, email, password, accessRight) {
    this.signInStatus = status;
    this.email = email;
    this.password = password;
    this.accessRight = accessRight;
    localStorage.setItem("email", this.email)
    localStorage.setItem("password", this.password)
    localStorage.setItem("accessRight", this.accessRight)
  }

  @action setSignOutStatus() {
    this.signInStatus = false;
    this.email = ""
    this.password = ""
    this.accessRight = ""
    this.gender = ""
    this.firstName = ""
    this.lastName = ""
    this.username = ""
    this.userId = ""
    this.mountSingleModuleIndex = ""
    this.allAppeals = ""
    this.path = "/"
    localStorage.clear();
  }

  @action setPath(path) {
    this.path = path;
    localStorage.setItem("path", this.path)
  }

  @computed get getPath() {
    return this.path;
  }

  @action setUserDetails(id, gender, firstName, lastName, username) {
    this.userId = id;
    this.gender = gender;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    localStorage.setItem("userId", this.userId)
    localStorage.setItem("gender", this.gender)
    localStorage.setItem("firstName", this.firstName)
    localStorage.setItem("lastName", this.lastName)
    localStorage.setItem("username", this.username)
  }

  @computed get getSignInStatus() {
    return this.signInStatus;
  }

  @computed get getAccessRight() {
    return this.accessRight;
  }

  @computed get getUserId() {
    return this.userId;
  }

  @action setMountSingleModuleIndex(index) {
    this.mountSingleModuleIndex = index;
  }

  @computed get getMountSingleModuleIndex() {
    return this.mountSingleModuleIndex;
  }

  @action setAppealModuleId(index) {
    this.appealModuleId = index;
    axios.get("http://localhost:8080/LMS-war/webresources/ModuleMounting/getAllTutorialByModule?moduleId=" + index)
      .then(result => this.tutorialList = result.data.tutorials)
      .catch(error => {
        console.error("error in axios " + error);
        alert("Please try again later")
      });
  }

  @computed get getTutorialList() {
    return toJS(this.tutorialList);
  }

}

export default DataStore;