<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$route.path == "/") {
      this.$router.push("/workers");
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/global.scss";
</style>
