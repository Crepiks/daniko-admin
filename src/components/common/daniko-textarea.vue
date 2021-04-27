<template>
  <div class="textarea">
    <label :for="title" v-if="title" class="textarea-title">{{ title }}</label>
    <textarea
      class="textarea-field"
      rows="10"
      :id="title"
      :placeholder="placeholder"
      :value="value"
      @input="updateValue($event.target.value)"
    ></textarea>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
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
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.textarea {
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
    min-width: 100%;
    max-width: 100%;
    min-height: 200px;
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
