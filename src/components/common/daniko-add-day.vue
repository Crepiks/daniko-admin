<template>
  <div class="day">
    <span class="day-title">{{ day }}</span>
    <div class="day-time">
      <div class="day-time-letter">с</div>
      <input
        class="day-time-input"
        v-mask="mask"
        v-model="fromTime"
        placeholder="--.--"
      />
      <div class="day-time-letter">до</div>
      <input
        class="day-time-input"
        v-mask="mask"
        v-model="toTime"
        placeholder="--.--"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    day: {
      type: String,
      required: true,
    },
    from: {
      type: String,
    },
    to: {
      type: String,
    },
  },

  data() {
    return {
      fromTime: "",
      toTime: "",
      mask: "##.##",
    };
  },

  watch: {
    fromTime() {
      this.$emit("change-from-time", this.fromTime);
    },
    toTime() {
      this.$emit("change-to-time", this.toTime);
    },
    from() {
      this.fromTime = this.from;
    },
    to() {
      this.toTime = this.to;
    },
  },

  mounted() {
    if (this.from) this.fromTime = this.time;
    if (this.to) this.toTime = this.to;
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.day {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  &-title {
    color: $main-dark;
    font-size: 15px;
  }

  &-time {
    display: flex;
    flex-direction: row;
    align-items: center;

    &-letter {
      margin: 0 15px;
      color: $main-dark;
      font-size: 15px;
    }

    &-input {
      padding: 5px 10px;
      padding-left: 7px;
      width: 55px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      color: $main-dark;
      font-size: 12px;
      border: 1px solid $primary;
      border-radius: 8px;
      outline: none;
      background-color: transparent;
      opacity: 0.8;
      transition: 200ms ease-in-out;

      &:focus {
        padding-left: 10px;
        opacity: 1;
      }
    }
  }
}
</style>
