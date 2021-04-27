<template>
  <div class="contacts-page">
    <header class="contacts-header">
      <h2 class="contacts-title">Контакты</h2>
      <daniko-button>Редактировать</daniko-button>
    </header>
  </div>
</template>

<script>
import danikoButton from "@/components/common/daniko-button.vue";
import contacts from "@/data/contacts.js";

export default {
  components: {
    "daniko-button": danikoButton,
  },

  data() {
    return {
      contacts: contacts,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
</style>
