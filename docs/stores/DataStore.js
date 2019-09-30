import { action, computed, observable } from "mobx"

class DataStore {
  @observable signInStatus = false
  @observable email = ""
  @observable password = ""
  @observable accessRight = ""
  @observable path = "/"

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
    this.email = "";
    this.password = "";
    this.accessRight = "";
    this.path = "/"
    localStorage.clear();
  }

  @action setPath(path) {
    this.path = path;
  }

  @computed get getSignInStatus() {
    return this.signInStatus;
  }

  @computed get getAccessRight() {
    return this.accessRight;
  }

  @computed get getPath() {
    return this.path;
  }
}

export default DataStore;