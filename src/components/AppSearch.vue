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
  <!--- $emit con $event triggerato dal @change della select-->
  <select class="my-5" @change="$emit('change-option', $event)">
    <option>All</option>
    <option v-for="option in options" :key="option">
      {{ option }}
    </option>
  </select>
</template>

<style></style>
