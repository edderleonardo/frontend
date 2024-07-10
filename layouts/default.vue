<script setup>
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia';

const authStore = useAuthStore()
const { authenticated } = storeToRefs(authStore)

useHead({
  title: "Tickets",
  meta: [
    {
      name: "description",
      content: "My awesome Nuxt.js project",
    },
  ],
});

</script>
<template>
  <div>
    <main class="container mx-auto py-8 px-4 lg:px-8 xl:px-16 pb-28">
      <Navbar v-if="authenticated" />
      <slot name="breadcrumbs" />
      <slot />
    </main>

    <footer class="bg-gray-800 text-white py-4 fixed bottom-0 w-full">
      <div class="container mx-auto flex justify-between items-center px-4">
        <div class="flex space-x-4">
          <p class="text-sm">&copy; 2024</p>
        </div>
      </div>
    </footer>
  </div>
</template>
