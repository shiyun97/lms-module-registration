import { action, computed, observable } from "mobx"

class DataStore {
  @observable signInStatus = false
  @observable email = ""

  @action setSignInStatus (status, email) {
    this.signInStatus = status;
    this.email = email;
  }

  @action setSignOutStatus ()  {
    this.signInStatus = false;
  }

  @computed get getSignInStatus() {
    return this.signInStatus;
  }
}

export default DataStore;