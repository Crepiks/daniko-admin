<template>
  <div class="services-page">
    <daniko-notification
      :isActive="isNotificationOpen"
      :heading="notificationHeading"
      :text="notificationText"
      @close-notification="isNotificationOpen = false"
      :status="notificationStatus"
    />
    <daniko-service-fields
      :isServiceBlockOpen="isAddServiceBlockOpen || isEditServiceBlockOpen"
      :edit-mode="isEditServiceBlockOpen"
      :workers="workers"
      :service="activeService"
      :fileUploadLoading="fileUploadLoading"
      :deletingFileIds="deletingFileIds"
      :isDataLoading="isRightBlockDataLoading"
      :isButtonLoading="isRightBlockButtonLoading"
      @close="
        isAddServiceBlockOpen = false;
        isEditServiceBlockOpen = false;
        activeService = {};
      "
      @create-service="handleCreateService"
      @edit-service="handleEditService"
      @delete-service="handleDeleteService"
      @upload-file="handleUploadFile"
      @delete-file="handleDeleteFile"
    />
    <header class="services-header">
      <h2 class="services-title">Услуги</h2>
      <daniko-button @click="isAddServiceBlockOpen = true"
        >Добавить услугу</daniko-button
      >
    </header>
    <transition name="empty-fade" mode="out-in" key="services-grid">
      <div v-if="services ? services.length > 0 : false" class="services-grid">
        <daniko-service-card
          v-for="service in services"
          :key="service.id"
          :imagePath="
            service.images[0]
              ? baseUrl + service.images[0].path
              : defaultServiceImage
          "
          :name="service.title"
          @edit-service="changeActiveService(service.id)"
        />
      </div>
      <div v-else class="services-empty" key="services-empty">
        <img
          src="@/assets/images/empty-image.png"
          alt="Нет услуг"
          class="services-empty-image"
        />
        <h2 class="services-empty-title">
          Нет услуг.
          <span
            class="services-empty-link"
            @click="isAddServiceBlockOpen = true"
            >Нажмите,</span
          >
          чтобы добавить услугу
        </h2>
      </div>
    </transition>
  </div>
</template>

<script>
import danikoButton from "@/components/common/daniko-button.vue";
import danikoServiceCard from "@/components/services/daniko-service-card.vue";
import danikoServiceFields from "@/components/services/daniko-service-fields.vue";
import danikoNotification from "@/components/common/daniko-notification.vue";
import ServicesRequests from "@/requests/services.js";
import WorkersRequests from "@/requests/workers.js";
import defaultServiceImage from "@/assets/images/default-service-image.png";
import config from "@/config.js";

export default {
  components: {
    "daniko-button": danikoButton,
    "daniko-service-card": danikoServiceCard,
    "daniko-service-fields": danikoServiceFields,
    "daniko-notification": danikoNotification,
  },

  data() {
    return {
      baseUrl: config.apiUrl,
      defaultServiceImage: defaultServiceImage,
      isNotificationOpen: false,
      notificationHeading: "",
      notificationText: "",
      notificationStatus: "error",
      services: [],
      workers: [],
      activeService: {
        id: 0,
        name: "",
        images: [
          {
            id: 0,
            path: "",
          },
        ],
        description: "",
        schedule: {
          monday: "",
          tuesday: "",
          wednesday: "",
          thursday: "",
          friday: "",
          saturday: "",
          sunday: "",
        },
        providedWorkers: [{ id: 0, name: "" }],
      },
      isAddServiceBlockOpen: false,
      isEditServiceBlockOpen: false,
      isRightBlockDataLoading: false,
      isRightBlockButtonLoading: false,
      fileUploadLoading: false,
      deletingFileIds: [],
    };
  },

  mounted() {
    this.getAllServices();

    WorkersRequests.findAll().then((res) => {
      this.workers = res.workers;
    });
  },

  methods: {
    getAllServices() {
      ServicesRequests.findAll().then((res) => {
        this.services = res.services;
      });
    },

    changeActiveService(serviceId) {
      var service = {};
      var parsedService = {};
      this.isRightBlockDataLoading = true;
      this.isEditServiceBlockOpen = true;
      ServicesRequests.findOne(serviceId)
        .then((res) => {
          service = res.service;

          parsedService.title = service.title;
          parsedService.images = service.images;
          parsedService.description = service.description;
          parsedService.schedule = service.schedule;
          parsedService.providedWorkers = service.workers;
          parsedService.id = service.id;
          this.activeService = parsedService;
        })
        .catch(() => {
          this.notificationHeading = "Произошла ошибка";
          this.notificationText =
            "Проверьте подключение к интернету и обновите страницу";
          this.isNotificationOpen = true;
        })
        .finally(() => {
          this.isRightBlockDataLoading = false;
        });
    },

    handleCreateService(createdService) {
      this.isRightBlockButtonLoading = true;
      const payload = { ...createdService };

      delete payload.imagePath;
      delete payload.providedWorkers;

      ServicesRequests.create(payload)
        .then(() => {
          this.notificationHeading = "Услуга создана";
          this.notificationText = "Данные новой услуги сохранены";
          this.notificationStatus = "success";
          this.isNotificationOpen = true;
          this.isAddServiceBlockOpen = false;

          this.getAllServices();
        })
        .catch(() => {
          this.notificationHeading = "Произошла ошибка";
          this.notificationText =
            "Проверьте подключение к интернету и попробуйте снова";
          this.notificationStatus = "error";
          this.isNotificationOpen = true;
        })
        .finally(() => {
          this.isRightBlockButtonLoading = false;
        });
    },

    handleEditService(editedServiceId, editedService) {
      this.isRightBlockButtonLoading = true;
      const payload = { ...editedService };
      delete payload.providedWorkers;
      delete payload.images;

      ServicesRequests.update(editedServiceId, payload)
        .then(() => {
          this.notificationHeading = "Данные обновлены";
          this.notificationText = "Данные услуги сохранены";
          this.notificationStatus = "success";
          this.isNotificationOpen = true;
          this.isEditServiceBlockOpen = false;

          this.getAllServices();
        })
        .catch(() => {
          this.notificationHeading = "Произошла ошибка";
          this.notificationText =
            "Проверьте подключение к интернету и попробуйте снова";
          this.isNotificationOpen = true;
        })
        .finally(() => {
          this.isRightBlockButtonLoading = false;
        });
    },

    handleDeleteService() {
      this.isRightBlockDataLoading = true;

      ServicesRequests.delete(this.activeService.id)
        .then(() => {
          this.notificationHeading = "Услуга удалена";
          this.notificationText = "Данные услуги удалены";
          this.notificationStatus = "success";
          this.isNotificationOpen = true;
          this.isEditServiceBlockOpen = false;

          this.getAllServices();
        })
        .catch(() => {
          this.notificationHeading = "Произошла ошибка";
          this.notificationText =
            "Проверьте подключение к интернету и попробуйте снова";
          this.notificationStatus = "error";
          this.isNotificationOpen = true;
        })
        .finally(() => {
          this.isRightBlockDataLoading = false;
        });
    },

    handleUploadFile(file) {
      this.fileUploadLoading = true;

      let formData = new FormData();
      formData.append("image", file);

      ServicesRequests.uploadImage(this.activeService.id, formData)
        .then(() => {
          this.notificationHeading = "Изображение сохранено";
          this.notificationText =
            "Изображение сервиса сохранено и будет отображаться на сайте";
          this.notificationStatus = "success";
          this.isNotificationOpen = true;
          this.isEditWorkerBlockOpen = false;

          var service = {}; // нужно отобразить только что загруженное изображение, для этого приходится полностью получить данные о услуге, но не включать загрузку, чтобы весь конктент не блокировался после загрузки одной картники
          var parsedService = {};

          ServicesRequests.findOne(this.activeService.id)
            .then((res) => {
              service = res.service;

              parsedService.title = service.title;
              parsedService.images = service.images;
              parsedService.description = service.description;
              parsedService.schedule = service.schedule;
              parsedService.providedWorkers = service.workers;
              parsedService.id = service.id;
              this.activeService = parsedService;
            })
            .catch(() => {
              this.notificationHeading = "Произошла ошибка";
              this.notificationText =
                "Проверьте подключение к интернету и обновите страницу";
              this.isNotificationOpen = true;
            });

          this.getAllServices();
        })
        .catch(() => {
          this.notificationHeading = "Произошла ошибка";
          this.notificationText =
            "Проверьте подключение к интернету и попробуйте снова";
          this.notificationStatus = "error";
          this.isNotificationOpen = true;
        })
        .finally(() => {
          this.fileUploadLoading = false;
        });
    },

    handleDeleteFile(fileId) {
      this.deletingFileIds.push(fileId);

      ServicesRequests.deleteImage(this.activeService.id, fileId)
        .then(() => {
          this.notificationHeading = "Изображение удалено";
          this.notificationText =
            "Чтобы добавить новые изображения, нажмите на синее поле";
          this.notificationStatus = "success";
          this.isNotificationOpen = true;

          var service = {}; // нужно отобразить только что загруженное изображение, для этого приходится полностью получить данные о услуге, но не включать загрузку, чтобы весь конктент не блокировался после загрузки одной картники
          var parsedService = {};

          ServicesRequests.findOne(this.activeService.id)
            .then((res) => {
              service = res.service;

              parsedService.title = service.title;
              parsedService.images = service.images;
              parsedService.description = service.description;
              parsedService.schedule = service.schedule;
              parsedService.providedWorkers = service.workers;
              parsedService.id = service.id;
              this.activeService = parsedService;
            })
            .catch(() => {
              this.notificationHeading = "Произошла ошибка";
              this.notificationText =
                "Проверьте подключение к интернету и обновите страницу";
              this.isNotificationOpen = true;
            });

          this.getAllServices();
        })
        .catch(() => {
          this.notificationHeading = "Произошла ошибка";
          this.notificationText =
            "Проверьте подключение к интернету и попробуйте снова";
          this.notificationStatus = "error";
          this.isNotificationOpen = true;
        })
        .finally(() => {
          const index = this.deletingFileIds.indexOf(fileId);
          this.deletingFileIds.splice(index, 1);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.services {
  &-page {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

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

  &-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
    row-gap: 40px;
  }

  &-empty {
    margin-top: 150px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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
