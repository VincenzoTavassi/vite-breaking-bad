<script>
export default {
  emits: ["change-page"],
};
</script>

<template>
  <button
    type="button"
    class="btn btn-secondary mx-2"
    @click="$emit('change-page')"
  >
    <slot></slot>
  </button>
</template>

<style></style>
