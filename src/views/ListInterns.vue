<template>
  <div class="list-interns">
    <div class="page-name">Users list</div>
    <InternList />
  </div>
</template>

<script>
import InternList from "@/components/interns-list/InternsList.vue";

export default {
  components: {
    InternList,
  },
};
</script>

<style lang="scss" scope>
@import "../assets/styles/app.scss";

.list-interns {
  min-height: 100vh;
  display: block;
  align-items: center;

  .page-name {
    text-align: left;
    padding: 2rem 5rem;
    width: 100%;
    font-size: 2rem;

    @include sm-max {
      padding: 1rem 0;
      text-align: center;
    }
  }
}
</style>
