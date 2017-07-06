import {TABS_INDEX_UPDATE} from "../mutation-type";
const tabs = {
    namespaced: true,
    state : {
        tabs_active_index : 0,

    },
    mutations : {
        [TABS_INDEX_UPDATE] (state, index) {
            state.tabs_active_index = index;
        }
    }
}
export default tabs;