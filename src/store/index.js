import Vuex from "vuex";
import Vue from "vue";
import home from "./modules/home";
import location from "./modules/location";
import {HOTBNAAER_LOADED, BANNER_IS_TOUCHING} from "./mutation-type";
import tabs from "./modules/tabs";

Vue.use(Vuex);

export default new Vuex.Store({
    state : {
        hotBannerLoaded : false,
        banner_is_touching: false
    },
    mutations : {
        [HOTBNAAER_LOADED] (state, isLoaded) {
            // console.log("33333333333");
            // console.log(isLoaded);
            state.hotBannerLoaded = isLoaded;
        },
        [BANNER_IS_TOUCHING] (state, isTouching) {
            // console.log("isTouching", isTouching);
            // console.log("BANNER_IS_TOUCHING");
            state.banner_is_touching = isTouching;
        }
    },
    modules : {
        home,
        location,
        tabs
    }
});