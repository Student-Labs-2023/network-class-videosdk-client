import { makeAutoObservable } from "mobx";
 
class screenshareState {
    state = "";
    constructor() {
        makeAutoObservable(this)
    }
 
    changeForAll() {
        this.state = 'all';
    }

    changeForOwner() {
        this.state = 'owner';
    }
}
 
export default new screenshareState();
