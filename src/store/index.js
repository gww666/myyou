import Vuex from "vuex";
import Vue from "vue";
import {HOTBNAAER_LOADED} from "./mutation-type";

Vue.use(Vuex);

export default new Vuex.Store({
    state : {
        hotBannerLoaded : false
    },
    mutations : {
        [HOTBNAAER_LOADED] (state, isLoaded) {
            console.log("33333333333");
            console.log(isLoaded);
            state.hotBannerLoaded = isLoaded;
        }
    }
});