<template>
  <div class="workers-page">
    <daniko-worker-fields
      :isAddWorkerBlockOpen="isAddWorkerBlockOpen"
      :services="services"
      :worker="activeWorker"
      @close="isAddWorkerBlockOpen = false"
      @save-worker="handleSaveWorker"
    />
    <header class="workers-header">
      <h2 class="workers-title">Специалисты</h2>
      <daniko-button @click="isAddWorkerBlockOpen = true"
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
import danikoWorkerFileds from "@/components/workers/daniko-worker-fields.vue";
import workers from "@/data/workers.js";
import worker from "@/data/worker.js";
import services from "@/data/services.js";

export default {
  components: {
    "daniko-button": danikoButton,
    "daniko-worker-card": danikoWorkerCard,
    "daniko-worker-fields": danikoWorkerFileds,
  },

  data() {
    return {
      workers: workers,
      services: services,
      activeWorker: {},
      isAddWorkerBlockOpen: false,
    };
  },

  methods: {
    changeActiveWorker(workerId) {
      // запрос на получение worker
      console.log(workerId); // просто саюзал workerId
      var parsedWorker = {};
      parsedWorker.firstName = worker.firstName;
      parsedWorker.lastName = worker.lastName;
      parsedWorker.job = worker.job;
      parsedWorker.imagePath = worker.imagePath;
      parsedWorker.description = worker.description;
      parsedWorker.schedule = worker.schedule;
      parsedWorker.providedServices = worker.providedServices;
      this.activeWorker = parsedWorker;
      this.isAddWorkerBlockOpen = true;
    },

    handleSaveWorker(newWorker) {
      console.log(newWorker);
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
</style>
