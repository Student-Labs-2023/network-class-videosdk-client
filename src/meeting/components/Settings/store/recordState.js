import { makeAutoObservable } from "mobx";
 
class recordState {
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
 
export default new recordState();
