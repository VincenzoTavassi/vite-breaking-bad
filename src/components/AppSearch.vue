<script>
import { options } from "../data/selectOptions";
export default {
  emits: ["change-option"],
  data() {
    return {
      options,
    };
  },
};
</script>

<template>
  <select class="my-5" @change="$emit('change-option', $event)">
    <option>All</option>
    <option v-for="option in options" :key="option">
      {{ option }}
    </option>
  </select>
</template>

<style></style>
