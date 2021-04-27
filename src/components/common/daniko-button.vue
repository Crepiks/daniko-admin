<template>
  <div>
    <button
      @click="$emit('click')"
      class="button"
      :class="{ 'button-border': type == 'border' }"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.button {
  padding: 10px 25px;
  box-sizing: border-box;
  color: $white;
  font-size: 16px;
  text-decoration: none;
  border: 1px solid $primary;
  border-radius: 10px;
  outline: none;
  background-color: $primary;
  transition: 200ms ease-in-out;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  &-border {
    color: $primary;
    background-color: transparent;
  }
}
</style>
