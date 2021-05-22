import axios from "axios";
import config from "@/config";
import store from "@/store/index";
// import router from "@/router/index";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: config.apiUrl,
});

instance.interceptors.request.use(
  (config) => {
    if (store.getters.isLoggedIn) {
      config.headers["Authorization"] = store.getters.accessToken;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// instance.interceptors.response.use((err) => {
//   if (err.response.status === 401) {
//     store.commit("logout");
//     if (router.currentRoute.fullPath !== "/login") {
//       router.push("/login");
//     }
//     return;
//   }
// });

export default instance;
