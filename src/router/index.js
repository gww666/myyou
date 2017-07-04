import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Home from "../containers/Home";
import Location from "../containers/Location";
import Details from "../containers/Details";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: "/location",
      name: "Location",
      component: Location
    },
    {
      path: "/details/:id",
      name: "Details",
      component: Details
    }
  ]
})
