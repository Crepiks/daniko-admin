import router from "@/router/index";

export default {
  state: {
    isLoggedIn: Boolean(localStorage.getItem("authToken")) || false,
    authToken: localStorage.getItem("authToken"),
  },
  mutations: {
    login(state, token) {
      console.log("login mut");
      console.log(token);
      localStorage.setItem("authToken", token);
      console.log(localStorage.getItem("authToken"));
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
    authToken: (state) => state.authToken,
  },
};
