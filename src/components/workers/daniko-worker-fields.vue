<template>
  <daniko-right-block
    :isOpen="isWorkerBlockOpen"
    :title="editMode ? 'Редактирование специалиста' : 'Новый специалист'"
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
      <daniko-file-input
        v-if="editMode"
        :filePreview="worker.imagePath"
        :uploadLoading="fileUploadLoading"
        :changeLoading="fileChangeLoading"
        @upload-file="repeatUploadFileEmit"
      />
      <daniko-input
        class="right-block-input"
        title="Имя"
        placeholder="Введите имя специалиста"
        v-model="newWorker.firstName"
        only="text"
      />
      <daniko-input
        class="right-block-input"
        title="Фамилия"
        placeholder="Введите фамилию специалиста"
        v-model="newWorker.lastName"
        only="text"
      />
      <daniko-input
        class="right-block-input"
        title="Специальность"
        placeholder="Введите специальность специалиста"
        v-model="newWorker.branch"
      />
      <daniko-textarea
        class="right-block-input"
        title="Описание"
        placeholder="Добавьте описание специалиста"
        v-model="newWorker.description"
      />
      <daniko-add-schedule
        class="right-block-schedule"
        :scheduleDefault="newWorker.schedule"
        @edit-schedule="handleScheduleEdit"
      />
      <daniko-choose-provided
        class="right-block-provided"
        title="Предоставляемые услуги"
        :cards="services"
        :provided="newWorker.providedServices"
        @edit-provided="handleEditProvided"
      />
      <div class="right-block-buttons">
        <daniko-button
          class="right-block-button"
          :isLoading="isButtonLoading"
          @click="handleAddButton"
          >{{
            editMode ? "Сохранить специалиста" : "Добавить специалиста"
          }}</daniko-button
        >
        <div
          v-if="editMode"
          class="right-block-delete"
          @click="$emit('delete-worker')"
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
import danikoFileInput from "@/components/common/daniko-file-input.vue";
import danikoTextarea from "@/components/common/daniko-textarea.vue";
import danikoAddSchedule from "@/components/common/daniko-add-schedule.vue";
import danikoChooseProvided from "@/components/common/daniko-choose-provided.vue";
import danikoNotification from "@/components/common/daniko-notification.vue";

export default {
  props: {
    isWorkerBlockOpen: {
      type: Boolean,
      default: false,
    },
    worker: {
      type: Object,
    },
    services: {
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
    fileChangeLoading: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    "daniko-button": danikoButton,
    "daniko-right-block": danikoRightBlock,
    "daniko-input": danikoInput,
    "daniko-file-input": danikoFileInput,
    "daniko-textarea": danikoTextarea,
    "daniko-add-schedule": danikoAddSchedule,
    "daniko-choose-provided": danikoChooseProvided,
    "daniko-notification": danikoNotification,
  },

  data() {
    return {
      isNotificationOpen: false,
      notificationHeading: "",
      notificationText: "",
      notificationStatus: "error",
      newWorker: {
        firstName: "",
        lastName: "",
        branch: "",
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
        providedServices: [{ id: 0, name: "" }],
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
    };
  },

  watch: {
    worker() {
      if (this.worker.firstName) {
        this.newWorker = this.worker;
      }
    },

    isWorkerBlockOpen() {
      if (this.isWorkerBlockOpen) {
        this.$refs.content.scrollTo(0, 0);
        if (!this.worker.firstName) {
          this.newWorker = {
            firstName: "",
            lastName: "",
            branch: "",
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
            providedServices: [],
          };
        }
      }
    },
  },

  methods: {
    handleScheduleEdit(editedSchedule) {
      this.scheduleDays.forEach((day) => {
        if (editedSchedule[day].from) {
          this.newWorker.schedule[day] =
            String(editedSchedule[day].from) +
            ":" +
            String(editedSchedule[day].to);
        }
      });
    },

    handleEditProvided(editedProvided) {
      this.newWorker.providedServices = editedProvided;
    },

    handleAddButton() {
      // сначала проходит валидация на обязательные поля, потом на формат времени приёма
      this.isNotificationOpen = false;
      if (
        this.newWorker.firstName.trim() &&
        this.newWorker.lastName.trim() &&
        this.newWorker.branch.trim()
      ) {
        let isScheduleTimeFormatCorrect = true;
        this.scheduleDays.forEach((day) => {
          if (this.newWorker.schedule[day]) {
            if (
              Number(this.newWorker.schedule[day].substring(0, 2)) > 23 ||
              Number(this.newWorker.schedule[day].substring(3, 5)) > 59 ||
              Number(this.newWorker.schedule[day].substring(6, 8)) > 23 ||
              Number(this.newWorker.schedule[day].substring(9, 11)) > 59
            ) {
              isScheduleTimeFormatCorrect = false;
            }
          }
        });

        if (isScheduleTimeFormatCorrect) {
          let isScheduleTimeCorrect = true;
          this.scheduleDays.forEach((day) => {
            if (this.newWorker.schedule[day]) {
              if (
                Number(this.newWorker.schedule[day].substring(0, 2)) >
                  Number(this.newWorker.schedule[day].substring(6, 8)) ||
                (Number(this.newWorker.schedule[day].substring(0, 2)) ==
                  Number(this.newWorker.schedule[day].substring(6, 8)) &&
                  Number(this.newWorker.schedule[day].substring(3, 5)) >=
                    Number(this.newWorker.schedule[day].substring(9, 11)))
              ) {
                isScheduleTimeCorrect = false;
              }
            }
          });

          if (isScheduleTimeCorrect) {
            this.newWorker.servicesIds = [];

            this.newWorker.providedServices.forEach((service) => {
              this.newWorker.servicesIds.push(service.id);
            });
            this.editMode
              ? this.$emit("edit-worker", this.newWorker.id, this.newWorker)
              : this.$emit("create-worker", this.newWorker);
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
        this.notificationHeading = "Заполните обязательные поля";
        this.notificationText =
          "Для добавления специалиста вы должны указать: имя, фамилию и специальность";
        this.isNotificationOpen = true;
      }
    },

    repeatUploadFileEmit(file) {
      this.$emit("upload-file", file);
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
