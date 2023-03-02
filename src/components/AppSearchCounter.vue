<script>
export default {
  props: {
    totalCounter: Number,
    currentCounter: Number,
  },
};
</script>
<template>
  <h2>
    Stai visualizzando {{ currentCounter }} di {{ totalCounter }} risultati.
  </h2>
</template>
<style></style>
