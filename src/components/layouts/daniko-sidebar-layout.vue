<template>
  <div class="page">
    <daniko-sidebar class="page-sidebar" />
    <div class="page-content"></div>
  </div>
</template>

<script>
import danikoSidebar from "@/components/common/daniko-sidebar.vue";

export default {
  components: {
    "daniko-sidebar": danikoSidebar,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.page {
  position: relative;

  &-sidebar {
    position: fixed;
    left: 0;
    top: 0;
  }

  &-content {
    margin-left: 300px;
    width: calc(100vw - 300px);
    min-height: 100vh;
  }
}
</style>
