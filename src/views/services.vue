<template>
  <div class="services-page">
    <daniko-service-fields
      :isServiceBlockOpen="isAddServiceBlockOpen || isEditServiceBlockOpen"
      :edit-mode="isEditServiceBlockOpen"
      :workers="workers"
      :service="activeService"
      @close="
        isAddServiceBlockOpen = false;
        isEditServiceBlockOpen = false;
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
        :imagePath="service.images[0].path || ''"
        :name="service.title"
        @edit-service="changeActiveService(service.id)"
      />
    </div>
  </div>
</template>

<script>
import danikoButton from "@/components/common/daniko-button.vue";
import danikoServiceCard from "@/components/services/daniko-service-card.vue";
import danikoServiceFields from "@/components/services/daniko-service-fields.vue";
import ServicesRequests from "@/requests/services.js";
import WorkersRequests from "@/requests/workers.js";

export default {
  components: {
    "daniko-button": danikoButton,
    "daniko-service-card": danikoServiceCard,
    "daniko-service-fields": danikoServiceFields,
  },

  data() {
    return {
      services: [
        {
          id: 0,
          title: "",
          images: [
            {
              id: 0,
              path: "",
            },
          ],
        },
      ],
      workers: [
        {
          id: 0,
        },
      ],
      activeService: {
        name: "",
        images: [
          {
            id: 0,
            path: "",
          },
        ],
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
      isEditServiceBlockOpen: false,
    };
  },

  mounted() {
    ServicesRequests.findAll().then((res) => {
      this.services = res.services;
    });

    WorkersRequests.findAll().then((res) => {
      this.workers = res.workers;
    });
  },

  methods: {
    changeActiveService(serviceId) {
      var service = {};
      var parsedService = {};
      this.isEditServiceBlockOpen = true;
      ServicesRequests.findOne(serviceId).then((res) => {
        service = res.service;

        parsedService.title = service.title;
        parsedService.images = service.images;
        parsedService.description = service.description;
        parsedService.schedule = service.schedule;
        parsedService.providedWorkers = service.workers;
        this.activeService = parsedService;
      });
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
