<template>
  <div class="contacts-page">
    <header class="contacts-header">
      <h2 class="contacts-title">Контакты</h2>
      <daniko-button>Редактировать</daniko-button>
    </header>
    <div class="contacts-content">
      <div class="contacts-container">
        <div class="contact">
          <span class="contact-label">Номер телефона:</span>
          <span class="contact-data">{{ contacts.phoneNumber }}</span>
        </div>
        <div class="contact">
          <span class="contact-label">Электронная почта:</span>
          <span class="contact-data">{{ contacts.email }}</span>
        </div>
        <div class="contact">
          <span class="contact-label">Почтовый индекс:</span>
          <span class="contact-data">{{ contacts.mailIndex }}</span>
        </div>
        <div class="contact">
          <span class="contact-label">Адрес:</span>
          <span class="contact-data">{{ contacts.address }}</span>
        </div>
        <div class="contacts-map">
          <yandex-map
            :coords="contacts.coords"
            :zoom="16"
            style="width: 100%; height: 100%"
          >
            <ymap-marker marker-id="1" :coords="contacts.coords"></ymap-marker>
          </yandex-map>
        </div>
      </div>
      <img
        src="@/assets/images/contacts-image.svg"
        alt="Контакты"
        class="contacts-image"
      />
    </div>
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

.contacts {
  width: 100%;
  display: flex;
  flex-direction: column;

  &-header {
    margin-bottom: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &-title {
    color: $main-dark;
    font-size: 28px;
    font-weight: bold;
  }

  &-content {
    padding-top: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &-container {
    display: flex;
    flex-direction: column;
  }

  &-image {
    width: 50%;
  }

  &-map {
    margin-top: 30px;
    width: 350px;
    height: 250px;
    border-radius: 10px;
    background-color: #dbdbdb;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }
}

.contact {
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: $main-dark;
  font-size: 18px;

  &-label {
    margin-right: 10px;
  }

  &-data {
    color: $primary;
  }
}
</style>
