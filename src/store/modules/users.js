import { ServiceFactory } from "../../api/ServiceFactory";

const userService = ServiceFactory.get("users");

export default function makeUsersModule() {
  const namespaced = true;

  const state = {
    usersState: [],
    totalUsers: null,
  };

  const getters = {};

  const mutations = {
    setUsers: (state, newUsersState) => {
      state.usersState = newUsersState;
    },
    updateUsers: (state, [id, data]) => {
      state.usersState = state.usersState.map((us) =>
        us.id === id ? { ...data } : us
      );
    },
    addUsers: (state, newUser) => {
      state.usersState = [...state.usersState, newUser];
    },
    deleteUser: (state, userId) => {
      state.usersState = state.usersState.filter((user) => user.id !== userId);
    },
    setTotal: (state, newTotaUsersState) => {
      state.totalUsers = newTotaUsersState;
    },
  };

  const actions = {
    storeUsers: ({ commit }, newUsersState) => {
      commit("setUsers", newUsersState);
    },
    storeUsersFromService: async ({ commit }, pages) => {
      await userService.get(pages).subscribe(
        ({ response: { total, data } }) => {
          commit("setTotal", total);
          commit("setUsers", data);
        },
        (err) => console.log(err)
      );
    },
    createUserService: async ({ commit }, data) => {
      await userService.create(data).subscribe(
        () => {},
        (err) => console.log(err)
      );
      await commit("addUsers", data);
    },
    updateUser: async ({ commit }, [id, data]) => {
      await userService.update(id, data).subscribe(
        () => {},
        (err) => console.log(err)
      );
      await commit("updateUsers", [id, data]);
    },
    deleteUser: async ({ commit }, userId) => {
      await userService.delete(+userId).subscribe(
        () => {},
        (err) => console.log(err)
      );
      await commit("deleteUser", userId);
    },
  };

  return {
    namespaced,
    state,
    getters,
    mutations,
    actions,
  };
}
