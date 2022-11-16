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

<script lang="ts" setup>
import { ref } from 'vue'
import Modal from './UIModal.vue'

const text = ref('')
const yesBtn = ref<HTMLButtonElement | null>(null)
const noBtn = ref<HTMLButtonElement | null>(null)

function confirm(srcText: string): Promise<boolean> {
  text.value = srcText

  return new Promise((resolve) => {
    function resetText() {
      text.value = ''
    }

    function unsubscribe() {
      yesBtn.value && yesBtn.value.removeEventListener('click', yesBtnCallback)
      noBtn.value && noBtn.value.removeEventListener('click', yesBtnCallback)
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

    yesBtn.value && yesBtn.value.addEventListener('click', yesBtnCallback)
    noBtn.value && noBtn.value.addEventListener('click', noBtnCallback)
  })
}

defineExpose({
  confirm
})
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
