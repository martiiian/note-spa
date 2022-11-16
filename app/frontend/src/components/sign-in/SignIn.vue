<template>
  <div class="sign-in">
    <form class="sign-in__form" @submit.prevent="submit">
      <div class="sign-in__form-group">
        <label class="sign-in__label" for="sign_in_name">
          Введи своё имя: <br />
        </label>
        <input type="text" id="sign_in_name" name="name" class="sign-in__form-input"/>
      </div>

      <button class="sign-in__send-btn">
        Отправить
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
function submit(e: Event) {
  const data = new FormData(e.target as HTMLFormElement)
}
</script>

<style lang="scss" scoped>
.sign-in {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  &__form {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    max-height: 500px;
  }
  &__send-btn {
    margin-top: 10px;
    padding: 15px;
    color: white;
    background: #6262ff;
    border: 0;
    border-radius: 5px;
  }
  &__label {
    font-size: 50px;
    color: rgba(0,0,0,0.2);
    font-family: Arial,serif;
  }
  &__form-input {
    font-size: 20px;
    border: 2px solid #313131;
  }
  &__form-group {
    display: flex;
    flex-direction: column;
  }
}
</style>
