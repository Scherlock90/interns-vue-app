import Vue from "vue";
import VueRouter from "vue-router";
import ListInterns from "../views/ListInterns.vue";

const lazyLoad = view => {
  return () => import(`@/views/${view}.vue`);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "ListInterns",
    component: ListInterns
  },
  {
    path: "/add-interns",
    name: "AddInterns",
    component: lazyLoad("AddInterns")
  },
  {
    path: "/edit-interns",
    name: "EditInterns",
    component: lazyLoad("AddInterns")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
