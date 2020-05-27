<template>
  <b-container fluid>
    <div class="container-button">
      <b-button variant="success" @click="goToPage('/add-interns')">
        <b-icon icon="plus"></b-icon>
        Add Interns
      </b-button>
    </div>
    <b-table-lite
      show-empty
      small
      label-cols-sm="3"
      :items="users"
      :fields="fields"
      :current-page="currentPage"
    >
      <template v-slot:cell(actions)="row">
        <b-icon
          @click="goToPage('/edit-interns')"
          icon="pencil-square"
          style="width: 30px; height: 30px;"
          class="icons"
        ></b-icon>
        <b-icon
          @click="info(row.item, row.index, $event.target)"
          icon="trash"
          style="width: 30px; height: 30px;"
          class="icons"
        ></b-icon>
      </template>

      <template v-slot:cell(avatar)="row">
        <img
          class="image-list"
          :src="row.item.avatar"
          :alt="row.item.fullname"
        />
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
    </b-table-lite>

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
          align="fill"
          size="sm"
          class="my-0"
          @change="(page) => takeCurrentPage(page)"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import router from "@/router/index";
import * as ns from "@/store/namespaces";

export default {
  computed: {
    ...mapState(ns.USERS, ["usersState", "totalUsers"]),
    hasUsers: {
      get() {
        return this.usersState;
      },
      set(value) {
        this.storeUsers(value);
      },
    },
    hasTotalUsers: {
      get() {
        return this.totalUsers;
      },
    },
  },

  data() {
    return {
      users: [],
      fields: [
        { key: "avatar", label: "", tdClass: "avatar" },
        { key: "fullname", label: "Full Name", tdClass: "fullname" },
        { key: "actions", label: "Actions", tdClass: "actions" },
      ],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      currentPage: 1,
      perPage: 7,
    };
  },

  async mounted() {
    await this.updateUsers();
  },

  methods: {
    ...mapActions({
      setUser: "users/storeUsers",
      userFromApi: "users/storeUsersFromService",
      createUser: "users/createUserService",
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
          id,
        })
      ));
    },

    info(item, index, button) {
      console.log(JSON.stringify(item, null, 2))
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },

    goToPage(page) {
      router.push({ path: page });
    },
  },
};
</script>

<style lang="scss" scope>
@import "../../assets/styles/app.scss";

.container-fluid {
  background-color: #ffffff;
  width: 90%;

  .icons {
    cursor: pointer;
  }

  @include lg {
    .image-list {
      width: 40%;
      border-radius: 100%;
    }

    .avatar {
      max-width: 20px;
    }

    .fullname {
      max-width: 60px;
      text-align: left;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
    }
  }
}

.container-button {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.modal-dialog {
  max-width: 1200px;
  padding: 1rem;
}
</style>
