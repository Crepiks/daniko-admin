<template>
  <div class="right-block" :class="{ 'right-block-active': isOpen }">
    <transition v-if="isLoading" name="fade">
      <div class="loading">
        <div class="loading-icon"></div>
      </div>
    </transition>
    <i
      class="bx bx-x right-block-close"
      @click="$emit('close-right-block')"
    ></i>
    <h2 class="right-block-title">{{ title }}</h2>
    <div class="right-block-content" :class="{ 'right-block-blur': isLoading }">
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
    isLoading: {
      type: Boolean,
      default: false,
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
    padding-bottom: 30px;
    color: $main-dark;
    font-size: 28px;
    font-weight: bold;
    border-bottom: 2px solid #b2bec330;
  }

  &-content {
    padding: 20px 0;
    padding-right: 15px;
    box-sizing: border-box;
    overflow: auto;
  }

  &-blur {
    filter: blur(5px);
  }
}

.loading {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 76vh;
  background-color: #3c3c3c50;
  z-index: 5;
  transition: 300ms ease-in-out;

  &-icon {
    &::after {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border: 4px solid transparent;
      border-top-color: #ffffff;
      border-radius: 50%;
      animation: button-loading-spinner 1s ease infinite;
    }
  }
}

@keyframes button-loading-spinner {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}
</style>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
