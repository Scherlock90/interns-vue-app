import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

const lazyLoad = view => {
  return () => import(`@/views/${view}.vue`);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/add-interns",
    name: "AddInterns",
    component: lazyLoad("AddInterns")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
