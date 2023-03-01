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
      store.offSet += 40;
      this.$parent.fetchCards();
    },
    prevPage() {
      store.offSet -= 40;
      this.$parent.fetchCards();
    },
  },
};
</script>

<template>
  <main>
    <div class="container">
      <!-- AL CLICK, FILTRA LE CARDS IN BASE ALL'OPZIONE  -->
      <select @change="filterCards" class="my-5">
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
        v-if="store.offSet >= 40"
        type="button"
        class="btn btn-secondary"
        @click="prevPage()"
      >
        PREV
      </button>
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
