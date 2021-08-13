<template>
  <div class="contacts-page">
    <daniko-notification
      :isActive="isNotificationOpen"
      :heading="notificationHeading"
      :text="notificationText"
      @close-notification="isNotificationOpen = false"
      :status="notificationStatus"
    />
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
          placeholder="+7 (000)-000-00-00"
          v-model="newContacts.phone"
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
          title="Адрес"
          placeholder="Введите адрес"
          v-model="newContacts.address"
        />
        <daniko-input
          class="right-block-input"
          title="Почтовый индекс"
          placeholder="Введите почтовый индекс"
          v-model="newContacts.postIndex"
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
            :coords="[
              newContacts.coords.split(',')[0] || 0,
              newContacts.coords.split(',')[1] || 0,
            ]"
            :zoom="18"
            style="width: 100%; height: 100%"
          >
            <ymap-marker
              marker-id="1"
              :coords="[
                newContacts.coords.split(',')[0] || 0,
                newContacts.coords.split(',')[1] || 0,
              ]"
            ></ymap-marker>
          </yandex-map>
        </div>
        <daniko-button
          :loading="buttonLoading"
          class="right-block-button"
          @click="handleSaveContacts"
          >Сохранить</daniko-button
        >
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
          <span class="contact-data">{{
            contacts.phone ? contacts.phone : "-"
          }}</span>
        </div>
        <div class="contact">
          <span class="contact-label">Электронная почта:</span>
          <span class="contact-data">{{ contacts.email || "-" }}</span>
        </div>
        <div class="contact">
          <span class="contact-label">Почтовый индекс:</span>
          <span class="contact-data">{{ contacts.postIndex || "-" }}</span>
        </div>
        <div class="contact">
          <span class="contact-label">Адрес:</span>
          <span class="contact-data">{{ contacts.address || "-" }}</span>
        </div>
        <div class="contacts-map">
          <yandex-map
            :coords="[contacts.lat, contacts.lon]"
            :zoom="16"
            style="width: 100%; height: 100%"
          >
            <ymap-marker
              marker-id="1"
              :coords="[contacts.lat, contacts.lon]"
            ></ymap-marker>
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
import danikoNotification from "@/components/common/daniko-notification.vue";
import ContactsRequests from "@/requests/contacts.js";

export default {
  components: {
    "daniko-button": danikoButton,
    "daniko-right-block": danikoRightBlock,
    "daniko-input": danikoInput,
    "daniko-notification": danikoNotification,
  },

  data() {
    return {
      isNotificationOpen: false,
      notificationHeading: "",
      notificationText: "",
      notificationStatus: "error",
      contacts: {
        phone: "",
        email: "",
        address: "",
        postIndex: "",
        lat: 0,
        lon: 0,
      },
      isRightBlockOpen: false,
      newContacts: {
        phone: "",
        email: "",
        address: "",
        postIndex: "",
        coords: "",
      },
      phoneMask: "+7 (###)-###-##-##",
      buttonLoading: false,
      dataLoading: false,
    };
  },

  mounted() {
    this.getContacts();
  },

  watch: {
    isRightBlockOpen() {
      if (this.isRightBlockOpen) {
        this.contacts.phone
          ? (this.newContacts.phone = this.contacts.phone)
          : "";
        this.newContacts.email = this.contacts.email;
        this.newContacts.address = this.contacts.address;
        this.newContacts.postIndex = this.contacts.postIndex;
        this.newContacts.coords =
          (this.contacts.lat || 0) + ", " + (this.contacts.lon || 0);
      }
    },
  },

  methods: {
    getContacts() {
      ContactsRequests.findAll().then((res) => {
        if (res.contacts.phone) this.contacts.phone = res.contacts.phone;
        if (res.contacts.email) this.contacts.email = res.contacts.email;
        if (res.contacts.address) this.contacts.address = res.contacts.address;
        if (res.contacts.postIndex)
          this.contacts.postIndex = res.contacts.postIndex;
        if (res.contacts.coords) this.contacts.coords = res.contacts.coords;
      });
    },

    handleSaveContacts() {
      this.buttonLoading = true;
      const copyContacts = this.newContacts;
      const payload = { ...copyContacts };
      payload.lat = payload.coords.split(",")[0].trim();
      payload.lon = payload.coords.split(",")[1].trim();
      delete payload.coords;

      ContactsRequests.update(payload)
        .then(() => {
          this.notificationHeading = "Контакты обновлены";
          this.notificationText = "Данные новых контактов сохранены";
          this.notificationStatus = "success";
          this.isNotificationOpen = true;
          this.isRightBlockOpen = false;

          this.getContacts();
        })
        .catch(() => {
          this.notificationHeading = "Произошла ошибка";
          this.notificationText =
            "Проверьте подключение к интернету и попробуйте снова";
          this.notificationStatus = "error";
          this.isNotificationOpen = true;
        })
        .finally(() => {
          this.buttonLoading = false;
        });
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
