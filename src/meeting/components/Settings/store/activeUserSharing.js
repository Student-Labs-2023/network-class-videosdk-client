import { makeAutoObservable } from "mobx";
 
class activeUserSharing {
    state = "";
    constructor() {
        makeAutoObservable(this)
    }

    on(id) {
        this.state = id;
    }

    off() {
        this.state = null;
    }
}
 
export default new activeUserSharing();