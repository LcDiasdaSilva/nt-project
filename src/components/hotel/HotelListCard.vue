<style lang="scss">
  @import "../../assets//style/media-queries";
  .hotel-list-card {
    border: solid 1px #ccc;
    background: #fff;
    width: 100%;
    display: flex;
    border-radius: 1rem;
    overflow: hidden;
    @include mq-value("768px") {
      flex-direction: column;
    }
    &__wrapper-image {
      width: 100%;
      max-width: 300px;
      background: #eee;
      @include mq-value("768px") {
        max-width: 100%;
      }
    }
    &__wrapper-infos {
      width: 100%;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &__title {
      font-size: 1.5rem;
      line-height: 1.4rem;
      font-weight: 700;
      color: #343434;
    }
    &__address {
      font-size: 1rem;
      font-weight: 400;
      color: #343434;
    }
    &__description {
      font-size: 1;
      font-weight: 300;
      color: #343434;
      margin-top: 1rem;
    }
    &__content {
      display: flex;
      justify-content: space-between;
    }

    &__content-right {
      text-align: right;
    }
    &__value {
      font-size: 1.5rem;
      font-weight: 600;
    }
    &__totalValue {
      font-size: 1rem;
      font-weight: 300;
    }
    &__reviews {
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background: #000;
      padding: 1rem;
      border-radius: 5px;
    }
    &__reviews-description {
      font-size: 0.8rem;
      color: #929292;
    }
  }
</style>
<template>
  <div class="hotel-list-card">
    <div class="hotel-list-card__wrapper-image">
      <ProgressiveImage
        object-cover
        src="https://picsum.photos/id/1080/1980/1080"
      />
    </div>
    <div class="hotel-list-card__wrapper-infos">
      <div class="hotel-list-card__header">
        <div class="hotel-list-card__title">
          {{ props.name }}
        </div>
        <div class="hotel-list-card__address">
          {{ props.address }}
        </div>
        <div class="hotel-list-card__description">
          {{ props.description }}
        </div>
        <slot name="checkCompare"></slot>
      </div>

      <div class="hotel-list-card__content mt-3">
        <div class="hotel-list-card__content-left">
          <div>Quartos: {{ props.bedrooms }}</div>
          <div class="text-emerald-600">
            Para até {{ props.travelers }} pessoas
          </div>
          <div class="hotel-list-card__reviews mt-3">
            {{ props.reviewNote }}
          </div>
          <div class="hotel-list-card__reviews-description">
            {{ props.reviewNumbers }} avaliações.
          </div>
        </div>
        <div class="hotel-list-card__content-right">
          <div class="hotel-list-card__value">
            {{ props.value }}
          </div>
          <div class="hotel-list-card__totalValue">
            <div>Total: {{ props.totalValue }}</div>
            <div>{{ daily }} diária (s)</div>
          </div>
          <button type="button" class="customPrimaryButton mt-2">
            Reservar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ProgressiveImage } from "vue-progressive-image";
  import { defineProps } from "vue";

  const props = defineProps<{
    id?: number;
    name: string;
    address: string;
    description: string;
    value: string;
    reviewNote: number;
    reviewNumbers: number;
    travelers: number;
    bedrooms: number;
    totalValue: string;
    daily: number;
  }>();
</script>
