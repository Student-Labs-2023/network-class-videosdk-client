import { makeAutoObservable } from "mobx";
 
class webcamState {
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
 
export default new webcamState();
