import Vue from "vue";
import VueRouter from "vue-router";

import MainLayout from "@/components/layouts/main";
import Workers from "@/views/workers";
import Services from "@/views/services";
import Contacts from "@/views/contacts";
import Login from "@/views/login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "/workers",
        name: "workers",
        component: Workers,
      },
      {
        path: "/services",
        name: "services",
        component: Services,
      },
      {
        path: "/contacts",
        name: "contacts",
        component: Contacts,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
