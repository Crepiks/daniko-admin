<template>
  <transition name="fadeIn" appear>
    <div class="splash-screen">
      <notification
        :heading="notificationHeading"
        :text="notificationText"
        :status="notificationStatus"
        :isActive="isNotificationActive"
        @close-notification="isNotificationActive = false"
      />
      <img
        src="@/assets/images/logo.svg"
        alt="Daniko Логотип"
        class="splash-screen__logo"
      />
    </div>
  </transition>
</template>

<script>
import { mapMutations } from "vuex";
import notification from "@/components/common/daniko-notification";
import AdminsRequests from "@/requests/admins.js";

export default {
  components: {
    notification,
  },

  data: () => ({
    notificationHeading: "",
    notificationText: "",
    notificationStatus: "error",
    isNotificationActive: false,
  }),

  mounted() {
    setTimeout(() => {
      if (localStorage.getItem("userId")) {
        AdminsRequests.findOne(localStorage.getItem("userId"))
          .then(() => {
            this.$router.push("/workers");
          })
          .catch((err) => {
            if (err.response.status == 403) {
              this.logout();
              this.$router.push("/login");
            } else {
              this.notificationHeading = "Ошибка. Что-то пошло не так";
              this.notificationText =
                "Проверьте подключение к интернету и попробуйте перезагрузить страницу";
              this.isNotificationActive = true;
            }
          });
      } else {
        this.$router.push("/login");
      }
    }, 10);
  },

  methods: mapMutations(["logout"]),
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.splash-screen {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $background;
  z-index: 5;

  &__logo {
    margin-bottom: 40px;
    width: 360px;
    height: auto;
  }
}

.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 700ms;
}
.fadeIn-enter,
.fadeIn-leave-to {
  opacity: 0;
}
</style>
