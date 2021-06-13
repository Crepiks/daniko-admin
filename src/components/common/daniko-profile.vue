<template>
  <div class="profile">
    <daniko-notification
      :isActive="isNotificationOpen"
      :heading="notificationHeading"
      :text="notificationText"
      @close-notification="isNotificationOpen = false"
      :status="notificationStatus"
    />
    <daniko-right-block
      :isOpen="isOpen"
      title="Редактирование профиля"
      @close-right-block="$emit('close-profile')"
    >
      <div class="right-block-component">
        <daniko-input
          class="right-block-input"
          title="Текущая электрооная почта"
          type="email"
          placeholder="Введите текущую электронную почту"
          v-model="email"
        />
        <daniko-input
          class="right-block-input"
          title="Новая электрооная почта"
          type="email"
          placeholder="Введите новую электронную почту"
          v-model="newEmail"
        />
        <daniko-button class="right-block-button" @click="handleChangingEmail"
          >Сменить почту</daniko-button
        >
        <daniko-input
          class="right-block-input"
          title="Текущий пароль"
          type="password"
          placeholder="Введите текущий пароль"
          v-model="password"
        />
        <daniko-input
          class="right-block-input"
          title="Новый пароль"
          type="password"
          placeholder="Введите новый пароль"
          v-model="newPassword"
        />
        <daniko-button
          class="right-block-button"
          @click="handleChangingPassword"
          >Сменить пароль</daniko-button
        >
      </div>
    </daniko-right-block>
  </div>
</template>

<script>
import danikoButton from "@/components/common/daniko-button.vue";
import danikoInput from "@/components/common/daniko-input.vue";
import danikoRightBlock from "@/components/common/daniko-right-block.vue";
import danikoNotification from "@/components/common/daniko-notification.vue";
import { mapGetters } from "vuex";

export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    "daniko-button": danikoButton,
    "daniko-right-block": danikoRightBlock,
    "daniko-input": danikoInput,
    "daniko-notification": danikoNotification,
  },

  data() {
    return {
      email: "",
      newEmail: "",
      password: "",
      newPassword: "",
      isNotificationOpen: false,
      notificationHeading: "",
      notificationText: "",
      notificationStatus: "error",
    };
  },

  methods: {
    handleChangingEmail() {
      if (this.email.trim() && this.newEmail.trim()) {
        if (this.email.trim() == mapGetters("userEmail")) {
          // запрос
        } else {
          this.notificationHeading = "Неверная текущая электронаая почта";
          this.notificationText =
            "Для обновления почты нужно ввести текущую почту аккаунта. Попробуй снова";
          this.notificationStatus = "error";
          this.isNotificationOpen = true;
        }
        this.$emit("close-profile");
        this.notificationHeading = "Почта обновлена";
        this.notificationText =
          "Используйте новую почту для входа в админ панель";
        this.notificationStatus = "success";
        this.isNotificationOpen = true;
      } else {
        this.notificationHeading = "Заполните все поля";
        this.notificationText =
          "Заполните поля текущей и новой электронной почты";
        this.notificationStatus = "error";
        this.isNotificationOpen = true;
      }
    },

    handleChangingPassword() {
      if (this.password.trim() && this.newPassword.trim()) {
        this.$emit("close-profile");
        this.notificationHeading = "Пароль обновлен";
        this.notificationText =
          "Используйте новый пароль для входа в админ панель";
        this.notificationStatus = "success";
        this.isNotificationOpen = true;
      } else {
        this.notificationHeading = "Заполните все поля";
        this.notificationText = "Заполните поля текущего и нового пароля";
        this.notificationStatus = "error";
        this.isNotificationOpen = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

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
    margin-bottom: 50px;
  }
}
</style>
