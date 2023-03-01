<script>
import { store } from "../data/store";
import AppCard from "./AppCard.vue";
import AppLoader from "./AppLoader.vue";
export default {
  components: { AppCard, AppLoader },
  data() {
    return {
      store,
      // ARRAY LOCAL CARDS E SWITCH PER IL FILTRO
      // SE IL FILTRO E' ATTIVO USO LOCALCARDS, ALTRIMENTI
      // USO L'ARRAY DELLO STORE
      localCards: [],
      showFilteredCards: false,
    };
  },
  computed: {
    // CALCOLA GLI ARCHETIPI PER MOSTRARLI SOLO UNA VOLTA
    // NELLA SELECT DROP DOWN
    fetchArchetype() {
      let archetypes = [];
      for (let card of store.yugiCards) {
        if (!archetypes.includes(card.archetype)) {
          archetypes.push(card.archetype);
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
  },
  created() {},
};
</script>

<template>
  <main>
    <div class="container">
      <select @change="filterCards" class="my-5">
        <option>All</option>
        <option v-for="archetype in fetchArchetype">
          {{ archetype }}
        </option>
      </select>
      <section>
        <div class="container">
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
                :immagine="card.card_images[0].image_url_small"
                :titolo="card.name"
                :archetipo="card.archetype"
              ></AppCard>
            </div>
            <!-- SE IL FILTRO CARTE E' ATTIVO, PRENDILE DALL'ARRAY LOCALE -->
            <div
              v-if="showFilteredCards"
              class="row row-cols-5 align-items-stretch g-3"
            >
              <AppCard
                v-for="card in localCards"
                :immagine="card.card_images[0].image_url_small"
                :titolo="card.name"
                :archetipo="card.archetype"
              ></AppCard>
            </div>
          </div>
          <!-- LOADER ATTIVO -->
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
}

section {
  background-color: white;
  min-height: 70vh;
}
</style>
