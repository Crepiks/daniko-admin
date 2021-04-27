<template>
  <div class="login-page">
    <img src="@/assets/images/logo.svg" alt="Daniko" class="login-logo" />
    <form class="login-form">
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
      <daniko-button class="login-button" :isBlock="true">Войти</daniko-button>
    </form>
  </div>
</template>

<script>
import danikoInput from "@/components/common/daniko-input.vue";
import danikoButton from "@/components/common/daniko-button.vue";

export default {
  components: {
    "daniko-input": danikoInput,
    "daniko-button": danikoButton,
  },

  data() {
    return {
      email: "",
      password: "",
    };
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
