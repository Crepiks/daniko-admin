<template>
  <div class="input">
    <label :for="title" v-if="title" class="input-title">{{ title }}</label>
    <input
      class="input-field"
      :id="title"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @keypress="
        only == 'text'
          ? isLetter($event)
          : only == 'number'
          ? isNumber($event)
          : ''
      "
      @input="updateValue($event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    only: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
    },
    value: {
      type: [Number, String, Array],
    },
  },

  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },

    isLetter(e) {
      let char = String.fromCharCode(e.keyCode);
      if (/^[A-Za-zА-Яа-я ]+$/.test(char)) return true;
      else e.preventDefault();
    },

    isNumber(e) {
      let char = String.fromCharCode(e.keyCode);
      if (/^[0-9., ]+$/.test(char)) return true;
      else e.preventDefault();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.input {
  width: 100%;
  display: flex;
  flex-direction: column;

  &-title {
    margin-bottom: 10px;
    color: $main-dark;
    font-size: 14px;
    opacity: 0.7;
  }

  &-field {
    padding: 10px 20px;
    padding-left: 15px;
    width: 100%;
    box-sizing: border-box;
    color: $main-dark;
    font-size: 14px;
    border: 1px solid $primary;
    border-radius: 10px;
    outline: none;
    background: transparent;
    opacity: 0.6;
    transition: 200ms ease-in-out;

    &:focus {
      padding-left: 20px;
      opacity: 1;
    }
  }
}
</style>
