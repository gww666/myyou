import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Home from "../containers/Home";
import Location from "../containers/Location";
import Details from "../containers/Details";
import ShowComments from "../containers/ShowComments";
import Cinemas from "../containers/Cinemas";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect : "/home"
    },
    {
      path: '/home',
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
    },
    {
      path: "/showcomments/:filmId/:filmName",
      name : "ShowComments",
      component: ShowComments
    },
    {
      path: "/cinemas",
      name : "Cinemas",
      component: Cinemas
    },
  ]
})
