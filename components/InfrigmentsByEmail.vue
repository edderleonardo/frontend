<script setup>
import { useInfringementsStore } from '~/stores/infrigments';
import { storeToRefs } from 'pinia';

const store = useInfringementsStore();
const { infringementsByPerson, loading } = storeToRefs(store);

const email = ref('')

const search = () => {
    const data = {
        email: email.value
    }
    store.fetchInfringementsByPersonEmail(data)
}

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-MX', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

const props = defineProps({
    defaultTitle: {
        type: String,
        default: 'Infracciones por email'
    },
    defaultParagraph: {
        type: String,
        default: 'Busca infracciones por email de personas registradas'
    }
});

</script>
<template>
    <div class="divider">
        <!-- Slot -->
        <slot name="header">
            <h1 class="text-2xl font-semibold mb-4">{{ defaultTitle }}</h1>
            <p class="text-gray-500">{{ defaultParagraph }}</p>
        </slot>
        <div class="mt-3">
            <input class="w-2/6  border-gray-300 rounded-md shadow-sm" type="text" v-model="email" placeholder="Email">
            <button
                class="ml-2 rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 pointer"
                @click="search">Buscar</button>
        </div>
        <div class="mt-5">
            <table class="table-fixed w-full mt-4 border-collapse border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="w-1/12 px-4 py-2 border border-gray-200">ID</th>
                        <th class="w-3/12 px-4 py-2 border border-gray-200">Placas</th>
                        <th class="w-5/12 px-4 py-2 border border-gray-200">Comentarios</th>
                        <th class="w-6/12 px-4 py-2 border border-gray-200">Fecha</th>
                        <th class="w-6/12 px-4 py-2 border border-gray-200">Official</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="infringementsByPerson.length === 0">
                        <td colspan="5" class="text-center py-4">No hay infraccines disponibles.</td>
                    </tr>
                    <tr class="hover:bg-gray-50" v-for="infrigment in infringementsByPerson" :key="infrigment.id">
                        <td class="px-4 py-2 border border-gray-200">{{ infrigment.id }}</td>
                        <td class="px-4 py-2 border border-gray-200">{{ infrigment.car.patent_plate }}</td>
                        <td class="px-4 py-2 border border-gray-200">{{ infrigment.comments }}</td>
                        <td class="px-4 py-2 border border-gray-200">{{ formatDate(infrigment.datetime) }}</td>
                        <td class="px-4 py-2 border border-gray-200">{{ infrigment.officer.fullname }} </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.divider
    margin-top: 50px

input[type="text"]
  height: 40px
  padding-left: 10px

.pointer
  cursor: pointer
</style>