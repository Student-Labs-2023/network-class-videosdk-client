import { makeAutoObservable } from "mobx";
 
class activeUserSharing {
    state = "anton@gmail.com";
    constructor() {
        makeAutoObservable(this)
    }

    on(email) {
        this.state = email;
    }

    off() {
        this.state = null;
    }
}
 
export default new activeUserSharing();