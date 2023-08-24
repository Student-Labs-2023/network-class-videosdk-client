import { makeAutoObservable } from "mobx";
 
class microState {
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
 
export default new microState();
