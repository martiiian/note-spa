<template>
  <div class="flex justify-center items-center h-full">
    <form
      class="flex flex-col max-w-lg max-h-lg"
      @submit.prevent="submit"
    >
      <UILoginInput
        id="sign_in_email"
        title="Введи емэйл:"
        name="email"
      />

      <UILoginInput
        id="sign_in_password"
        title="Введи пароль:"
        name="password"
        type="password"
      />

      <button class="mt-3.5 p-4 text-white bg-blue-700 border-0 rounded">
        Отправить
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import UILoginInput from '@/components/UILoginInput.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function submit(e: Event) {
  const body = new FormData(e.target as HTMLFormElement)

  fetch(`${import.meta.env.VITE_BACKEND_API}/signin`, {
    method: 'POST',
    body,
  })
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      if (res.result === 'success' && res.email) {
        localStorage.setItem('email', res.email)
        router.push('/')
      } else {
        throw new Error()
      }
    })
    .catch(() => {
      alert('Ахтунг, что-то неправильно, пробни еще разок')
    })
}
</script>
