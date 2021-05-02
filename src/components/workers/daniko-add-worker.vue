<template>
  <daniko-right-block
    :isOpen="isAddWorkerBlockOpen"
    title="Новый специалист"
    @close-right-block="$emit('close')"
  >
    <daniko-notification
      :isActive="isNotificationOpen"
      :heading="notificationHeading"
      :text="notificationText"
      @close-notification="isNotificationOpen = false"
      :status="notificationStatus"
    />
    <div class="right-block-component">
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
        v-model="newWorker.job"
      />
      <daniko-textarea
        class="right-block-input"
        title="Описание"
        placeholder="Добавьте описание специалиста"
        v-model="newWorker.description"
      />
      <daniko-add-schedule
        class="right-block-schedule"
        @edit-schedule="handleScheduleEdit"
      />
      <daniko-choose-provided
        class="right-block-provided"
        title="Предоставляемые услуги"
        :cards="services"
        @edit-provided="handleEditProvided"
      />
      <daniko-button
        class="right-block-button"
        :isLoading="isLoading"
        @click="handleAddButton"
        >Добавить специалиста</daniko-button
      >
    </div>
  </daniko-right-block>
</template>

<script>
import danikoButton from "@/components/common/daniko-button.vue";
import danikoRightBlock from "@/components/common/daniko-right-block.vue";
import danikoInput from "@/components/common/daniko-input.vue";
import danikoTextarea from "@/components/common/daniko-textarea.vue";
import danikoAddSchedule from "@/components/common/daniko-add-schedule.vue";
import danikoChooseProvided from "@/components/common/daniko-choose-provided.vue";
import danikoNotification from "@/components/common/daniko-notification.vue";

export default {
  props: {
    isAddWorkerBlockOpen: {
      type: Boolean,
      default: false,
    },
    services: {
      type: Array,
    },
  },

  components: {
    "daniko-button": danikoButton,
    "daniko-right-block": danikoRightBlock,
    "daniko-input": danikoInput,
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
      isLoading: false,
      newWorker: {
        firstName: "",
        lastName: "",
        job: "",
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
      this.isLoading = true;
      this.isNotificationOpen = false;
      if (
        this.newWorker.firstName.trim() &&
        this.newWorker.lastName.trim() &&
        this.newWorker.job.trim()
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
            // write request here
            console.log("ok");
          } else {
            this.isLoading = false;
            this.notificationHeading = "Неверно выставлено время приёма";
            this.notificationText =
              "Время окончания приёма не может быть раньше или равно времени начала приёма";
            this.isNotificationOpen = true;
          }
        } else {
          // проверку валидации пришлось делать через отдельную переменну. isScheduleTimeFormatCorrect, потому что иначе notification мог разом вызваться много раз
          this.isLoading = false;
          this.notificationHeading = "Неверный формат времени приёма";
          this.notificationText =
            "В поля времени приёма специалиста вводите от 00 до 24 для часов и от 00 до 59 для минут ";
          this.isNotificationOpen = true;
        }
      } else {
        this.isLoading = false;
        this.notificationHeading = "Заполните обязательные поля";
        this.notificationText =
          "Для добавления специалиста вы должны указать: имя, фамилию и специальность";
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
