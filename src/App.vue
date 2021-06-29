<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$router.push("/").catch(() => {});
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/global.scss";
</style>
