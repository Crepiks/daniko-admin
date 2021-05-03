<template>
  <div class="choose-provided">
    <header class="choose-provided-header">
      <h3 class="choose-provided-title">{{ title }}</h3>
      <span class="choose-provided-explanation">Нажмите на карточку</span>
    </header>
    <div class="choose-provided-cards">
      <div
        v-for="card in cards"
        :key="card.id"
        class="choose-provided-card"
        :class="{ 'choose-provided-card-active': isCardActive(card.id) }"
        @click="changeActiveCards(card.id)"
      >
        {{ card.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Предоставляется",
    },
    cards: {
      type: Array,
    },
    provided: {
      type: Array,
    },
  },

  data() {
    return {
      activeCards: [],
    };
  },

  mounted() {
    this.activeCards = this.provided;
  },

  watch: {
    provided() {
      this.activeCards = this.provided;
    },
  },

  methods: {
    changeActiveCards(cardId) {
      let wasActive = false;
      this.activeCards.forEach((card) => {
        if (card.id == cardId) {
          wasActive = true;
          const index = this.activeCards.indexOf(card);
          this.activeCards.splice(index, 1);
        }
      });
      if (!wasActive) {
        this.cards.forEach((card) => {
          if (card.id == cardId) {
            this.activeCards.push(card);
          }
        });
      }
      this.$emit("edit-provided", this.activeCards);
    },

    isCardActive(cardId) {
      let isActive = false;
      this.activeCards.forEach((card) => {
        if (card.id == cardId) {
          isActive = true;
        }
      });
      return isActive;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.choose-provided {
  width: 100%;
  display: flex;
  flex-direction: column;

  &-header {
    margin-bottom: 30px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &-title {
    color: $main-dark;
    font-size: 20px;
    font-weight: 700;
  }

  &-explanation {
    color: $main-dark;
    font-size: 14px;
  }

  &-cards {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  &-card {
    margin-right: 15px;
    margin-bottom: 10px;
    padding: 15px 25px;
    color: $main-dark;
    font-size: 16px;
    border-radius: 20px;
    background-color: $background;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: 200ms ease-in-out;

    &:hover {
      opacity: 0.8;
    }

    &-active {
      color: $white;
      background-color: $primary;
    }
  }
}
</style>
