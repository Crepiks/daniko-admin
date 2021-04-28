<template>
  <div class="profile">
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
        <daniko-button class="right-block-button">Сменить почту</daniko-button>
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
        <daniko-button class="right-block-button">Сменить пароль</daniko-button>
      </div>
    </daniko-right-block>
  </div>
</template>

<script>
import danikoButton from "@/components/common/daniko-button.vue";
import danikoInput from "@/components/common/daniko-input.vue";
import danikoRightBlock from "@/components/common/daniko-right-block.vue";

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
  },

  data() {
    return {
      email: "",
      newEmail: "",
      password: "",
      newPassword: "",
    };
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
