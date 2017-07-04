import {LOCATION_UPDATE} from "../mutation-type";

const location = {
    namespaced: true,
    state : {
        location: {
            cityName: "深圳",
            cityId: 10
        }
    },
    mutations : {
        [LOCATION_UPDATE] (state, location) {
            state.location.cityName = location.cityName;
            state.location.cityId = location.cityId;
        }
    }
}

export default location;