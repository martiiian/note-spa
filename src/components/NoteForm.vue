<template>
  <form class="note-form" @submit.prevent="submit">
    <div class="note-form__group">
      <label for="note-create-form_title">
        Заголовок:
      </label>

      <input
        id="note-create-form_title"
        class="note-form__input"
        type="text"
        name="title"
        :value="title"
      />
    </div>

    <div class="note-form__group">
      <label for="note-create-form_description">
        Описание:
      </label>

      <textarea
        id="note-create-form_description"
        class="note-form__input"
        name="description"
        :value="description"
      />
    </div>


    <div v-show="error" class="note-form__group">
      <div class="note-form__error">
        Заполните все поля!
      </div>
    </div>

    <div class="note-form__group">
      <button class="note-form__button btn">
        {{ buttonName }}
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'
import {convertFormDataToObject} from '../helpers/common'

export default {
  props: {
    description: {
      type: String,
      default: ''
    },

    title: {
      type: String,
      default: ''
    },

    buttonName: {
      type: String,
      default: 'Создать'
    }
  },

  emits: ['submit'],

  setup(props, { emit }) {
    let error = ref(false)

    function validate(e) {
      error.value = false
      const formData = convertFormDataToObject(new FormData(e.target));

      return !Object.values(formData).some((i) => i === '')
    }

    function submit(e) {
      if (validate(e)) {
        emit('submit', e)
      } else {
        error.value = true
      }
    }

    return {
      submit,
      error,
    }
  }
}
</script>

<style lang="scss">
.note-form {
  min-width: 250px;
  &__group {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
  }
  &__button {
    padding: 10px;
  }
  &__input {
    padding: 8px;
  }
}
</style>
