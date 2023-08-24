import { makeAutoObservable } from "mobx";
 
class mic {
    state = "";
    constructor() {
        makeAutoObservable(this)
    }
 
    change(value) {
        this.state = value;
    }
}
 
export default new mic();