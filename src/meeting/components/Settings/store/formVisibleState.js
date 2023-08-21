import { makeAutoObservable } from "mobx";
 
class FormVisibleState {
    state = "my";
    constructor() {
        makeAutoObservable(this)
    }
 
    openMy() {
        this.state = 'my';
    }

    openChannel() {
        this.state = 'channel';
    }
}
 
export default new FormVisibleState();
