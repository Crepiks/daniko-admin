<template>
  <div class="login-page">
    <daniko-notification
      :isActive="isNotificationOpen"
      :heading="notificationHeading"
      :text="notificationText"
      @close-notification="isNotificationOpen = false"
      :status="notificationStatus"
    />
    <img src="@/assets/images/logo.svg" alt="Daniko" class="login-logo" />
    <form @submit.prevent="handleLogin" class="login-form">
      <h2 class="login-title">Вход в админ панель</h2>
      <daniko-input
        class="login-input"
        title="Почта"
        type="email"
        placeholder="Введите электронную почту"
        v-model="email"
      />
      <daniko-input
        class="login-input"
        title="Пароль"
        type="password"
        placeholder="Введите пароль"
        v-model="password"
      />
      <daniko-button class="login-button" :isLoading="isLoading" :isBlock="true"
        >Войти</daniko-button
      >
    </form>
  </div>
</template>

<script>
import danikoInput from "@/components/common/daniko-input.vue";
import danikoButton from "@/components/common/daniko-button.vue";
import danikoNotification from "@/components/common/daniko-notification.vue";
import AuthRequests from "@/requests/auth.js";

export default {
  components: {
    "daniko-input": danikoInput,
    "daniko-button": danikoButton,
    "daniko-notification": danikoNotification,
  },

  data() {
    return {
      email: "",
      password: "",
      isNotificationOpen: false,
      notificationHeading: "",
      notificationText: "",
      notificationStatus: "error",
      isLoading: false,
    };
  },

  methods: {
    handleLogin() {
      this.isLoading = true;
      if (this.email.trim() && this.password.trim()) {
        const payload = {
          email: this.email.trim(),
          password: this.password.trim(),
        };

        AuthRequests.login(payload)
          .then((res) => {
            this.$store.commit("login", res.data.auth.token);
          })
          .catch((err) => {
            if (err.response.status == 401) {
              this.isLoading = false;
              this.notificationHeading = "Неверные данные";
              this.notificationText =
                "Неверный логин или пароль, попробуйте заново";
              this.isNotificationOpen = true;
            } else if (err.response.status == 500) {
              this.isLoading = false;
              this.notificationHeading = "Произошла ошибка";
              this.notificationText =
                "Проверьте подключение к интернету и попробуйте заново";
              this.isNotificationOpen = true;
            }
          });
      } else {
        this.isLoading = false;
        this.notificationHeading = "Заполните все поля";
        this.notificationText = "Для входа введите почту и пароль";
        this.isNotificationOpen = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.login {
  &-page {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $background;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }

  &-logo {
    margin-top: 18vh;
    margin-bottom: 40px;
    width: 200px;
  }

  &-form {
    padding: 40px;
    padding-bottom: 50px;
    width: 450px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    background-color: $white;
  }

  &-title {
    margin-bottom: 30px;
    color: $main-dark;
    font-size: 26px;
    font-weight: bold;
  }

  &-input {
    margin-bottom: 15px;
  }

  &-button {
    margin-top: 15px;
    width: 100%;
  }
}
</style>
