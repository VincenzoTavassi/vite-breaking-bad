<script>
import { store } from "../data/store";
import AppCard from "./AppCard.vue";
import AppLoader from "./AppLoader.vue";
export default {
  components: { AppCard, AppLoader },
  data() {
    return {
      store,
    };
  },
  methods: {},
};
</script>

<template>
  <main>
    <div class="container">
      <select class="my-5">
        <option v-for="card in store.yugiCards">{{ card.archetype }}</option>
      </select>
      <section>
        <div class="container">
          <div
            v-if="!store.isLoading"
            class="row row-cols-5 align-items-stretch g-3"
          >
            <AppCard
              v-for="card in store.yugiCards"
              :immagine="card.card_images[0].image_url_small"
              :titolo="card.name"
              :archetipo="card.archetype"
            ></AppCard>
          </div>
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
