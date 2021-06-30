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
        <daniko-button
          class="right-block-button"
          :isLoading="isEmailLoading"
          @click="handleChangingEmail"
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
          :isLoading="isPasswordLoading"
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
import AdminsRequests from "@/requests/admins";
import AuthRequests from "@/requests/auth";

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
      isEmailLoading: false,
      isPasswordLoading: false,
    };
  },

  watch: {
    isOpen() {
      if (this.isOpen) {
        this.email = "";
        this.newEmail = "";
        this.password = "";
        this.newPassword = "";
      }
    },
  },

  methods: {
    handleChangingEmail() {
      if (this.email.trim() && this.newEmail.trim()) {
        if (this.email.trim() == localStorage.getItem("userEmail")) {
          this.isEmailLoading = true;
          const payload = {
            email: this.newEmail.trim(),
          };
          AdminsRequests.update(localStorage.getItem("userId"), payload)
            .then(() => {
              localStorage.setItem("userEmail", this.newEmail.trim());
              this.$emit("close-profile");
              this.notificationHeading = "Почта обновлена";
              this.notificationText =
                "Используйте новую почту для входа в админ панель";
              this.notificationStatus = "success";
              this.isNotificationOpen = true;
            })
            .catch(() => {
              this.notificationHeading = "Произошла ошибка";
              this.notificationText =
                "Проверьте подключение к интернету и попробуйте заново";
              this.notificationStatus = "error";
              this.isNotificationOpen = true;
            })
            .finally(() => (this.isEmailLoading = false));
        } else {
          this.notificationHeading = "Неверная текущая электронная почта";
          this.notificationText =
            "Для обновления почты нужно ввести текущую почту аккаунта. Попробуйте снова";
          this.notificationStatus = "error";
          this.isNotificationOpen = true;
        }
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
        this.isPasswordLoading = true;

        const authPayload = {
          email: localStorage.getItem("userEmail"),
          password: this.password.trim(),
        };

        AuthRequests.login(authPayload)
          .then(() => {
            const adminPayload = {
              password: this.newPassword.trim(),
            };

            AdminsRequests.update(localStorage.getItem("userId"), adminPayload)
              .then(() => {
                this.$emit("close-profile");
                this.notificationHeading = "Пароль обновлен";
                this.notificationText =
                  "Используйте новый пароль для входа в админ панель";
                this.notificationStatus = "success";
                this.isNotificationOpen = true;
              })
              .catch(() => {
                this.notificationHeading = "Произошла ошибка";
                this.notificationText =
                  "Проверьте подключение к интернету и попробуйте заново";
                this.notificationStatus = "error";
                this.isNotificationOpen = true;
              });
          })
          .catch((err) => {
            if (err.response.status == 401) {
              this.notificationHeading = "Неверный текущий пароль";
              this.notificationText =
                "Для обновления пароля нужно ввести текущий пароль аккаунта. Попробуйте снова";
              this.notificationStatus = "error";
              this.isNotificationOpen = true;
            } else {
              this.notificationHeading = "Произошла ошибка";
              this.notificationText =
                "Проверьте подключение к интернету и попробуйте заново";
              this.notificationStatus = "error";
              this.isNotificationOpen = true;
            }
          })
          .finally(() => (this.isPasswordLoading = false));
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
