<script>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const authStore = useAuthStore()

    const login = async () => {
      try {
        await authStore.login(email.value, password.value)
        return  navigateTo('/')
      } catch (error) {
        console.error('Error en el login:', error)
      }
    }

    return { email, password, login }
  },
}
</script>

<template>
  <div>
    <div class="flex items-center justify-center px-6 pt-8">
      <!-- Card -->
      <div class="w-full max-w-xl p-6 space-y-8 sm:p-8">
        <h2 class="text-2xl font-bold">Iniciar sesión</h2>
        <form @submit.prevent="login" class="mt-8 space-y-6">
          <div>
            <label for="email" class="block mb-2 text-sm font-medium">Email</label>
            <input type="email" name="email" id="email" v-model="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="name@company.com" required />
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium">Password</label>
            <input type="password" name="password" id="password" v-model="password" placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required />
          </div>

          <button type="submit"
            class="bg-gray w-full px-5 py-3 text-base font-medium text-center rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300">
            Enviar
          </button>
          <!-- <div class="text-sm font-medium text-gray-500">
            <a class="text-primary-700 hover:underline dark:text-primary-500 cursor-pointer">Crear una cuenta</a>
          </div> -->
        </form>
      </div>
    </div>
  </div>
</template>
