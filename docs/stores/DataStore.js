import { action, computed, observable } from "mobx"

class DataStore {
  @observable signInStatus = false
  @observable email = ""
  @observable password = ""
  @observable userType = ""

  @action setSignInStatus (status, email, password) {
    this.signInStatus = status;
    this.email = email;
    this.password = password;
  }

  @action setSignOutStatus ()  {
    this.signInStatus = false;
  }

  @computed get getSignInStatus() {
    return this.signInStatus;
  }
}

export default DataStore;