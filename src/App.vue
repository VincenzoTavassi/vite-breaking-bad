<script>
import { store } from "./data/store";
import axios from "axios";
import AppHeader from "./components/AppHeader.vue";
import AppMain from "./components/AppMain.vue";
export default {
  components: { AppHeader, AppMain },
  data() {
    return {
      store,
    };
  },
  methods: {
    fetchCards() {
      axios.get(store.url).then((response) => {
        store.yugiCards = response.data.data;
      });
    },
  },
  created() {
    this.fetchCards();
  },
};
</script>

<template>
  <AppHeader />
  <AppMain />
</template>

<style></style>
