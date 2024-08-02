<style lang="scss">
  .top-bar {
    border-bottom: solid 1px #ccc;
    &__content {
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__brand {
      img {
        width: 40px;
      }
    }
    &__menu {
      ul {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        cursor: pointer;
      }
    }
  }
</style>
<template>
  <nav class="top-bar">
    <div class="top-bar__content">
      <div class="top-bar__brand">
        <img src="/images/logo.svg" />
        <span>OTEIS</span>
      </div>
      <div class="top-bar__menu">
        <ul>
          <li v-for="item in state.menu" :key="item.description">
            {{ item.description }}
          </li>
        </ul>
      </div>
      <div class="top-bar__alerts">
        Comparar hotéis
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
  import { reactive } from "vue";

  const state = reactive({
    menu: [{ description: "Inicio" }, { description: "Minhas reservas" }],
  });
</script>
