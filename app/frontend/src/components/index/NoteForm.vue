<template>
  <form
    class="min-w-[250px]"
    @submit.prevent="submit"
  >
    <UINoteInput
      id="note-create-form_title"
      v-model="titleLocal"
      label="Заголовок:"
      name="title"
    />

    <UINoteInput
      id="note-create-form_description"
      v-model="descriptionLocal"
      label="Описание:"
      name="description"
      input-type="textarea"
    />

    <div
      v-show="error"
      class="flex flex-col pt-3"
    >
      <div class="text-red">
        Заполните все поля!
      </div>
    </div>

    <div class="flex flex-col pt-3">
      <button class="btn pt-3">
        {{ buttonName }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { convertFormDataToObject } from '@/helpers/common'
import { ref } from 'vue'
import UINoteInput from '@/components/index/NoteInput.vue'

interface Props {
  description?: string
  title?: string
  buttonName?: string
}

interface Emits {
  (e: 'submit', formData: Event): void
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  title: '',
  buttonName: 'Создать'
})

const emit = defineEmits<Emits>()

let error = ref(false)
let descriptionLocal = ref(props.description)
let titleLocal = ref(props.title)

function validate(e: Event) {
  if (!e.target) return

  error.value = false
  const formData = convertFormDataToObject(new FormData(e.target as HTMLFormElement))

  return !Object.values(formData).some((i) => i === '')
}

function submit(e: Event) {
  if (validate(e)) {
    emit('submit', e)
  } else {
    error.value = true
  }
}
</script>
