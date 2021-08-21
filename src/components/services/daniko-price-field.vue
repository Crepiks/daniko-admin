<template>
  <div class="price-form">
    <transition name="fade" mode="out-in">
      <div
        v-if="!isServiceFree"
        class="price-form__field price-field"
        key="price-field"
      >
        <daniko-input
          class="price-field__input"
          title="Стоимость услуги"
          only="number"
          placeholder="10000"
          :value="value"
          @input="updateValue"
        />
        <span class="price-field__postfix">тг</span>
      </div>
      <div
        v-else
        class="price-form__free-service-status"
        key="free-service-status"
      >
        Бесплатно
      </div>
    </transition>
    <button
      class="price-form__free-button"
      @click="$emit('change-free-status')"
    >
      {{ !isServiceFree ? "Бесплатная услуга" : "Платная услуга" }}
    </button>
  </div>
</template>

<script>
import danikoInput from "@/components/common/daniko-input.vue";

export default {
  props: {
    isServiceFree: {
      type: Boolean,
      default: false,
    },
    value: {},
  },

  components: {
    "daniko-input": danikoInput,
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

.price-form {
  padding: 10px 0 30px;
  width: 100%;
  min-height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
}

.price-form__field {
  margin-right: 30px;
}

.price-field {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}

.price-field__input {
  margin-right: 14px;
  width: 150px;
}

.price-field__postfix {
  margin-bottom: 10px;
  color: $main-dark;
  font-size: 20px;
}

.price-form__free-service-status {
  padding: 10px 20px;
  color: $white;
  font-size: 16px;
  font-weight: 500;
  border-radius: 10px;
  background-color: $primary;
}

.price-form__free-button {
  margin-bottom: 10px;
  color: $primary;
  font-size: 16px;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  transition: 200ms ease-in-out;

  &:hover {
    opacity: 0.6;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
