<style lang="scss">
  .overlay-loader {
    background: rgba($color: #000, $alpha: 0.7);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999999999;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
<template>
  <Transition name="fade">
    <div class="overlay-loader">
      <img src="/images/loading.svg"/>
    </div>
  </Transition>
</template>
<script setup>
</script>
