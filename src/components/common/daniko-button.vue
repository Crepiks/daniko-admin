<template>
  <div>
    <button
      @click="$emit('click')"
      class="button"
      :class="{
        'button-border': type == 'border',
        'button-block': isBlock,
        'button-loading': isLoading,
      }"
    >
      <span class="button-content"><slot></slot></span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
    },
    isBlock: {
      type: Boolean,
      default: false,
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

.button {
  padding: 10px 25px;
  position: relative;
  box-sizing: border-box;
  color: $white;
  font-size: 16px;
  text-decoration: none;
  border: 1px solid $primary;
  border-radius: 10px;
  outline: none;
  background-color: $primary;
  transition: 200ms ease-in-out;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  &-border {
    color: $primary;
    background-color: transparent;
  }

  &-block {
    width: 100%;
  }

  &-content {
    transition: 200ms ease-in-out;
  }

  &-loading {
    cursor: default;

    & .button-content {
      visibility: hidden;
      opacity: 0;
    }
    &:hover {
      opacity: 1;
    }

    &::after {
      content: "";
      position: absolute;
      width: 14px;
      height: 14px;
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
