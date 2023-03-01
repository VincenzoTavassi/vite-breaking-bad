<script>
export default {};
</script>

<template>
  <div class="overlay">
    <h2 class="mb-5">Loading...</h2>
    <slot></slot>
  </div>
</template>

<style>
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(100, 100, 100, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
