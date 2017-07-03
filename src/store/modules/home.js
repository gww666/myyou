import {HOME_TOPTABS_ACTIVEINDEX} from "../mutation-type";
const home = {
    namespaced: true,
    state : {
        HOME_TOPTABS_ACTIVEINDEX : -1,

    },
    mutations : {
        [HOME_TOPTABS_ACTIVEINDEX] (state, index) {
            state.HOME_TOPTABS_ACTIVEINDEX = index;
        }
    }
}
export default home;