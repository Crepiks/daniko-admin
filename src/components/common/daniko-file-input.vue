<template>
  <transition name="fade" mode="out-in">
    <div v-if="!file" class="file-input" key="file-input">
      <label for="fileInput" class="file-input-label">
        <transition name="loading-fade" mode="out-in">
          <div
            v-if="!uploadLoading"
            class="file-input-content"
            key="file-input-content"
          >
            <i class="bx bx-cloud-upload file-input-icon"></i>
            <span class="file-input-title"
              >Нажмите, чтобы загрузить изображение</span
            >
          </div>
          <div v-else class="file-input-loading" key="file-input-loading"></div>
        </transition>
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
    <div v-else class="file-preview" key="file-preview">
      <span class="file-preview-title">{{
        file.name.length > 35 ? file.name.slice(0, 35) + "..." : file.name
      }}</span>
      <div class="file-preview-icons">
        <transition name="loading-fade" mode="out-in">
          <i
            v-if="!changeLoading"
            class="bx bx-refresh file-preview-change"
            @click="handleChangeFile"
            key="change-icon"
          ></i>
          <div v-else class="file-preview-loading" key="change-loading"></div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import danikoNotification from "@/components/common/daniko-notification.vue";

export default {
  components: {
    "daniko-notification": danikoNotification,
  },

  props: {
    file: {
      type: File,
      required: false,
    },
    uploadLoading: {
      type: Boolean,
      default: false,
    },
    changeLoading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
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
        this.$emit("upload-file", this.$refs.fileInput.files[0]);
      } else {
        this.isLoading = false;
        this.notificationHeading = "Недопустимый формат изображения";
        this.notificationText =
          "Вы можете загружать изображения в формате png, jpeg и raw";
        this.isNotificationOpen = true;
      }
    },

    handleChangeFile() {
      this.$emit("change-file");
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
    position: relative;
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

  &-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: transparent;
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

  &-loading {
    cursor: default;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 25px;
      height: 25px;
      border: 4px solid transparent;
      border-top-color: $primary;
      border-radius: 50%;
      animation: loading-spinner 1s ease infinite;
    }
  }

  &-field {
    display: none;
  }
}

@keyframes loading-spinner {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
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

  &-icons {
    position: relative;
    min-width: 20px;
  }

  &-change {
    margin-top: 5px;
    color: $primary;
    font-size: 25px;
    opacity: 0.6;
    transition: 200ms ease-in-out;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  &-loading {
    cursor: default;

    &::after {
      content: "";
      position: absolute;
      top: -7px;
      left: 5px;
      width: 12px;
      height: 12px;
      border: 3px solid transparent;
      border-top-color: $primary;
      border-radius: 50%;
      animation: loading-spinner 1s ease infinite;
    }
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

.loading-fade-enter-active,
.loading-fade-leave-active {
  transition: opacity 0.2s;
}
.loading-fade-enter,
.loading-fade-leave-to {
  opacity: 0;
}
</style>
