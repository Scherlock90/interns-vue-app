<template>
  <div>
    <b-form v-if="show" @click="onSubmitValue">
      <div class="form-container">
        <div class="form-container__group">
          <FormGroup
            inputGroupId="first-group"
            label="First Name"
            inputId="firstName"
            placeholder="Enter first name"
            :value.sync="form.first_name"
          />
          <FormGroup
            inputGroupId="second-group"
            label="Last Name"
            inputId="lastName"
            placeholder="Enter Last name"
            :value.sync="form.last_name"
          />
        </div>
      </div>
      <div class="container-image">
        <b-icon v-if="!file" icon="people-circle" class="icon-face"></b-icon>
        <img v-else class="image-blob" :src="file" alt="add user face" />
        <div>
          <label for="files" class="btn">
            <b-icon icon="camera" class="icon-photo"></b-icon>
            Change Photo
          </label>
          <input
            id="files"
            class="mt-3"
            style="visibility:hidden; z-index: 100000000"
            accept=".jpg, .jpeg, .png"
            type="file"
            plain
            @input="(f) => createImageUrl(f)"
          />
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
import FormGroup from "./form-group/FormGroup";
import CreateImageUrl from "@/api/image-service/image.service";

export default {
  components: {
    FormGroup,
  },

  data() {
    return {
      file: null,
      form: {
        first_name: "",
        last_name: "",
        avatar: ""
      },
      show: true,
    };
  },

  computed: {
    isDisabled() {
      const { first_name, last_name, avatar } = this.form;
      return (first_name && last_name && avatar) !== "";
    },
    buttonName() {
      return this.$route.path === "/edit-interns"
        ? "Update details"
        : "Add interns";
    },
  },

  methods: {

    onSubmitValue() {
      this.$emit("update:formValue", this.form);
    },

    createImageUrl(file) {
      const blobImage = URL.createObjectURL(file.target.files[0]);

      this.toDataUrl(blobImage, myBase64 => {
        CreateImageUrl.create(myBase64.slice(23)).subscribe(
          ({
            response: {
              data: { url }
            }
          }) => {
            this.form.avatar = url;
          },
          err => console.log(err)
        );
      });

      this.file = blobImage;
    },

    toDataUrl(url, callback) {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
          callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    },
  },
};
</script>

<style scoped lang="scss">
form {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 3rem;

  .form-container {
    background-color: #ffffff;
    width: 65%;
    min-height: 16rem;
    padding: 1rem;

    &__group {
      display: flex;
      width: 100%;
      min-height: 11rem;

      #first-group {
        width: 100%;
        margin: 1rem 1rem 1rem 0;

        label {
          display: flex;
        }
      }

      #second-group {
        width: 100%;
        margin: 1rem;

        label {
          display: flex;
        }
      }
    }

    &__buttons {
      display: flex;
    }
  }
  .container-image {
    width: 30%;
    min-height: 16rem;
    margin: 1rem;
    padding: 1rem;
    background-color: #ffffff;
    position: relative;

    .image-blob {
      height: 7rem;
      width: 7rem;
      border-radius: 100%;
      position: relative;
      top: 2rem;
    }

    .icon-face {
      margin-left: auto;
      margin-right: auto;
      width: 100px;
      height: 100px;
      position: relative;
      top: 2rem;
    }

    .icon-photo {
      width: 20px;
      height: 20px;
    }

    .btn {
      width: 100%;
      top: 5rem;
      position: relative;
      z-index: 111;
      color: rgb(7, 7, 7) !important;
      border: 1px solid rgb(7, 7, 7) !important;
      border-color: #007bff;
      display: inline-block;
      font-weight: 400;
      color: #212529;
      text-align: center;
      vertical-align: middle;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      background-color: transparent;
      border: 1px solid transparent;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      line-height: 1.5;
      border-radius: 0.25rem;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
  }
}
</style>
