<template>
  <div
    class="notification"
    :class="{
      'notification-top': position == 'top',
      'notification-bottom': position == 'bottom',
      'notification-active': isActive,
    }"
  >
    <div
      class="notification-mark"
      :class="{
        'notification-mark-success': status == 'success',
        'notification-mark-warning': status == 'warning',
        'notification-mark-error': status == 'error',
      }"
    ></div>
    <i
      class="notification-icon"
      :class="{
        'bx bxs-check-circle notification-icon-success': status == 'success',
        'bx bxs-alarm-exclamation notification-icon-warning':
          status == 'warning',
        'bx bxs-x-circle notification-icon-error': status == 'error',
      }"
    ></i>
    <div class="notification-text">
      <h2 class="notification-heading" v-if="heading != ''">{{ heading }}</h2>
      <p class="notification-paragraph">{{ text }}</p>
    </div>
    <i class="bx bx-x notification-close" @click="handleCloseButton()"></i>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: "success",
    },

    heading: {
      type: String,
      default: "",
    },

    text: {
      type: String,
      default: "",
    },

    position: {
      type: String,
      default: "top",
    },

    isActive: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      setTimeoutId: null,
    };
  },

  watch: {
    isActive() {
      if (this.isActive) {
        this.setTimeoutId = setTimeout(() => {
          this.$emit("close-notification");
        }, 7000);
      }
    },
  },

  methods: {
    handleCloseButton() {
      if (this.setTimeoutId) {
        clearTimeout(this.setTimeoutId);
      }

      this.$emit("close-notification");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.notification {
  position: fixed;
  right: -550px;
  padding: 20px 30px 20px 15px;
  max-width: 500px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  background-color: $white;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.15);
  transition: 350ms ease-in-out;
  z-index: 7;

  &-active {
    right: 20px;
  }

  &-top {
    top: 20px;
  }

  &-bottom {
    bottom: 20px;
  }

  &-mark {
    margin-right: 10px;
    height: 70px;
    width: 8px;
    border-radius: 10px;
    background-color: black;

    &-success {
      background-color: $primary;
    }

    &-warning {
      background-color: #f1c40f;
    }

    &-error {
      background-color: $error;
    }
  }

  &-icon {
    margin-right: 10px;
    font-size: 25px;

    &-success {
      color: $primary;
    }

    &-warning {
      color: #f1c40f;
    }

    &-error {
      color: $error;
    }
  }

  &-text {
    margin-right: 10px;
    display: flex;
    flex-direction: column;
  }

  &-heading {
    margin-bottom: 5px;
    color: $main-dark;
    font-size: 18px;
    font-weight: 500;
    opacity: 0.9;
  }

  &-paragraph {
    color: $main-dark;
    font-size: 14px;
    line-height: 130%;
    opacity: 0.8;
  }

  &-close {
    color: $main-dark;
    font-size: 25px;
    opacity: 0.5;
    z-index: 5;
    cursor: pointer;
    transition: 200ms ease-in-out;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
