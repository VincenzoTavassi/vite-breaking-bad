<script>
import { store } from "../data/store";
import AppCard from "./AppCard.vue";
import AppLoader from "./AppLoader.vue";
import AppSearch from "./AppSearch.vue";
import axios from "axios";

export default {
  components: { AppCard, AppLoader, AppSearch },
  data() {
    return {
      store,
      // ARRAY LOCAL CARDS E SWITCH PER IL FILTRO
      // SE IL FILTRO E' ATTIVO USO LOCALCARDS, ALTRIMENTI
      // USO L'ARRAY DELLO STORE
      localCards: [],
      showFilteredCards: false,
      cardsCount: 0,
      offSet: 0,
      url: "https://db.ygoprodeck.com/api/v7/cardinfo.php?num=40&offset=",
    };
  },
  computed: {
    // CALCOLA GLI ARCHETIPI PER MOSTRARLI SOLO UNA VOLTA
    // NELLA SELECT DROP DOWN
    fetchArchetype() {
      let archetypes = [];
      for (let card of store.yugiCards) {
        // AGGIUNGI L'OPZIONE SOLO SE L'ARCHETIPO E' PRESENTE
        if (card.archetype != null) {
          if (!archetypes.includes(card.archetype)) {
            archetypes.push(card.archetype);
          }
        }
      }
      return archetypes;
    },
  },
  methods: {
    // FILTRA LE CARTE IN BASE ALL'ARCHETIPO RICEVUTO DALLA
    // DROP DOWN (il @change invia l'evento come .target.value)
    filterCards(archetype) {
      // SE L'OPZIONE E' ALL, SWITCHA A FALSE SHOWFILTEREDCARDS
      console.log(archetype.target.value);
      if (archetype.target.value == "All") {
        this.showFilteredCards = false;
      } else {
        // ALTRIMENTI FILTRA IN BASE ALL'ARCHETIPO RICEVUTO
        const filteredCards = store.yugiCards.filter(
          (card) => card.archetype == archetype.target.value
        );
        // AGGIORNA L'ARRAY LOCALE IN BASE AL FILTRO
        this.localCards = filteredCards;
        // SWITCHA IL FILTRO AD ON
        this.showFilteredCards = true;
      }
    },
    nextPage() {
      // modifico l'offset e uso il
      // metodo del padre, app.vue
      this.offSet += 40;
      this.fetchCards();
    },
    prevPage() {
      this.offSet -= 40;
      this.fetchCards();
    },
    fetchCards(filter) {
      store.isLoading = true;
      let urlParams = "";
      if (!filter || filter.target.value == "All") {
        urlParams = this.url + this.offSet;
      } else if (filter) {
        urlParams = this.url + this.offSet + "&type=" + filter.target.value;
      }
      axios
        .get(urlParams)
        .then((response) => {
          store.yugiCards = response.data.data;
          this.cardsCount = response.data.meta.total_rows;
        })
        .finally(() => {
          store.isLoading = false;
        });
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
      <!-- AL CLICK, FILTRA LE CARDS IN BASE ALL'OPZIONE  -->
      <label class="mx-2 fw-bold" for="archetype-search">Archetipo:</label>
      <select id="archetype-search" @change="filterCards" class="my-5">
        <option>All</option>
        <!-- CICLA LA COMPUTED PER AGGIUNGERE LE OPZIONI DI FILTRO CARTE UNA SOLA VOLTA -->
        <option v-for="archetype in fetchArchetype" :key="archetype">
          {{ archetype }}
        </option>
      </select>
      <button type="button" class="btn btn-secondary mx-3" @click="nextPage()">
        NEXT
      </button>
      <button
        v-if="offSet >= 40"
        type="button"
        class="btn btn-secondary"
        @click="prevPage()"
      >
        PREV
      </button>
      <section>
        <div class="container">
          <h2>Ho trovato {{ cardsCount }} carte.</h2>
          <!-- SE NON E' IN CARICAMENTO, PROCEDI -->
          <div v-if="!store.isLoading">
            <!-- SE IL FILTRO CARTE NON E' ATTIVO, PRENDILE DALL'ARRAY
            DEL FILE STORE -->
            <div
              v-if="!showFilteredCards"
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
            <!-- SE IL FILTRO CARTE E' ATTIVO, PRENDILE DALL'ARRAY LOCALE -->
            <div
              v-if="showFilteredCards"
              class="row row-cols-5 align-items-stretch g-3"
            >
              <AppCard
                v-for="card in localCards"
                :immagine="card.card_images[0].image_url"
                :titolo="card.name"
                :archetipo="card.archetype"
                :key="card.id"
              ></AppCard>
            </div>
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
