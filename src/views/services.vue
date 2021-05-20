<template>
  <div class="services-page">
    <daniko-service-fields
      :isAddServiceBlockOpen="isAddServiceBlockOpen"
      :workers="workers"
      :service="activeService"
      @close="
        isAddServiceBlockOpen = false;
        activeService = {};
      "
    />
    <header class="services-header">
      <h2 class="services-title">Услуги</h2>
      <daniko-button @click="isAddServiceBlockOpen = true"
        >Добавить услугу</daniko-button
      >
    </header>
    <div class="services-grid">
      <daniko-service-card
        v-for="service in services"
        :key="service.id"
        :imagePath="service.imagePath"
        :name="service.name"
        @edit-serivce="changeActiveWorker(service.id)"
      />
    </div>
  </div>
</template>

<script>
import danikoButton from "@/components/common/daniko-button.vue";
import danikoServiceCard from "@/components/services/daniko-service-card.vue";
import danikoServiceFields from "@/components/services/daniko-service-fields.vue";
import services from "@/data/services.js";
import service from "@/data/service.js";
import workers from "@/data/workers.js";

export default {
  components: {
    "daniko-button": danikoButton,
    "daniko-service-card": danikoServiceCard,
    "daniko-service-fields": danikoServiceFields,
  },

  data() {
    return {
      workers: workers,
      services: services,
      activeService: {
        name: "",
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
        providedWorkers: [{ id: 0, name: "" }],
      },
      isAddServiceBlockOpen: false,
    };
  },

  methods: {
    changeActiveWorker(serviceId) {
      // запрос на получение worker
      console.log(serviceId); // просто саюзал workerId
      var parsedService = {};
      parsedService.name = service.name;
      parsedService.imagePath = service.imagePath;
      parsedService.description = service.description;
      parsedService.schedule = service.schedule;
      parsedService.providedWorkers = service.providedWorkers;
      this.activeService = parsedService;
      this.isAddServiceBlockOpen = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.services {
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
