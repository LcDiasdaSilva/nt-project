<style lang="scss">
  .site-content {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
  }
</style>
<template>
  <main>
    <header>
      <TopBar />
    </header>
    <section class="site-content">
      <RouterView />
    </section>
  </main>
</template>
<script setup lang="ts">
  import TopBar from "../components/topBar/TopBar.vue";
</script>
