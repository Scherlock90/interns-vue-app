import Vue from "vue";
import VueRouter from "vue-router";
import ListInterns from "../views/ListInterns.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "ListInterns",
    component: ListInterns
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
