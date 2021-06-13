import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";

import MainLayout from "@/components/layouts/main";
import Workers from "@/views/workers";
import Services from "@/views/services";
import Contacts from "@/views/contacts";
import Photos from "@/views/photos";
import Login from "@/views/login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: MainLayout,
    meta: {
      needAuth: true,
    },
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
      {
        path: "/gallery",
        name: "photos",
        component: Photos,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      unauthorizedOnly: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.needAuth)) {
    if (store.getters.isLoggedIn) {
      next();
    } else {
      next("/login");
    }
  } else if (to.matched.some((record) => record.meta.unauthorizedOnly)) {
    if (!store.getters.isLoggedIn) {
      next();
    } else {
      next("/workers");
    }
  } else {
    next();
  }
});

export default router;
