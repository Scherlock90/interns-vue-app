<template>
  <b-container fluid>
    <div class="container-button">
      <b-button variant="success" v-b-modal.modal-center @click="action('add')">
        <b-icon icon="plus"></b-icon>
        Add Interns
      </b-button>
      <b-modal
        id="modal-center"
        centered
        :title="titleModal"
        :ok-title="buttonName"
        ok-variant="success"
        @ok="methodApi"
        :ok-disabled="!disabledOKButton"
      >
        <Form :formValue.sync="form" />
      </b-modal>
    </div>
    <b-table-lite
      striped
      hover
      show-empty
      small
      label-cols-sm="3"
      :items="users"
      :fields="fields"
      :current-page="currentPage"
    >
      <template v-slot:cell(actions)="row">
        <b-icon
          v-b-modal.modal-center
          @click="action('edit', row.item.id)"
          icon="pencil-square"
          style="width: 20px; height: 20px; margin-right: 0.5rem;"
          class="icons"
        ></b-icon>
        <b-icon
          @click="removeUser(row.item)"
          icon="trash"
          style="width: 20px; height: 20px; margin-left: 0.5rem;"
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
import * as ns from "@/store/namespaces";
import Form from "./interns-form/Form";

export default {
  components: {
    Form,
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
      form: {},
      apiAction: "",
      userId: null,
    };
  },

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
    },
    methodApi() {
      return this.apiAction === "add" ? this.onSubmit : this.updateUserDetails;
    },
    titleModal() {
      return this.apiAction === "add" ? "Add interns" : "Edit intnerns";
    },
    buttonName() {
      return this.apiAction === "add" ? "Add interns" : "Edit intnerns";
    },
    disabledOKButton() {
      const { first_name, last_name, avatar } = this.form;
      return (first_name && last_name && avatar) !== "";
    }
  },

  async mounted() {
    await this.takeUsers();
  },

  methods: {
    ...mapActions({
      setUsers: "users/storeUsers",
      createUser: "users/createUser",
      deleteUser: "users/deleteUser",
      updateUser: "users/updateUser"
    }),

    action(action, userId = null) {
      this.apiAction = action;
      this.userId = userId;
    },

    takeCurrentPage(page) {
      this.takeUsers(page);
    },

    async takeUsers(pages = 1) {
      await this.tryCatch(this.setUsers(pages));
      this.updateArray();
    },

    async onSubmit() {
      const data = { ...this.form, id: Math.random() };

      await this.tryCatch(this.createUser(data));
      this.updateArray();
    },

    async updateUserDetails() {
      const data = { ...this.form, id: this.userId };

      await this.tryCatch(this.updateUser([this.userId, data]));
      this.updateArray();
    },

    async removeUser({ id }) {
      await this.tryCatch(this.deleteUser(id));
      this.updateArray();
    },

    tryCatch(setFunction) {
      try {
        setFunction;
      } catch (err) {
        console.log(err);
      }
    },

    updateArray() {
      setTimeout(() => {
        (this.users = this.hasUsers), this.convertedInternsArray();
      }, 300);
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
  },
};
</script>

<style lang="scss" scope>
@import "../../assets/styles/app.scss";

.modal-open {
  @include sm-max {
    padding-right: 0 !important;
  }

  @include md {
    padding-right: 0 !important;
  }
}

.modal-dialog {
  @include sm-max {
    padding: 0 !important;
  }
}

.modal-content {
  width: 96%;

  @include md {
    width: 95%;
    margin: auto;
  }
}

.modal-footer {
  button {
    @include sm-max {
      width: 100%;
    }
  }

  .btn-secondary {
    @include sm-max {
      width: 100%;
      order: 1;
    }
  }

  .btn-success {
    @include sm-max {
      width: 100%;
      order: 0;
    }
  }
}

.container-fluid {
  background-color: #ffffff;
  width: 90%;

  @include sm-max {
    width: 100%;
    padding: 0;
  }

  .table thead th {
    @include sm-max {
      display: none;
    }

    &:nth-child(2) {
      text-align: start;
    }

    &:nth-child(3) {
      text-align: end;
    }
  }

  tr {
    @include sm-max {
      border: 2px solid #dee2e6;
    }
  }

  .table-sm th,
  .table-sm td {
    @include sm-max {
      display: flex;
      justify-content: space-evenly;
      border-top: none;
    }
  }

  .icons {
    cursor: pointer;
  }

  .image-list {
    border-radius: 100%;
    @include lg {
      width: 40%;
    }
  }

  .avatar {
    @include lg {
      max-width: 20px;
    }
  }

  .fullname {
    @include lg {
      max-width: 60px;
      text-align: left;
    }
  }

  .actions {
    @include lg {
      display: flex;
      justify-content: flex-end;
    }
  }
}

.container-button {
  width: 100%;
  display: flex;
  justify-content: flex-end;

  button {
    @include sm-max {
      width: 100%;
    }
  }

  @include md {
    padding: 1rem;
  }

  @include xl {
    padding: 1rem 0 1rem 1rem;
  }
}

.modal-dialog {
  max-width: 1200px;
  padding: 1rem;
}
</style>
