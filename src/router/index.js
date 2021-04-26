import Vue from "vue";
import VueRouter from "vue-router";
import headerLayout from "@/components/layouts/daniko-sidebar-layout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: headerLayout,
    children: [],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
