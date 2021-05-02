<template>
  <div class="contacts-page">
    <daniko-right-block
      :isOpen="isRightBlockOpen"
      title="Редактирование контаков"
      @close-right-block="isRightBlockOpen = false"
    >
      <div class="right-block-component">
        <daniko-input
          class="right-block-input"
          title="Номер телефона"
          type="tel"
          placeholder="Введите контактный номер телефона"
          v-model="newContacts.phoneNumber"
          v-mask="phoneMask"
        />
        <daniko-input
          class="right-block-input"
          title="Электрооная почта"
          type="email"
          placeholder="Введите контактную электронную почту"
          v-model="newContacts.email"
        />
        <daniko-input
          class="right-block-input"
          title="Почтовый индекс"
          placeholder="Введите почтовый индекс"
          v-model="newContacts.mailIndex"
        />
        <daniko-input
          class="right-block-input"
          title="Координаты"
          type="text"
          only="number"
          placeholder="42.924320, 71.380932"
          v-model="newContacts.coords"
        />
        <div class="right-block-map">
          <yandex-map
            :coords="getNewCoords"
            :zoom="18"
            style="width: 100%; height: 100%"
          >
            <ymap-marker marker-id="1" :coords="getNewCoords"></ymap-marker>
          </yandex-map>
        </div>
        <daniko-button class="right-block-button">Сохранить</daniko-button>
      </div>
    </daniko-right-block>
    <header class="contacts-header">
      <h2 class="contacts-title">Контакты</h2>
      <daniko-button @click="isRightBlockOpen = true"
        >Редактировать</daniko-button
      >
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
import danikoInput from "@/components/common/daniko-input.vue";
import danikoRightBlock from "@/components/common/daniko-right-block.vue";
import contacts from "@/data/contacts.js";

export default {
  components: {
    "daniko-button": danikoButton,
    "daniko-right-block": danikoRightBlock,
    "daniko-input": danikoInput,
  },

  data() {
    return {
      contacts: contacts,
      isRightBlockOpen: false,
      newContacts: {
        phoneNumber: "",
        email: "",
        mailIndex: "",
        mapcoords: "",
        coords: "",
      },
      phoneMask: "+7 (###)-###-##-##",
    };
  },

  watch: {
    isRightBlockOpen() {
      if (this.isRightBlockOpen) {
        this.newContacts.phoneNumber = this.contacts.phoneNumber;
        this.newContacts.email = this.contacts.email;
        this.newContacts.mailIndex = this.contacts.mailIndex;
        this.newContacts.coords =
          String(this.contacts.coords[0]) +
          ", " +
          String(this.contacts.coords[1]);
      }
    },
  },

  computed: {
    getNewCoords() {
      if (this.newContacts.coords.trim()) {
        const coords = this.newContacts.coords.split(",");
        coords[0] = Number(coords[0]);
        coords[1] = Number(coords[1]);
        return coords;
      } else {
        return [0, 0];
      }
    },
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

.right-block {
  &-component {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &-input {
    margin-bottom: 25px;
  }

  &-button {
    margin-top: 10px;
  }

  &-map {
    margin-bottom: 25px;
    width: 100%;
    height: 200px;
    border-radius: 10px;
    background-color: #dbdbdb;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }
}
</style>
