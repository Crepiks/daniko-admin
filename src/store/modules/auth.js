import router from "@/router/index";

export default {
  state: {
    isLoggedIn: Boolean(localStorage.getItem("authToken")) || false,
    authToken: localStorage.getItem("authToken"),
    userEmail: localStorage.getItem("userEmail"),
  },
  mutations: {
    login(state, { token, email }) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("userEmail", email);
      state.authToken = token;
      state.userEmail = email;
      state.isLoggedIn = true;
      router.push("/workers");
    },
    logout(state) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userEmail");
      state.isLoggedIn = false;
      router.push("/login");
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    authToken: (state) => state.authToken,
    userEmail: (state) => state.userEmail,
  },
};
