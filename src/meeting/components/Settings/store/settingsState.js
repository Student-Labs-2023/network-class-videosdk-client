import { makeAutoObservable } from "mobx";
 
class SettingsState {
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
 
export default new SettingsState();