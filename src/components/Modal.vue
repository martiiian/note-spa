<template>
  <div class="modal-wrapper">
    <div class="modal">
      <button class="modal__close-btn" @click="$emit('close')">
        <img :src="require('~/src/assets/images/close.svg')" alt="close" />
      </button>

      <slot />
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

defineEmits(['close'])
</script>

<style lang="scss">
.modal-wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: rgba(113, 113, 113, 0.76);
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  margin: 0 auto;
  border-radius: 10px;
  background: white;
  position: relative;
  padding: 30px;

  &__close-btn {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    border: none;
    background: none;
    img {
      height: 16px;
      width: 16px;
    }
  }
}
</style>
