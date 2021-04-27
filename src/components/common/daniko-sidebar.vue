<template>
  <div class="sidebar">
    <div class="sidebar-main">
      <div class="sidebar-logo">
        <img
          src="@/assets/images/logo.svg"
          alt="Daniko"
          class="sidebar-logo-image"
        />
      </div>
      <div class="sidebar-links">
        <router-link class="sidebar-link" to="/workers">
          <i class="bx bxs-user-account sidebar-link-icon"></i>
          <span class="sidebar-link-label">Специалисты</span>
        </router-link>
        <router-link class="sidebar-link" to="/services">
          <i class="bx bxs-select-multiple sidebar-link-icon"></i>
          <span class="sidebar-link-label">Услуги</span>
        </router-link>
        <router-link class="sidebar-link" to="/contacts">
          <i class="bx bxs-phone sidebar-link-icon"></i>
          <span class="sidebar-link-label">Контакты</span>
        </router-link>
      </div>
    </div>
    <div class="sidebar-links">
      <div class="sidebar-link">
        <i class="bx bxs-user-circle sidebar-link-icon"></i>
        <span class="sidebar-link-label">Профиль</span>
      </div>
      <div @click="logout" class="sidebar-link sidebar-link-danger">
        <i class="bx bx-log-out sidebar-link-icon"></i>
        <span class="sidebar-link-label">Выход</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.sidebar {
  padding: 0 20px 40px 40px;
  width: 300px;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $white;

  &-main {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &-logo {
    margin-bottom: 40px;
    width: 90%;
    height: 120px;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #b2bec330;

    &-image {
      width: 75%;
    }
  }

  &-links {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &-link {
    margin-bottom: 30px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: $main-dark;
    text-decoration: none;
    cursor: pointer;
    transition: 200ms ease-in-out;
    opacity: 0.6;

    &:hover {
      opacity: 0.8;
    }

    &-icon {
      margin-right: 15px;
      font-size: 22px;
    }

    &-label {
      font-size: 16px;
      font-weight: 700;
    }

    &-danger {
      &:hover {
        color: #e74c3c;
      }
    }
  }
}
</style>

<style lang="scss">
@import "@/assets/styles/variables.scss";

.router-link-active {
  & > .sidebar-link-icon {
    color: $primary;
  }

  & > .sidebar-link-label {
    color: $primary;
  }
}
</style>
