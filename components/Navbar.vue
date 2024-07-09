<template>
    <nav class="bg-white">
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-between py-4">
                <div>
                    <router-link to="/" class="text-gray-800 text-xl font-semibold">Inicio</router-link>
                </div>
                <div class="flex items-center space-x-4">
                    <router-link to="/dashboard" class="text-gray-800 hover:text-gray-600">Dashboard</router-link>
                    <router-link to="/personas" class="text-gray-800 hover:text-gray-600">Personas</router-link>
                    <router-link to="/vehiculos" class="text-gray-800 hover:text-gray-600">Vehículos</router-link>
                    <router-link to="/infracciones" class="text-gray-800 hover:text-gray-600">Infracciones</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>