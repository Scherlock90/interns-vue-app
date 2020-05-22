<template>
  <b-container fluid>
    <b-table
      show-empty
      small
      stacked="md"
      label-cols-sm="3"
      :items="users"
      :fields="fields"
      :current-page="currentPage"
    >
      <template v-slot:cell(actions)="row">
        <b-button
          size="sm"
          @click="info(row.item, row.index, $event.target)"
          class="mr-1"
        >
          Edit
        </b-button>
        <b-button
          size="sm"
          @click="info(row.item, row.index, $event.target)"
          class="mr-1"
        >
          Remove
        </b-button>
      </template>

      <template v-slot:cell(avatar)="row">
        <img :src="row.item.avatar" :alt="row.item.fullname" />
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
      ok-only
      @hide="resetInfoModal"
    >
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
    <b-row>
      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="hasTotalUsers"
          :per-page="perPage"
          @change="page => takeCurrentPage(page)"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import * as ns from "../../store/namespaces";
export default {
  computed: {
    ...mapState(ns.USERS, ["usersState", "totalUsers"]),
    hasUsers: {
      get() {
        return this.usersState;
      },
      set(value) {
        this.storeUsers(value);
      }
    },
    hasTotalUsers: {
      get() {
        return this.totalUsers;
      }
    }
  },

  data() {
    return {
      users: [],
      fields: [
        { key: "avatar", label: "" },
        { key: "fullname", label: "fullname" },
        { key: "id", label: "action" },
        { key: "actions", label: "Actions" }
      ],
      infoModal: {
        id: "info-modal",
        title: "",
        content: ""
      },
      currentPage: 1,
      perPage: 6
    };
  },

  async mounted() {
    await this.updateUsers();
    await this.createUser();
  },

  methods: {
    ...mapActions({
      setUser: "users/storeUsers",
      userFromApi: "users/storeUsersFromService",
      createUser: "users/createUserService"
    }),

    takeCurrentPage(page) {
      this.updateUsers(page);
    },

    async updateUsers(pages = 1) {
      try {
        await this.userFromApi(pages);
      } catch (err) {
        console.log(err);
      }
      this.users = this.hasUsers;
      this.convertedInternsArray();
    },

    convertedInternsArray() {
      return (this.users = this.users.map(
        ({ avatar, first_name, last_name, id }) => ({
          fullname: first_name + " " + last_name,
          avatar,
          id
        })
      ));
    },

    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    }
  }
};
</script>

<style lang="scss" scope></style>
