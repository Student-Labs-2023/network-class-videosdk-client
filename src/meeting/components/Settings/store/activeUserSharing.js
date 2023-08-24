import { makeAutoObservable } from "mobx";
 
class activeUserSharing {
    state = "";
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