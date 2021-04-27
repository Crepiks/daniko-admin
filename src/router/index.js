import Vue from "vue";
import VueRouter from "vue-router";
import headerLayout from "@/components/layouts/daniko-sidebar-layout.vue";
import workers from "@/views/daniko-workers.vue";
import services from "@/views/daniko-services.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: headerLayout,
    children: [
      {
        path: "/workers",
        name: "workers",
        component: workers,
      },
      {
        path: "/services",
        name: "services",
        component: services,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
