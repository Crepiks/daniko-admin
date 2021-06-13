<template>
  <div>
    <daniko-notification
      :isActive="isNotificationOpen"
      :heading="notificationHeading"
      :text="notificationText"
      @close-notification="isNotificationOpen = false"
      :status="notificationStatus"
    />
    <div class="multiple-input">
      <input
        :disabled="uploadLoading"
        type="file"
        id="fileInput"
        ref="fileInput"
        class="file-input-field"
        @change="handleFileUpload"
      />
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
    </div>
    <div
      v-if="filesPreviews ? filesPreviews.length > 0 : false"
      class="multiple-previews"
    >
      <div class="preview" v-for="(file, index) in filesPreviews" :key="index">
        <div
          class="preview-image"
          :style="{
            backgroundImage: `url(${
              baseUrl + (file.path ? file.path : file.image.path)
            })`,
          }"
        ></div>
        <div class="preview-icon">
          <transition name="loading-fade" mode="out-in">
            <div
              v-if="isFileLoading(file.id)"
              key="preview-loading-icon"
              class="preview-loading"
            ></div>
            <i
              v-else
              key="preview-delete-icon"
              class="bx bx-trash preview-delete"
              @click="$emit('delete-file', file.id)"
            ></i>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import danikoNotification from "@/components/common/daniko-notification.vue";
import config from "@/config.js";

export default {
  props: {
    filesPreviews: {
      type: Array,
      required: false,
    },
    uploadLoading: {
      type: Boolean,
      default: false,
    },
    deletingFileIds: {
      type: Array,
    },
  },

  components: {
    "daniko-notification": danikoNotification,
  },

  data: () => ({
    isNotificationOpen: false,
    notificationHeading: "",
    notificationText: "",
    notificationStatus: "error",
    baseUrl: config.apiUrl,
  }),

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

    isFileLoading(fileId) {
      var result = false;
      this.deletingFileIds.forEach((deletingFileId) => {
        if (fileId == deletingFileId) result = true;
      });
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.multiple {
  &-input {
    padding-bottom: 30px;
    width: 100%;
    height: 200px;
  }

  &-previews {
    padding-bottom: 40px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, calc(33% - 5px));
    column-gap: 10px;
    row-gap: 10px;
  }
}

.file-input {
  &-label {
    position: relative;
    width: 100%;
    height: 200px;
    display: flex;
    box-sizing: border-box;
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

.preview {
  position: relative;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  background-color: $background;
  overflow: hidden;

  &-image {
    height: 100%;
    width: 70%;
    border-radius: 10px;
    background-position: center center;
    background-size: cover;
  }

  &-icon {
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-delete {
    color: $error;
    font-size: 20px;
    opacity: 0.8;
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
      right: 8%;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 12px;
      height: 12px;
      border: 3px solid transparent;
      border-top-color: $primary;
      border-radius: 50%;
      opacity: 0.8;
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
.loading-fade-enter-active,
.loading-fade-leave-active {
  transition: opacity 0.2s;
}
.loading-fade-enter,
.loading-fade-leave-to {
  opacity: 0;
}
</style>
