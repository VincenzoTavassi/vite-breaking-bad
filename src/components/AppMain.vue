<script>
import { store } from "../data/store";
import AppCard from "./AppCard.vue";
import AppLoader from "./AppLoader.vue";
import AppSearch from "./AppSearch.vue";
import AppChangePage from "./AppChangePage.vue";
import AppSearchCounter from "./AppSearchCounter.vue";
import axios from "axios";

export default {
  components: {
    AppCard,
    AppLoader,
    AppSearch,
    AppChangePage,
    AppSearchCounter,
  },
  data() {
    return {
      store,
      cardsCount: 0,
      offSet: 0,
      url: "https://db.ygoprodeck.com/api/v7/cardinfo.php?num=40&offset=",
      nextPageApi: "",
      prevPageApi: "",
    };
  },
  methods: {
    updateCards(url) {
      store.isLoading = true;
      axios
        .get(url)
        .then((response) => {
          store.yugiCards = response.data.data;
          this.cardsCount = response.data.meta.total_rows;
          this.nextPageApi = response.data.meta.next_page;
          this.prevPageApi = response.data.meta.previous_page;
        })
        .finally(() => {
          store.isLoading = false;
        });
    },
    nextPage() {
      this.updateCards(this.nextPageApi);
    },
    prevPage() {
      this.updateCards(this.prevPageApi);
    },
    fetchCards(filter) {
      let urlParams = "";
      if (!filter || filter.target.value == "All") {
        urlParams = this.url + this.offSet;
      } else if (filter) {
        urlParams = this.url + this.offSet + "&type=" + filter.target.value;
      }
      this.updateCards(urlParams);
    },
  },
  created() {
    this.fetchCards();
  },
};
</script>

<template>
  <main>
    <div class="container">
      <AppSearch @change-option="fetchCards" />
      <AppChangePage v-if="this.nextPageApi" @change-page="nextPage"
        >NEXT</AppChangePage
      >
      <AppChangePage v-if="this.prevPageApi" @change-page="prevPage"
        >PREV</AppChangePage
      >
      <section>
        <div class="container">
          <!-- SE NON E' IN CARICAMENTO, PROCEDI -->
          <AppSearchCounter :counter="cardsCount" v-if="!store.isLoading" />
          <div
            v-if="!store.isLoading"
            class="row row-cols-5 align-items-stretch g-3"
          >
            <AppCard
              v-for="card in store.yugiCards"
              :immagine="card.card_images[0].image_url"
              :titolo="card.name"
              :archetipo="card.archetype"
              :key="card.id"
            ></AppCard>
          </div>
          <!-- ALTRIMENTI MOSTRA LOADER SE IL CARICAMENTO E' IN CORSO -->
          <AppLoader v-else>
            <p>Carico le cards.</p>
          </AppLoader>
        </div>
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  background-color: hsl(33deg 64% 53%);
  min-height: 90vh;
}

select {
  padding: 10px 5px;
  font-size: 1.5rem;
  width: 250px;
}

section {
  background-color: white;
  min-height: 70vh;
}
</style>
