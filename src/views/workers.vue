<template>
  <div class="workers-page">
    <daniko-notification
      :isActive="isNotificationOpen"
      :heading="notificationHeading"
      :text="notificationText"
      @close-notification="isNotificationOpen = false"
      :status="notificationStatus"
    />
    <daniko-worker-fields
      :isWorkerBlockOpen="isAddWorkerBlockOpen || isEditWorkerBlockOpen"
      :edit-mode="isEditWorkerBlockOpen"
      :services="services"
      :worker="activeWorker"
      :fileUploadLoading="fileUploadLoading"
      :fileChnageLoading="fileChangeLoading"
      :isDataLoading="isRightBlockDataLoading"
      :isButtonLoading="isRightBlockButtonLoading"
      @close="
        isAddWorkerBlockOpen = false;
        isEditWorkerBlockOpen = false;
        activeWorker = {};
      "
      @create-worker="handleCreateWorker"
      @edit-worker="handleEditWorker"
      @delete-worker="handleDeleteWorker"
      @upload-file="handleUploadFile"
    />
    <header class="workers-header">
      <h2 class="workers-title">Специалисты</h2>
      <daniko-button @click="isAddWorkerBlockOpen = true"
        >Добавить специалиста</daniko-button
      >
    </header>
    <div v-if="workers ? workers.length > 0 : false" class="workers-grid">
      <daniko-worker-card
        v-for="worker in workers"
        :key="worker.id"
        :imagePath="
          worker.image ? baseUrl + worker.image.path : defaultWorkerImage
        "
        :name="worker.firstName + ' ' + worker.lastName"
        :branch="worker.branch"
        @edit-worker="changeActiveWorker(worker.id)"
      />
    </div>
    <div v-else class="workers-empty">
      <img
        src="@/assets/images/empty-image.png"
        alt="Нет специалистов"
        class="workers-empty-image"
      />
      <h2 class="workers-empty-title">
        Нет специалистов.
        <span class="workers-empty-link" @click="isAddWorkerBlockOpen = true"
          >Нажмите,</span
        >
        чтобы добавить специалиста
      </h2>
    </div>
  </div>
</template>

<script>
import danikoButton from "@/components/common/daniko-button.vue";
import danikoWorkerCard from "@/components/workers/daniko-worker-card.vue";
import danikoWorkerFileds from "@/components/workers/daniko-worker-fields.vue";
import danikoNotification from "@/components/common/daniko-notification.vue";
import WorkersRequests from "@/requests/workers.js";
import ServicesRequests from "@/requests/services.js";
import defaultWorkerImage from "@/assets/images/default-worker-image.png";
import config from "@/config.js";

export default {
  components: {
    "daniko-button": danikoButton,
    "daniko-worker-card": danikoWorkerCard,
    "daniko-worker-fields": danikoWorkerFileds,
    "daniko-notification": danikoNotification,
  },

  data() {
    return {
      defaultWorkerImage: defaultWorkerImage,
      isNotificationOpen: false,
      notificationHeading: "",
      notificationText: "",
      notificationStatus: "error",
      baseUrl: config.apiUrl,
      workers: [],
      services: [],
      activeWorker: {},
      isAddWorkerBlockOpen: false,
      isEditWorkerBlockOpen: false,
      isRightBlockDataLoading: false,
      isRightBlockButtonLoading: false,
      fileUploadLoading: false,
      fileChangeLoading: false,
    };
  },

  mounted() {
    this.getAllWorkers();

    ServicesRequests.findAll().then((res) => {
      this.services = res.services;
    });
  },

  methods: {
    getAllWorkers() {
      WorkersRequests.findAll().then((res) => {
        this.workers = res.workers;
      });
    },

    changeActiveWorker(workerId) {
      var worker = {};
      var parsedWorker = {};
      this.isRightBlockDataLoading = true;
      this.isEditWorkerBlockOpen = true;
      WorkersRequests.findOne(workerId)
        .then((res) => {
          worker = res.worker;

          parsedWorker.firstName = worker.firstName;
          parsedWorker.lastName = worker.lastName;
          parsedWorker.branch = worker.branch;
          parsedWorker.imagePath = worker.image ? worker.image.path : "";
          parsedWorker.description = worker.description;
          parsedWorker.schedule = worker.schedule;
          parsedWorker.providedServices = worker.services;
          parsedWorker.id = worker.id;
          this.activeWorker = parsedWorker;
        })
        .catch(() => {
          this.notificationHeading = "Произошла ошибка";
          this.notificationText =
            "Проверьте подключение к интернету и обновите страницу";
          this.notificationStatus = "error";
          this.isNotificationOpen = true;
        })
        .finally(() => (this.isRightBlockDataLoading = false));
    },

    handleCreateWorker(newWorker) {
      this.isRightBlockButtonLoading = true;
      const payload = { ...newWorker };
      delete payload.providedServices;
      delete payload.imagePath;

      WorkersRequests.create(payload)
        .then(() => {
          this.notificationHeading = "Специалист создан";
          this.notificationText = "Данные нового специалиста сохранены";
          this.notificationStatus = "success";
          this.isNotificationOpen = true;
          this.isAddWorkerBlockOpen = false;

          this.getAllWorkers();
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

    handleEditWorker(editedWorkerId, editedWorker) {
      this.isRightBlockButtonLoading = true;
      const payload = { ...editedWorker };
      delete payload.providedServices;
      delete payload.imagePath;

      WorkersRequests.update(editedWorkerId, payload)
        .then(() => {
          this.notificationHeading = "Данные обновлены";
          this.notificationText = "Данные специалиста сохранены";
          this.notificationStatus = "success";
          this.isNotificationOpen = true;
          this.isEditWorkerBlockOpen = false;

          this.getAllWorkers();
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

    handleDeleteWorker() {
      this.isRightBlockDataLoading = true;

      WorkersRequests.delete(this.activeWorker.id)
        .then(() => {
          this.notificationHeading = "Специалист удален";
          this.notificationText = "Данные специалиста удалены";
          this.notificationStatus = "success";
          this.isNotificationOpen = true;
          this.isEditWorkerBlockOpen = false;

          this.getAllWorkers();
        })
        .catch(() => {
          this.notificationHeading = "Произошла ошибка";
          this.notificationText =
            "Проверьте подключение к интернету и попробуйте снова";
          this.notificationStatus = "error";
          this.isNotificationOpen = true;
        })
        .finally(() => {
          this.activeWorker = {};
          this.isRightBlockDataLoading = false;
        });
    },

    handleUploadFile(file) {
      this.fileUploadLoading = true;

      let formData = new FormData();
      formData.append("image", file);

      WorkersRequests.uploadImage(this.activeWorker.id, formData)
        .then(() => {
          this.notificationHeading = "Изображение сохранено";
          this.notificationText =
            "Изображение специалиста сохранено и будет отображаться на сайте";
          this.notificationStatus = "success";
          this.isNotificationOpen = true;
          this.isEditWorkerBlockOpen = false;

          this.getAllWorkers();
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
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.workers {
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
