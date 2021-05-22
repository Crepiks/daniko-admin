<template>
  <div class="schedule">
    <header class="schedule-header">
      <h3 class="schedule-title">График работы</h3>
    </header>
    <div class="schedule-days">
      <daniko-add-day
        class="schedule-day"
        v-for="(day, index) in days"
        :key="index"
        :day="day.rus"
        :from="schedule[day.eng].from"
        :to="schedule[day.eng].to"
        @change-from-time="handleChangeFromTime($event, day)"
        @change-to-time="handleChangeToTime($event, day)"
      />
    </div>
  </div>
</template>

<script>
import danikoAddDay from "@/components/common/daniko-add-day.vue";

export default {
  props: {
    scheduleDefault: {
      type: Object,
    },
  },

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
    };
  },

  watch: {
    scheduleDefault() {
      if (this.scheduleDefault) {
        this.days.forEach((day) => {
          if (this.scheduleDefault[day.eng]) {
            this.schedule[day.eng].from = this.scheduleDefault[day.eng].substr(
              0,
              5
            );
            this.schedule[day.eng].to = this.scheduleDefault[day.eng].substr(
              6,
              11
            );
          } else {
            this.schedule[day.eng].from = "";
            this.schedule[day.eng].to = "";
          }
        });
      }
    },
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
