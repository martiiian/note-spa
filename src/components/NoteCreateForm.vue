<template>
  <form class="note-create-form">
    <label>
      <p>Описание:</p>
      <input type="text" name="title" />
    </label>

    <label>
      <p>Заголовок:</p>
      <input type="text" name="description" />
    </label>

    <div>
      <button>Создать</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    parent: {
      type: Object,
      default: null
    }
  }
}
</script>

<style>
.note-create-form {

}
</style>
