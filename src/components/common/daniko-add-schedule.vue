<template>
  <div class="schedule">
    <header class="schedule-header">
      <h3 class="schedule-title">График работы</h3>
      <span class="schedule-link" @click="showSchedule = !showSchedule">{{
        showSchedule
          ? "Не показывать график специалиста"
          : "Показывать график специалиста"
      }}</span>
    </header>
    <div class="schedule-days" v-if="showSchedule">
      <daniko-add-day
        class="schedule-day"
        v-for="(day, index) in days"
        :key="index"
        :day="day.rus"
        @change-from-time="handleChangeFromTime($event, day)"
        @change-to-time="handleChangeToTime($event, day)"
      />
    </div>
  </div>
</template>

<script>
import danikoAddDay from "@/components/common/daniko-add-day.vue";

export default {
  components: {
    "daniko-add-day": danikoAddDay,
  },

  data() {
    return {
      days: [
        {
          rus: "Понедельник",
          eng: "monday",
        },
        {
          rus: "Вторник",
          eng: "tuesday",
        },
        {
          rus: "Среда",
          eng: "wednesday",
        },
        {
          rus: "Четверг",
          eng: "thursday",
        },
        {
          rus: "Пятница",
          eng: "friday",
        },
        {
          rus: "Суббота",
          eng: "saturday",
        },
        {
          rus: "Воскресенье",
          eng: "sunday",
        },
      ],
      schedule: {
        monday: {
          from: "",
          to: "",
        },
        tuesday: {
          from: "",
          to: "",
        },
        wednesday: {
          from: "",
          to: "",
        },
        thursday: {
          from: "",
          to: "",
        },
        friday: {
          from: "",
          to: "",
        },
        saturday: {
          from: "",
          to: "",
        },
        sunday: {
          from: "",
          to: "",
        },
      },
      showSchedule: true,
    };
  },

  methods: {
    handleChangeFromTime(fromTime, day) {
      this.schedule[day.eng].from = fromTime;
      this.$emit("edit-schedule", this.schedule);
    },
    handleChangeToTime(toTime, day) {
      this.schedule[day.eng].to = toTime;
      this.$emit("edit-schedule", this.schedule);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.schedule {
  width: 100%;
  display: flex;
  flex-direction: column;

  &-header {
    margin-bottom: 30px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &-title {
    color: $main-dark;
    font-size: 20px;
    font-weight: 700;
  }

  &-link {
    color: $primary;
    font-size: 14px;
    cursor: pointer;
    transition: 200ms ease-in-out;

    &:hover {
      opacity: 0.6;
    }
  }

  &-days {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &-day {
    margin-bottom: 15px;
  }
}
</style>
