<template>
  <daniko-right-block
    :isOpen="isServiceBlockOpen"
    :title="editMode ? 'Редактирование услуги' : 'Новая услуга'"
    :isLoading="isDataLoading"
    @close-right-block="$emit('close')"
  >
    <daniko-notification
      :isActive="isNotificationOpen"
      :heading="notificationHeading"
      :text="notificationText"
      @close-notification="isNotificationOpen = false"
      :status="notificationStatus"
    />
    <div class="right-block-component" ref="content">
      <daniko-multiple-file-input
        v-if="editMode"
        :filesPreviews="service.images"
        :uploadLoading="fileUploadLoading"
        :deletingFileIds="deletingFileIds"
        @upload-file="repeatUploadFileEmit"
        @delete-file="repeatDeleteFileEmit"
      />
      <daniko-input
        class="right-block-input"
        title="Название"
        placeholder="Введите название услуги"
        v-model="newService.title"
        only="text"
      />
      <daniko-textarea
        class="right-block-input"
        title="Описание"
        placeholder="Добавьте описание услуги"
        v-model="newService.description"
      />
      <daniko-add-schedule
        class="right-block-schedule"
        :scheduleDefault="newService.schedule"
        @edit-schedule="handleScheduleEdit"
      />
      <daniko-price-field
        @change-free-status="
          !isServiceFree
            ? ((isServiceFree = true), (newService.price = 0))
            : (isServiceFree = false)
        "
        :isServiceFree="isServiceFree"
        v-model="newService.price"
      />
      <daniko-choose-provided
        class="right-block-provided"
        title="Предоставляющие услугу врачи"
        :cards="workers"
        :provided="newService.providedWorkers"
        @edit-provided="handleEditProvided"
      />
      <div class="right-block-buttons">
        <daniko-button
          class="right-block-button"
          :isLoading="isButtonLoading"
          @click="handleAddButton"
          >{{
            editMode ? "Сохранить услугу" : "Добавить услугу"
          }}</daniko-button
        >
        <div
          v-if="editMode"
          class="right-block-delete"
          @click="$emit('delete-service')"
        >
          <i class="bx bx-trash right-block-delete-icon"></i>
          <span class="right-block-delete-title">Удалить</span>
        </div>
      </div>
    </div>
  </daniko-right-block>
</template>

<script>
import danikoButton from "@/components/common/daniko-button.vue";
import danikoRightBlock from "@/components/common/daniko-right-block.vue";
import danikoInput from "@/components/common/daniko-input.vue";
import danikoMultipleFileInput from "@/components/common/daniko-multiple-file-input.vue";
import danikoTextarea from "@/components/common/daniko-textarea.vue";
import danikoAddSchedule from "@/components/common/daniko-add-schedule.vue";
import danikoPriceField from "@/components/services/daniko-price-field.vue";
import danikoChooseProvided from "@/components/common/daniko-choose-provided.vue";
import danikoNotification from "@/components/common/daniko-notification.vue";

export default {
  props: {
    isServiceBlockOpen: {
      type: Boolean,
      default: false,
    },
    service: {
      type: Object,
    },
    workers: {
      type: Array,
    },
    editMode: {
      type: Boolean,
      default: false,
    },
    isDataLoading: {
      type: Boolean,
      default: false,
    },
    isButtonLoading: {
      type: Boolean,
      default: false,
    },
    fileUploadLoading: {
      type: Boolean,
      default: false,
    },
    deletingFileIds: {
      type: Array,
    },
  },

  components: {
    "daniko-button": danikoButton,
    "daniko-right-block": danikoRightBlock,
    "daniko-input": danikoInput,
    "daniko-multiple-file-input": danikoMultipleFileInput,
    "daniko-textarea": danikoTextarea,
    "daniko-add-schedule": danikoAddSchedule,
    "daniko-price-field": danikoPriceField,
    "daniko-choose-provided": danikoChooseProvided,
    "daniko-notification": danikoNotification,
  },

  data() {
    return {
      isNotificationOpen: false,
      notificationHeading: "",
      notificationText: "",
      notificationStatus: "error",
      newService: {
        id: 0,
        title: "",
        imagePath: "",
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
        price: null,
        providedWorkers: [{ id: 0, name: "" }],
      },
      scheduleDays: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
      isServiceFree: false,
    };
  },

  watch: {
    service() {
      if (this.service.title) {
        this.newService = this.service;
      }

      if (this.newService.price == 0) {
        this.isServiceFree = true;
      } else {
        this.isServiceFree = false;
      }
    },

    workers() {
      if (this.workers) {
        this.workers.forEach((worker) => {
          worker.title = worker.firstName + " " + worker.lastName;
        });
      }
    },

    isServiceBlockOpen() {
      if (this.isServiceBlockOpen) {
        this.$refs.content.scrollTo(0, 0);
        if (!this.service.title) {
          this.newService = {
            id: 0,
            title: "",
            imagePath: "",
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
            price: null,
            providedWorkers: [],
          };
        }
      }
    },
  },

  methods: {
    handleScheduleEdit(editedSchedule) {
      this.scheduleDays.forEach((day) => {
        if (editedSchedule[day].from) {
          this.newService.schedule[day] =
            String(editedSchedule[day].from) +
            ":" +
            String(editedSchedule[day].to);
        }
      });
    },

    handleEditProvided(editedProvided) {
      this.newService.providedWorkers = editedProvided;
    },

    handleAddButton() {
      // сначала проходит валидация на обязательные поля, потом на формат времени приёма
      this.isNotificationOpen = false;
      if (this.newService.title.trim()) {
        if (
          this.isServiceFree ||
          (Number(this.newService.price) && Number(this.newService.price) > 0)
        ) {
          let isScheduleTimeFormatCorrect = true;
          this.scheduleDays.forEach((day) => {
            if (this.newService.schedule[day]) {
              if (
                Number(this.newService.schedule[day].substring(0, 2)) > 23 ||
                Number(this.newService.schedule[day].substring(3, 5)) > 59 ||
                Number(this.newService.schedule[day].substring(6, 8)) > 23 ||
                Number(this.newService.schedule[day].substring(9, 11)) > 59
              ) {
                isScheduleTimeFormatCorrect = false;
              }
            }
          });

          if (isScheduleTimeFormatCorrect) {
            let isScheduleTimeCorrect = true;
            this.scheduleDays.forEach((day) => {
              if (this.newService.schedule[day]) {
                if (
                  Number(this.newService.schedule[day].substring(0, 2)) >
                    Number(this.newService.schedule[day].substring(6, 8)) ||
                  (Number(this.newService.schedule[day].substring(0, 2)) ==
                    Number(this.newService.schedule[day].substring(6, 8)) &&
                    Number(this.newService.schedule[day].substring(3, 5)) >=
                      Number(this.newService.schedule[day].substring(9, 11)))
                ) {
                  isScheduleTimeCorrect = false;
                }
              }
            });

            if (isScheduleTimeCorrect) {
              this.newService.workersIds = [];

              this.newService.providedWorkers.forEach((worker) => {
                this.newService.workersIds.push(worker.id);
              });

              this.editMode
                ? this.$emit(
                    "edit-service",
                    this.newService.id,
                    this.newService
                  )
                : this.$emit("create-service", this.newService);
            } else {
              this.notificationHeading = "Неверно выставлено время приёма";
              this.notificationText =
                "Время окончания приёма не может быть раньше или равно времени начала приёма";
              this.isNotificationOpen = true;
            }
          } else {
            // проверку валидации пришлось делать через отдельную переменну. isScheduleTimeFormatCorrect, потому что иначе notification мог разом вызваться много раз
            this.notificationHeading = "Неверный формат времени приёма";
            this.notificationText =
              "В поля времени приёма специалиста вводите от 00 до 24 для часов и от 00 до 59 для минут ";
            this.isNotificationOpen = true;
          }
        } else {
          this.notificationHeading = "Укажите стоимость услуги";
          this.notificationText =
            'Укажите стоимость или нажмите "Бесплатная услуга", чтобы сделать её бесплатной ';
          this.isNotificationOpen = true;
        }
      } else {
        this.notificationHeading = "Заполните обязательные поля";
        this.notificationText =
          "Для добавления услуги вы должны указать название";
        this.isNotificationOpen = true;
      }
    },

    repeatUploadFileEmit(file) {
      this.$emit("upload-file", file);
    },

    repeatDeleteFileEmit(fileId) {
      this.$emit("delete-file", fileId);
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

  &-buttons {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &-button {
    margin-top: 10px;
    margin-right: 20px;
  }

  &-delete {
    margin-top: 3px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: $error;
    cursor: pointer;
    transition: 200ms ease-in-out;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }

    &-icon {
      margin-right: 5px;
      font-size: 20px;
    }

    &-title {
      font-size: 15px;
    }
  }

  &-schedule {
    margin: 25px 0;
  }

  &-provided {
    margin: 25px 0;
  }
}
</style>
