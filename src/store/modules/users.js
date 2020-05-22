import { ServiceFactory } from "../../api/ServiceFactory";

const userService = ServiceFactory.get("users");

export default function makeUsersModule() {
  const namespaced = true;

  const state = {
    usersState: [],
    totalUsers: null
  };

  const getters = {};

  const mutations = {
    setUsers: (state, newUsersState) => {
      state.usersState = newUsersState;
    },
    setTotal: (state, newTotaUsersState) => {
      state.totalUsers = newTotaUsersState;
    }
  };

  const actions = {
    storeUsers: ({ commit }, newUsersState) => {
      commit("setUsers", newUsersState);
    },
    storeUsersFromService: async ({ commit }, pages) => {
      const {
        data: { data: deepData, total }
      } = await userService.get(pages).catch(err => console.error(err));
      await commit("setUsers", deepData);
      await commit("setTotal", total);
    },
    createUserService: async () => {
      await userService.update().catch(err => console.error(err));
    }
  };

  return {
    namespaced,
    state,
    getters,
    mutations,
    actions
  };
}
