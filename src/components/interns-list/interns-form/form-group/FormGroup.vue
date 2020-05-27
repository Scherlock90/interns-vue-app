<template>
  <b-form-group :id="inputGroupId" :label="label" :label-for="inputId">
    <b-form-input
      :id="inputId"
      type="text"
      :value="value"
      :placeholder="placeholder"
      @keyup="onChange($event)"
      required
    ></b-form-input>
  </b-form-group>
</template>

<script>
export default {
  props: {
    inputGroupId: { type: String, required: true },
    label: { type: String, required: true },
    inputId: { type: String, required: true },
    placeholder: { type: String, required: true },
    value: { type: String, required: true },
  },
  methods: {
    onChange: function(event) {
      this.$emit("update:value", event.target.value);
    }
  }
};
</script>
