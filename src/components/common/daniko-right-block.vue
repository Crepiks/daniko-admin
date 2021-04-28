<template>
  <div class="right-block" :class="{ 'right-block-active': isOpen }">
    <i
      class="bx bx-x right-block-close"
      @click="$emit('close-right-block')"
    ></i>
    <h2 class="right-block-title">{{ title }}</h2>
    <div class="right-block-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.right-block {
  position: fixed;
  top: 0;
  right: -500px;
  padding: 60px 25px 0 40px;
  width: 500px;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: $white;
  transition: 400ms ease-in-out;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
  z-index: 3;

  &-active {
    transform: translateX(-500px);
  }

  &-close {
    margin-bottom: 40px;
    color: $main-dark;
    font-size: 26px;
    cursor: pointer;
    transition: 200ms ease-in-out;
    opacity: 0.4;

    &:hover {
      opacity: 0.2;
    }
  }

  &-title {
    margin-bottom: 30px;
    color: $main-dark;
    font-size: 28px;
    font-weight: bold;
  }

  &-content {
    padding-bottom: 30px;
    padding-right: 15px;
    box-sizing: border-box;
    overflow: auto;
  }
}
</style>
