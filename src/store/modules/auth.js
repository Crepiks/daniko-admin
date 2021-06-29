import router from "@/router/index";

export default {
  state: {
    isLoggedIn: Boolean(localStorage.getItem("authToken")) || false,
    authToken: localStorage.getItem("authToken"),
    userEmail: localStorage.getItem("userEmail"),
    userId: localStorage.getItem("userId"),
  },
  mutations: {
    login(state, { token, email, id }) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userId", id);
      state.authToken = token;
      state.userEmail = email;
      state.userId = id;
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
