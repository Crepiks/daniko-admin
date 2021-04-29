<template>
  <div class="workers-page">
    <daniko-right-block
      :isOpen="isRightBlockOpen"
      title="Новый специалист"
      @close-right-block="isRightBlockOpen = false"
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
    <header class="workers-header">
      <h2 class="workers-title">Специалисты</h2>
      <daniko-button @click="isRightBlockOpen = true"
        >Добавить специалиста</daniko-button
      >
    </header>
    <div class="workers-grid">
      <daniko-worker-card
        v-for="worker in workers"
        :key="worker.id"
        :imagePath="worker.imagePath"
        :name="worker.name"
        :job="worker.job"
        @edit-worker="changeActiveWorker(worker.id)"
      />
    </div>
  </div>
</template>

<script>
import danikoButton from "@/components/common/daniko-button.vue";
import danikoWorkerCard from "@/components/workers/daniko-worker-card.vue";
import danikoRightBlock from "@/components/common/daniko-right-block.vue";
import danikoInput from "@/components/common/daniko-input.vue";
import danikoTextarea from "@/components/common/daniko-textarea.vue";
import danikoAddSchedule from "@/components/common/daniko-add-schedule.vue";
import workers from "@/data/workers.js";
import worker from "@/data/worker.js";

export default {
  components: {
    "daniko-button": danikoButton,
    "daniko-worker-card": danikoWorkerCard,
    "daniko-right-block": danikoRightBlock,
    "daniko-input": danikoInput,
    "daniko-textarea": danikoTextarea,
    "daniko-add-schedule": danikoAddSchedule,
  },

  data() {
    return {
      workers: workers,
      activeWorker: {
        name: "",
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
      isRightBlockOpen: false,
    };
  },

  methods: {
    changeActiveWorker(workerId) {
      // запрос на получение worker
      console.log(workerId); // просто саюзал workerId
      this.activeWorker.name = worker.name;
      this.activeWorker.job = worker.job;
      this.activeWorker.imagePath = worker.imagePath;
      this.activeWorker.description = worker.description;
      this.activeWorker.schedule = worker.schedule;
      this.activeWorker.providedServices = worker.providedServices;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.workers {
  &-page {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &-header {
    margin-bottom: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &-title {
    color: $main-dark;
    font-size: 28px;
    font-weight: bold;
  }

  &-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
    row-gap: 40px;
  }
}

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
