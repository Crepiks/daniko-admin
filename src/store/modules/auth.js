import router from "@/router/index";

export default {
  state: {
    isLoggedIn: Boolean(localStorage.getItem("authToken")) || false,
    authToken: localStorage.getItem("authToken"),
  },
  mutations: {
    login(state, token) {
      localStorage.setItem("authToken", token);
      state.isLoggedIn = true;
      router.push("/workers");
    },
    logout(state) {
      localStorage.removeItem("authToken");
      state.isLoggedIn = false;
      router.push("/login");
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
  },
};
