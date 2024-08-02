<style lang="scss">
  .table-compare {
    padding: 1rem;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .table {
      border: solid 1px #ccc;
      tr,
      td {
        border: solid 1px #ccc;
        padding: 1rem;
      }
    }
    &__title {
      font-size: 1.3rem;
      font-weight: 600;
    }
    &__description {
      font-size: 0.9rem;
      font-weight: 300;
    }
  }
</style>
<template>
  <div class="table-compare">
    <table class="table-auto table">
      <thead>
        <tr></tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="item in props.hotels" :key="item.id">
            <div>
              <ProgressiveImage
                object-cover
                :src="`/images/${item['image']}.png`"
              />
            </div>
          </td>
        </tr>
        <tr>
          <td v-for="item in props.hotels" :key="item.id">
            <div class="table-compare__title">
              {{ item["name"] }}
            </div>
          </td>
        </tr>
        <tr>
          <td v-for="item in props.hotels" :key="item.id">
            <div class="table-compare__description">
              <div>
                {{ item["description"] }}
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td v-for="item in props.hotels" :key="item.id">
            <div>
              {{ item["address"]["street"] }}
            </div>
            <div>
              {{ item["address"]["city"] }}
            </div>
          </td>
        </tr>
        <tr>
          <td v-for="item in props.hotels" :key="item.id">
            <div class="table-compare__price">
              Diária:
              {{ formatCurrency(item["price"]) }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
  import type { HotelInterface } from "../../types/interfaces";
  import { defineProps } from "vue";
  import { ProgressiveImage } from "vue-progressive-image";
  import { formatCurrency } from "../../utils/function";
  const props = defineProps<{
    hotels: HotelInterface[];
  }>();
</script>
