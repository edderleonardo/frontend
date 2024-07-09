<script setup>
definePageMeta({
  middleware: 'auth',
})

import { useInfringementsStore } from '~/stores/infrigments';
import { storeToRefs } from 'pinia';

const route = useRoute();
const carId = route.params.id
const store = useInfringementsStore();
const { infringements, car, officer, loading } = storeToRefs(store);

const comments = ref('')
const datetime = ref('')

const isModalOpen = ref(false);
const isEditMode = ref(false);
const currentInfraction = ref(null);


const openModal = () => {
  isModalOpen.value = true;
  isEditMode.value = false;
  resetForm();
};

const closeModal = () => {
  isModalOpen.value = false;
  resetForm()
}

const resetForm = () => {
  comments.value = ''
  datetime.value = ''
  currentInfraction.value = null;
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

const handleSubmit = () => {
  createRequest()
  closeModal()
  resetForm()
};

const createRequest = () => {
  const data = {
    patent_plate: store.car.patent_plate,
    comments: comments.value,
    datetime: datetime.value,
    officer: store.officer
  }

  store.createInfringement(data, carId)
}

onMounted(() => {
  store.fetchInfringementsByCar(carId)
})

</script>

<template>
  <div>
    <h1>Infracciones del carro {{ car.patent_plate }}</h1>

    <div class="flex justify-end mb-5">
      <button type="button" @click="openModal"
        class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Agregar infracción
      </button>
    </div>

    <div class="mt-5">
      <table class="table-fixed w-full mt-4 border-collapse border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr class="bg-gray-100">
            <th class="w-1/12 px-4 py-2 border border-gray-200">ID</th>
            <th class="w-5/12 px-4 py-2 border border-gray-200">Comentarios</th>
            <th class="w-6/12 px-4 py-2 border border-gray-200">Fecha</th>
            <th class="w-6/12 px-4 py-2 border border-gray-200">Official</th>
            <th class="w-6/12 px-4 py-2 border border-gray-200">Placa</th>
            <th class="w-6/12 px-4 py-2 border border-gray-200 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="infringements.length === 0">
            <td colspan="5" class="text-center py-4">No hay datos disponibles.</td>
          </tr>
          <tr class="hover:bg-gray-50" v-else v-for="infrigment in infringements" :key="infrigment.id">
            <td class="px-4 py-2 border border-gray-200">{{ infrigment.id }}</td>
            <td class="px-4 py-2 border border-gray-200">{{ infrigment.comments }}</td>
            <td class="px-4 py-2 border border-gray-200">{{ formatDate(infrigment.datetime) }}</td>
            <td class="px-4 py-2 border border-gray-200">{{ infrigment.officer.fullname }} </td>
            <td class="px-4 py-2 border border-gray-200">{{ infrigment.officer.badge_number }}</td>
            <td class="px-4 py-2 border border-gray-200 text-center">
              <a href="#" @click.prevent="deleteRequest(car.id)" class="text-red-600 hover:text-red-900">Eliminar</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="isModalOpen" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
      aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div
          class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div class="">
            <div class="mt-3 text-center sm:mt-0 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Agregar Infracción
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">Aquí puedes agregar una nueva infracción</p>
                <br>
                <!-- Formulario para agregar solicitud -->
                <form @submit.prevent="handleSubmit" class="mt-5">
                  <div class="mt-4">
                    <label for="name" class="block text-sm font-medium text-gray-700">Comentario</label>
                    <input type="text" id="name" v-model="comments" required
                      class="block w-full border-gray-300 rounded-md shadow-sm">
                  </div>

                  <div class="mt-4">
                    <label for="age" class="block text-sm font-medium text-gray-700">Fecha</label>
                    <input type="text" id="age" v-model="datetime" required
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                  </div>

                  <div class="mt-5 sm:mt-6">
                    <button type="submit"
                      class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                      Agregar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
            <button type="button"
              class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              @click="closeModal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="sass" scoped>
input[type="text"],
select
  height: 40px
  padding-left: 10px

.pointer
  cursor: pointer
</style>