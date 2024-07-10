<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const logout = async () => {
    try {
        await authStore.logout()
        return navigateTo('/login')
    } catch (error) {
        console.error('Error en el logout:', error)
    }
}

</script>

<template>
    <nav class="bg-white">
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-between py-4">
                <div>
                    <router-link to="/" class="text-gray-800 text-xl font-semibold">Inicio</router-link>
                </div>
                <div class="flex items-center space-x-4">
                    <a @click='logout' class="text-red-500 cursor-pointer font-semibold">Cerrar sesión</a>
                </div>
            </div>
        </div>
    </nav>
</template>