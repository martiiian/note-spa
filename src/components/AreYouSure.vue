<template>
  <Modal v-show="text" @close="text = ''">
    <div class="are-u-sure">
      <p>
        {{ text }}
      </p>

      <div class="are-u-sure__buttons">
        <button class="btn btn_secondary are-u-sure__button" ref="noBtn">Нет</button>
        <button class="btn are-u-sure__button" ref="yesBtn">Да</button>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import Modal from './Modal'

const text = ref('')
const yesBtn = ref(null)
const noBtn = ref(null)

function confirm(srcText) {
  text.value = srcText

  return new Promise((resolve) => {
    function resetText() {
      text.value = ''
    }

    function unsubscribe() {
      yesBtn.value.removeEventListener('click', yesBtnCallback)
      noBtn.value.removeEventListener('click', yesBtnCallback)
    }

    function yesBtnCallback() {
      unsubscribe()
      resetText()
      resolve(true)
    }

    function noBtnCallback() {
      unsubscribe()
      resetText()
      resolve(false)
    }

    yesBtn.value.addEventListener('click', yesBtnCallback)
    noBtn.value.addEventListener('click', noBtnCallback)
  })
}
</script>

<style lang="scss">
.are-u-sure {
  &__buttons {
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  &__button {
    padding: 10px 15px;
  }
}
</style>
