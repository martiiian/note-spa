<template>
  <Modal
    v-show="text"
    @close="text = ''"
  >
    <div>
      <p>
        {{ text }}
      </p>

      <div class="flex justify-between pt-5">
        <button
          ref="noBtn"
          class="btn btn_secondary"
        >
          Нет
        </button>
        <button
          ref="yesBtn"
          class="btn py-3 px-4"
        >
          Да
        </button>
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
