<template>
  <transition name="fade" mode="out-in">
    <div v-if="!file" class="file-input" key="`">
      <label for="fileInput" class="file-input-label">
        <i class="bx bx-cloud-upload file-input-icon"></i>
        <span class="file-input-title"
          >Нажмите, чтобы загрузить изображение</span
        >
      </label>
      <input
        type="file"
        id="fileInput"
        ref="fileInput"
        class="file-input-field"
        @change="handleFileUpload"
      />
      <daniko-notification
        :isActive="isNotificationOpen"
        :heading="notificationHeading"
        :text="notificationText"
        @close-notification="isNotificationOpen = false"
        :status="notificationStatus"
      />
    </div>
    <div v-else class="file-preview">
      <span class="file-preview-title">{{
        file.name.length > 35 ? file.name.slice(0, 35) + "..." : file.name
      }}</span>
      <i class="bx bx-trash file-preview-delete" @click="handleDeleteFile"></i>
    </div>
  </transition>
</template>

<script>
import danikoNotification from "@/components/common/daniko-notification.vue";

export default {
  components: {
    "daniko-notification": danikoNotification,
  },

  data() {
    return {
      file: "",
      isNotificationOpen: false,
      notificationHeading: "",
      notificationText: "",
      notificationStatus: "error",
    };
  },

  methods: {
    handleFileUpload() {
      if (
        this.$refs.fileInput.files[0].type == "image/jpeg" ||
        this.$refs.fileInput.files[0].type == "image/png" ||
        this.$refs.fileInput.files[0].type == "image/raw"
      ) {
        this.file = this.$refs.fileInput.files[0];
      } else {
        this.isLoading = false;
        this.notificationHeading = "Недопустимый формат изображения";
        this.notificationText =
          "Вы можете загружать изображения в формате png, jpeg и raw";
        this.isNotificationOpen = true;
      }
    },

    handleDeleteFile() {
      this.file = "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.file-input {
  padding-bottom: 30px;
  width: 100%;
  height: 200px;

  &-label {
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid $primary;
    border-radius: 10px;
    border-style: dashed;
    background: transparent;
    opacity: 0.5;
    transition: 300ms ease-in-out;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  &-icon {
    margin-bottom: 5px;
    color: $primary;
    font-size: 40px;
  }

  &-title {
    color: $primary;
    font-size: 18px;
  }

  &-field {
    display: none;
  }
}

.file-preview {
  margin-bottom: 30px;
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #cccccc30;
  border-radius: 10px;

  &-title {
    margin-right: 10px;
    color: $primary;
    font-size: 16px;
  }

  &-delete {
    color: $error;
    font-size: 20px;
    opacity: 0.6;
    transition: 200ms ease-in-out;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }
}
</style>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
