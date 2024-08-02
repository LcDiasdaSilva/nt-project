<style lang="scss" scoped>
.modal-custom {
  top: 0px;
  left: 0px;
  background: rgba($color: #000000, $alpha: 0.5);
  position: fixed;
  width: 100%;
  height: 100vh;
  padding: 0 1rem;
  z-index: 999999999;

  &__container {
    max-width: 100%;
    min-height: 50px;
    background: #fff;
    max-height: 80vh;
    margin: auto;
    margin-top: calc(60px + 1%);
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0;
    z-index: 99999999998;
    overflow: hidden;
    border-radius: .5rem;
  }

  &__container-icon-close {
    position: absolute;
    top: 10px;
    right: 20px;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.8);
    }
  }

  &__container-body {
    flex: 1;
    overflow: auto;

    padding: 0 !important;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.8s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.9);
    opacity: 0.9;
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>

<style>
body {
  box-sizing: border-box;
  padding: 0;
  margin: 0px;
}
</style>
<template>
  <Transition>
    <div v-show="show" @click.self="close('overlay')" class="modal-custom">
      <Transition name="bounce">
        <div v-if="show" :style="styleProps" class="modal-custom__container">
          <div
            v-if="iconClose"
            @click="close('icon')"
            class="modal-custom__container-icon-close"
          >
            &#10006;
          </div>
          <div class="modal-custom__container-header">
            <slot name="header"></slot>
          </div>
          <div class="modal-custom__container-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-custom__container-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed , defineProps , defineEmits } from "vue";
const props = defineProps<{
  show: boolean;
  iconClose?: boolean;
  customMaxWidth?: string;
  maxHeight?: string;
  outClickHide?: boolean;
}>();

const styleProps = computed(() => {
  return {
    "max-width": props.customMaxWidth,
    "max-height": props.maxHeight,
  };
});

const emit = defineEmits(["close"]);
const close = (type: string) => {
  if(type === 'icon') return emit("close");
  if(type === 'overlay' && props.outClickHide) return ;
  emit("close")
};
</script>
