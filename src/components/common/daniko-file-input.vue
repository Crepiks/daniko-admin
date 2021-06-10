<template>
  <div>
    <input
      type="file"
      id="fileInput"
      ref="fileInput"
      class="file-input-field"
      @change="handleFileUpload"
    />
    <transition name="fade" mode="out-in">
      <div v-if="!filePreview" class="file-input" key="file-input">
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
            <div
              v-else
              class="file-input-loading"
              key="file-input-loading"
            ></div>
          </transition>
        </label>
        <daniko-notification
          :isActive="isNotificationOpen"
          :heading="notificationHeading"
          :text="notificationText"
          @close-notification="isNotificationOpen = false"
          :status="notificationStatus"
        />
      </div>
      <div v-else class="file-preview" key="file-preview">
        <img
          :src="baseUrl + filePreview"
          alt="Изображение специалиста"
          class="file-preview-image"
        />
        <div class="file-preview-functional">
          <label
            for="fileInput"
            @click="uploadLoading ? handleChangeFile : ''"
            class="file-preview-button"
            :class="{ 'file-preview-button-disabled': uploadLoading }"
            >Заменить изображение</label
          >
          <transition name="loading-fade">
            <div v-if="uploadLoading" class="file-preview-loading"></div>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import danikoNotification from "@/components/common/daniko-notification.vue";
import config from "@/config.js";

export default {
  components: {
    "daniko-notification": danikoNotification,
  },

  props: {
    filePreview: {
      type: String,
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
      baseUrl: config.apiUrl,
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
    box-sizing: border-box;
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

.file-preview {
  margin-bottom: 30px;
  width: 100%;
  height: auto;
  border-radius: 10px;

  &-image {
    margin-bottom: 15px;
    width: 100%;
    height: auto;
    border-radius: 10px;
  }

  &-functional {
    position: relative;
    display: flex;
    flex-direction: row;
  }

  &-button {
    margin-bottom: 30px;
    color: $primary;
    font-size: 16px;
    opacity: 0.7;
    transition: 200ms ease-in-out;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }

    &-disabled {
      opacity: 0.5;
      cursor: default;

      &:hover {
        opacity: 0.5;
      }
    }
  }

  &-loading {
    cursor: default;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      margin-left: 12px;
      margin-top: 1px;
      width: 10px;
      height: 10px;
      border: 3px solid transparent;
      border-top-color: $primary;
      border-radius: 50%;
      animation: loading-spinner 1s ease infinite;
    }
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
