import { makeAutoObservable } from "mobx";
 
class microphone {
    state = "";
    constructor() {
        makeAutoObservable(this)
    }
 
    change(microFor) {
        this.state = microFor;
    }
}
 
export default new microphone();
