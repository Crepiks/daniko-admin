<template>
  <div class="services-page">
    <header class="services-header">
      <h2 class="services-title">Услуги</h2>
      <daniko-button>Добавить услугу</daniko-button>
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
import services from "@/data/services.js";
import service from "@/data/service.js";

export default {
  components: {
    "daniko-button": danikoButton,
    "daniko-service-card": danikoServiceCard,
  },

  data() {
    return {
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
    };
  },

  methods: {
    changeActiveWorker(serviceId) {
      // запрос на получение worker
      console.log(serviceId); // просто саюзал workerId
      this.activeService.name = service.name;
      this.activeService.imagePath = service.imagePath;
      this.activeService.description = service.description;
      this.activeService.schedule = service.schedule;
      this.activeService.providedWorkers = service.providedWorkers;
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
