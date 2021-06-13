<template>
  <div class="gallery-page">
    <daniko-notification
      :isActive="isNotificationOpen"
      :heading="notificationHeading"
      :text="notificationText"
      @close-notification="isNotificationOpen = false"
      :status="notificationStatus"
    />
    <daniko-photos-fields
      :isPhotosBlockOpen="isPhotosBlockOpen"
      :photos="photos"
      :fileUploadLoading="fileUploadLoading"
      :deletingFileIds="deletingFileIds"
      :isDataLoading="isRightBlockDataLoading"
      @close="isPhotosBlockOpen = false"
      @upload-file="handleUploadFile"
      @delete-file="handleDeleteFile"
    />
    <header class="gallery-header">
      <h2 class="gallery-title">Галерея</h2>
      <daniko-button @click="isPhotosBlockOpen = true"
        >Редактировать галерею</daniko-button
      >
    </header>
    <transition name="empty-fade" mode="out-in">
      <div
        v-if="photos ? photos.length > 0 : false"
        class="gallery"
        key="gallery-content"
      >
        <div
          class="gallery__active"
          :style="{
            backgroundImage: `url(${baseUrl + activeImage.image.path})`,
          }"
        />
        <div class="gallery__images">
          <div
            class="gallery__image"
            v-for="image in photos"
            :key="image.id"
            :style="{
              backgroundImage: `url(${
                baseUrl + (image ? image.image.path : '')
              })`,
            }"
            @click="changeActiveImage(image.id)"
          ></div>
        </div>
      </div>
      <div v-else class="gallery-empty" key="gallery-empty">
        <img
          src="@/assets/images/empty-image.png"
          alt="Нет изображений"
          class="gallery-empty-image"
        />
        <h2 class="gallery-empty-title">
          Нет изображений в галерее.<br />
          <span class="gallery-empty-link" @click="isPhotosBlockOpen = true"
            >Нажмите,</span
          >
          чтобы загружить изображение
        </h2>
      </div>
    </transition>
  </div>
</template>

<script>
import PhotosRequests from "@/requests/photos.js";
import danikoButton from "@/components/common/daniko-button.vue";
import danikoPhotosFields from "@/components/photos/daniko-photos-fields.vue";
import danikoNotification from "@/components/common/daniko-notification.vue";
import config from "@/config.js";

export default {
  components: {
    "daniko-button": danikoButton,
    "daniko-photos-fields": danikoPhotosFields,
    "daniko-notification": danikoNotification,
  },

  data: () => ({
    baseUrl: config.apiUrl,
    photos: [],
    activeImage: {
      id: 0,
      image: {
        path: "",
      },
    },
    isNotificationOpen: false,
    notificationHeading: "",
    notificationText: "",
    notificationStatus: "error",
    isPhotosBlockOpen: false,
    isRightBlockDataLoading: false,
    fileUploadLoading: false,
    deletingFileIds: [],
  }),

  mounted() {
    this.getAllPhotos();
  },

  methods: {
    changeActiveImage(imageId) {
      this.photos.forEach((image) => {
        if (image.id == imageId) {
          this.activeImage = image;
        }
      });
    },

    getAllPhotos() {
      this.isRightBlockDataLoading = true;
      PhotosRequests.findAll()
        .then((res) => {
          this.photos = res.photos;

          this.activeImage = this.photos[0];
        })
        .catch(() => {
          this.notificationHeading = "Ошибка загрузки изображений";
          this.notificationText =
            "Проверьте подключение к интернету и обновите страницу";
          this.notificationStatus = "error";
          this.isNotificationOpen = true;
        })
        .finally(() => (this.isRightBlockDataLoading = false));
    },

    handleUploadFile(file) {
      this.fileUploadLoading = true;

      let formData = new FormData();
      formData.append("image", file);

      PhotosRequests.uploadImage(formData)
        .then(() => {
          this.notificationHeading = "Изображение загружено";
          this.notificationText = "Изображение загружено и добавлено в галерею";
          this.notificationStatus = "success";
          this.isNotificationOpen = true;

          PhotosRequests.findAll() // вручную получаю все фото из галереи. Не использую метол getAllPhotos, потому что я не могу воспроизводить загрузку
            .then((res) => {
              this.photos = res.photos;

              this.activeImage = this.photos[0];
            })
            .catch(() => {
              this.notificationHeading = "Ошибка загрузки изображений";
              this.notificationText =
                "Проверьте подключение к интернету и обновите страницу";
              this.notificationStatus = "error";
              this.isNotificationOpen = true;
            });
        })
        .catch(() => {
          this.notificationHeading = "Ошибка загрузки изображений";
          this.notificationText =
            "Проверьте подключение к интернету и обновите страницу";
          this.notificationStatus = "error";
          this.isNotificationOpen = true;
        })
        .finally(() => {
          this.fileUploadLoading = false;
        });
    },

    handleDeleteFile(imageId) {
      this.deletingFileIds.push(imageId);

      PhotosRequests.deleteImage(imageId)
        .then(() => {
          this.notificationHeading = "Изображение удалено";
          this.notificationText =
            "Чтобы добавить новые изображения, нажмите на синее поле";
          this.notificationStatus = "success";
          this.isNotificationOpen = true;

          PhotosRequests.findAll() // вручную получаю все фото из галереи. Не использую метол getAllPhotos, потому что я не могу воспроизводить загрузку
            .then((res) => {
              this.photos = res.photos;

              this.activeImage = this.photos[0];
            })
            .catch(() => {
              this.notificationHeading = "Ошибка загрузки изображений";
              this.notificationText =
                "Проверьте подключение к интернету и обновите страницу";
              this.notificationStatus = "error";
              this.isNotificationOpen = true;
            });
        })
        .catch(() => {
          this.notificationHeading = "Произошла ошибка";
          this.notificationText =
            "Проверьте подключение к интернету и обновите страницу";
          this.notificationStatus = "error";
          this.isNotificationOpen = true;
        })
        .finally(() => {
          const index = this.deletingFileIds.indexOf(imageId);
          this.deletingFileIds.splice(index, 1);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.gallery {
  width: 100%;
  height: calc(100vh - 200px);
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 20px;

  &-header {
    margin-bottom: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &-title {
    color: $main-dark;
    font-size: 28px;
    font-weight: bold;
  }

  &-empty {
    margin-top: 200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 180%;
    text-align: center;

    &-image {
      margin-bottom: 30px;
      width: 230px;
      opacity: 0.9;
    }

    &-title {
      color: $main-dark;
      font-size: 20px;
      font-weight: bold;
      opacity: 0.7;
    }

    &-link {
      color: $primary;
      text-decoration: underline;
      cursor: pointer;
      transition: 200ms ease-in-out;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}

.gallery__active {
  height: 60vh;
  border-radius: 10px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: #dcdce0;
  box-shadow: 0 0 30px #33333320;
}

.gallery__images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 80px;
  column-gap: 15px;
  row-gap: 15px;
  box-sizing: border-box;
  overflow-y: auto;
}

.gallery__image {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 5px;
  cursor: pointer;
  transition: 100ms ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
}

@media all and (max-width: 800px) {
  .gallery {
    height: auto;
    grid-template-columns: 1fr;
  }

  .gallery__images {
    height: 70vh;
    margin-top: 40px;
    grid-template-columns: repeat(4, 1fr);
  }
}

@media all and (max-width: 500px) {
  .gallery__images {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>

<style lang="scss">
.empty-fade-enter-active,
.empty-fade-leave-active {
  transition: opacity 0.15s;
}
.empty-fade-enter,
.empty-fade-leave-to {
  opacity: 0;
}
</style>
