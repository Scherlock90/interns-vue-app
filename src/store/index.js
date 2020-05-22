// import Vue from "vue";
// import Vuex from "vuex";

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {}
// });

import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

import makeUserModule from "./modules/users";

Vue.use(Vuex);

export default function makeStore(api) {
  return new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {
      routerPush(_, arg) {
        router.push(arg);
      }
    },
    modules: {
      users: makeUserModule(api)
    }
  });
}
