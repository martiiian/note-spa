<template>
  <NoteForm
    :title="title"
    :description="description"
    button-name="Обновить"
    @submit="update"
  />
</template>

<script>
import NoteForm from './NoteForm'
import { convertFormDataToObject } from '../helpers/common'

export default {
  components: { NoteForm },

  props: {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    }
  },

  setup() {
    function update(e) {
      const formData = new FormData(e.target);
      this.$emit('update', convertFormDataToObject(formData))
    }

    return {
      update
    }
  }
}
</script>
