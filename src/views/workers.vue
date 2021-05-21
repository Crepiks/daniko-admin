<template>
  <div class="workers-page">
    <daniko-worker-fields
      :isAddWorkerBlockOpen="isAddWorkerBlockOpen || isEditWorkerBlockOpen"
      :edit-mode="isEditWorkerBlockOpen"
      :services="services"
      :worker="activeWorker"
      @close="
        isAddWorkerBlockOpen = false;
        isEditWorkerBlockOpen = false;
        activeWorker = {};
      "
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
        :imagePath="
          worker.image
            ? baseUrl + worker.image.path
            : 'https://www.ihep.org/wp-content/themes/ihep-theme/assets/images/user-profile.jpg'
        "
        :name="worker.firstName + ' ' + worker.lastName"
        :job="worker.branch"
        @edit-worker="changeActiveWorker(worker.id)"
      />
    </div>
  </div>
</template>

<script>
import danikoButton from "@/components/common/daniko-button.vue";
import danikoWorkerCard from "@/components/workers/daniko-worker-card.vue";
import danikoWorkerFileds from "@/components/workers/daniko-worker-fields.vue";
import WorkersRequests from "@/requests/workers.js";
import ServicesRequests from "@/requests/services.js";
import config from "@/config.js";

export default {
  components: {
    "daniko-button": danikoButton,
    "daniko-worker-card": danikoWorkerCard,
    "daniko-worker-fields": danikoWorkerFileds,
  },

  data() {
    return {
      baseUrl: config.apiUrl,
      workers: [
        {
          id: 0,
          firstName: "",
          lastName: "",
          image: {
            path: "",
          },
          branch: "",
        },
      ],
      services: [
        {
          id: 0,
        },
      ],
      activeWorker: {},
      isAddWorkerBlockOpen: false,
      isEditWorkerBlockOpen: false,
    };
  },

  mounted() {
    WorkersRequests.findAll().then((res) => {
      this.workers = res.workers;
    });

    ServicesRequests.findAll().then((res) => {
      this.services = res.services;
    });
  },

  methods: {
    changeActiveWorker(workerId) {
      var worker = {};
      var parsedWorker = {};
      this.isEditWorkerBlockOpen = true;
      WorkersRequests.findOne(workerId).then((res) => {
        worker = res.worker;

        parsedWorker.firstName = worker.firstName;
        parsedWorker.lastName = worker.lastName;
        parsedWorker.job = worker.branch;
        parsedWorker.imagePath = worker.image.path;
        parsedWorker.description = worker.description;
        parsedWorker.schedule = worker.schedule;
        parsedWorker.providedServices = worker.services;
        this.activeWorker = parsedWorker;
      });
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
