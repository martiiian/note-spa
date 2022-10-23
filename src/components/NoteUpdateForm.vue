<template>
  <form class="note-create-form" @submit="update">
    <label>
      <p>Заголовок:</p>
      <input type="text" name="title" :value="title">
    </label>

    <label>
      <p>Описание:</p>
      <input type="text" name="description" :value="description">
    </label>

    <div>
      <button>Обновить</button>
    </div>
  </form>
</template>

<script>
import { convertFormDataToObject } from '../helpers/common'

export default {
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
      e.preventDefault();
      const formData = new FormData(e.target);
      this.$emit('update', convertFormDataToObject(formData))
    }

    return {
      update
    }
  }
}
</script>

<style>
.note-create-form {

}
</style>
