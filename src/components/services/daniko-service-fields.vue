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
      <daniko-file-input />
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
      <daniko-choose-provided
        class="right-block-provided"
        title="Предоставляющие услугу врачи"
        :cards="workers"
        :provided="newService.providedWorkers"
        @edit-provided="handleEditProvided"
      />
      <daniko-button
        class="right-block-button"
        :isLoading="isButtonLoading"
        @click="handleAddButton"
        >{{ editMode ? "Сохранить услугу" : "Добавить услугу" }}</daniko-button
      >
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
    };
  },

  watch: {
    service() {
      if (this.service.title) {
        this.newService = this.service;
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
        this.$refs.content.scrollIntoView();
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
            providedWorkers: [{ id: 0, name: "" }],
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
              ? this.$emit("edit-service", this.newService.id, this.newService)
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
        this.notificationHeading = "Заполните обязательные поля";
        this.notificationText =
          "Для добавления услуги вы должны указать название";
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
  }

  &-schedule {
    margin: 25px 0;
  }

  &-provided {
    margin: 25px 0;
  }
}
</style>
