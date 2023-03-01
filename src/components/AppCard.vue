<script>
export default {
  props: {
    immagine: String,
    titolo: String,
    archetipo: String,
  },
};
</script>

<template>
  <div class="text-center col d-flex flex-column py-3">
    <img :src="immagine" alt="" />
    <div class="testo py-2">
      <h2 class="my-2 fs-5">{{ titolo }}</h2>
      <span class="my-1">{{ archetipo }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.testo {
  background-color: hsl(33deg 64% 53%);
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  h2 {
    color: white;
  }
  span {
    font-weight: bold;
  }
}
</style>
