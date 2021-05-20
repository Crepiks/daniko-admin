<template>
  <div class="page">
    <daniko-sidebar @open-profile="isProfileOpen = true" class="page-sidebar" />
    <div class="page-content">
      <router-view />
      <daniko-profile
        :isOpen="isProfileOpen"
        @close-profile="isProfileOpen = false"
      />
    </div>
  </div>
</template>

<script>
import danikoSidebar from "@/components/common/daniko-sidebar.vue";
import danikoProfile from "../common/daniko-profile.vue";

export default {
  components: {
    "daniko-sidebar": danikoSidebar,
    "daniko-profile": danikoProfile,
  },

  data() {
    return {
      isProfileOpen: false,
    };
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
    padding: 50px;
    margin-left: 300px;
    width: calc(100vw - 300px);
    min-height: 100vh;
    box-sizing: border-box;
  }
}
</style>
