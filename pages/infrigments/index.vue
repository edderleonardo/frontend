<script setup>
definePageMeta({
    layout: 'noUser',
});

</script>

<template>
    <div class="container mx-auto">
        <InfrigmentsByEmail>
            <template #header>
                <h1 class="text-2xl font-semibold mb-4">Infracciones por email</h1>
                <p class="text-gray-500">Introduce tu email y descubre si tienes infracciones</p>
            </template>
        </InfrigmentsByEmail>
    </div>
</template>