<template>
  <daniko-right-block
    :isOpen="isAddWorkerBlockOpen"
    title="Новый специалист"
    @close-right-block="$emit('close')"
  >
    <div class="right-block-component">
      <daniko-input
        class="right-block-input"
        title="Имя"
        placeholder="Введите имя специалиста"
        v-model="newWorker.firstName"
      />
      <daniko-input
        class="right-block-input"
        title="Фамилия"
        placeholder="Введите фамилию специалиста"
        v-model="newWorker.lastName"
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
      <daniko-add-schedule class="right-block-schedule" />
      <daniko-button class="right-block-button"
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

export default {
  props: {
    isAddWorkerBlockOpen: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    "daniko-button": danikoButton,
    "daniko-right-block": danikoRightBlock,
    "daniko-input": danikoInput,
    "daniko-textarea": danikoTextarea,
    "daniko-add-schedule": danikoAddSchedule,
  },

  data() {
    return {
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
    };
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
}
</style>
