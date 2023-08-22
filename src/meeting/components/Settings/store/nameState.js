import { makeAutoObservable } from "mobx";
 
class nameState {
    state = "";
    constructor() {
        makeAutoObservable(this)
    }
 
    change(value) {
        this.state = value;
    }
}
 
export default new nameState();
