<script setup>
import { useCarsStore } from '~/stores/cars';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useCarsStore();
const { cars, owner, loading } = storeToRefs(store);

const idPerson = route.params.id;
const patent_plate = ref('')
const brand = ref('')
const color = ref('')

const isModalOpen = ref(false);
const isEditMode = ref(false);
const currentCar = ref(null);

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
    patent_plate.value = ''
    brand.value = ''
    color.value = ''
    currentCar.value = null;
}

const handleSubmit = () => {
    if (isEditMode.value) {
        updateRequest()
    } else {
        createRequest()
    }

    closeModal()
    resetForm()
};

const createRequest = () => {
    console.log('creating car...');
    
    const data = { 
        patent_plate: patent_plate.value,
        brand: brand.value,
        color: color.value,
        owner: route.params.id
    };
    
    store.createCar(data);
};

const editRequest = (request) => {
    currentCar.value = request;
    patent_plate.value = request.patent_plate;
    brand.value = request.brand;
    color.value = request.color;
    isEditMode.value = true;
    isModalOpen.value = true;
};

const updateRequest = () => {
    const data = { 
        patent_plate: patent_plate.value,
        brand: brand.value,
        color: color.value,
        owner: route.params.id
    };
    
    store.updateCar(currentCar.value.id, data);
};

const deleteRequest = (id) => {
    store.deleteCar(id, idPerson);
};

const viewInfrigments = (id) => {
    console.log('viewing infrigments...', id);
};

onMounted(() => {
    console.log('Fetching cars...');
    store.fetchCarsbyPerson(idPerson);
});

</script>
<template>
    <div>
        <h1>Autos de: {{ owner.fullname }}</h1>
        <div class="flex justify-end mb-5">
            <button type="button" @click="openModal"
                class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Agregar auto
            </button>
        </div>
        <div class="mt-5">
            <table class="table-fixed w-full mt-4 border-collapse border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="w-1/12 px-4 py-2 border border-gray-200">ID</th>
                        <th class="w-5/12 px-4 py-2 border border-gray-200">Placa</th>
                        <th class="w-6/12 px-4 py-2 border border-gray-200">Marca</th>
                        <th class="w-6/12 px-4 py-2 border border-gray-200">Color</th>
                        <th class="w-6/12 px-4 py-2 border border-gray-200 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="cars.length === 0">
                    <td colspan="5" class="text-center py-4">No hay datos disponibles.</td>
                    </tr>
                    <tr class="hover:bg-gray-50" v-else  v-for="car in cars" :key="car.id">
                        <td class="px-4 py-2 border border-gray-200">{{ car.id }}</td>
                        <td class="px-4 py-2 border border-gray-200">{{ car.patent_plate }}</td>
                        <td class="px-4 py-2 border border-gray-200">{{ car.brand }}</td>
                        <td class="px-4 py-2 border border-gray-200">{{ car.color }}</td>
                        <td class="px-4 py-2 border border-gray-200 text-center">
                            <a href="#" @click.prevent="editRequest(car)"
                                class="text-indigo-600 hover:text-indigo-900">Editar</a>
                            |
                            <a href="#" @click.prevent="deleteRequest(car.id)"
                                class="text-red-600 hover:text-red-900">Eliminar</a>
                            |
                            <a href="#" @click.prevent="viewInfrigments(car.id)"
                                class="text-green-600 hover:text-green-900">Infracciones</a>
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
                                {{ isEditMode ? 'Editar Solicitud' : 'Agregar Solicitud' }}
                            </h3>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500">Aquí puedes {{ isEditMode ? 'editar' : 'agregar' }} los
                                    detalles del vehículo.</p>
                                <br>
                                <!-- Formulario para agregar solicitud -->
                                <form @submit.prevent="handleSubmit" class="mt-5">
                                    <div class="mt-4">
                                        <label for="name" class="block text-sm font-medium text-gray-700">Placa</label>
                                        <input type="text" id="name" v-model="patent_plate" required
                                            class="block w-full border-gray-300 rounded-md shadow-sm">
                                    </div>

                                    <div class="mt-4">
                                        <label for="age" class="block text-sm font-medium text-gray-700">Marca</label>
                                        <input type="text" id="age" v-model="brand" required
                                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                                    </div>

                                    <div class="mt-4">
                                        <label for="age" class="block text-sm font-medium text-gray-700">Color</label>
                                        <input type="text" id="age" v-model="color" required
                                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                                    </div>

                                    <div class="mt-5 sm:mt-6">
                                        <button type="submit"
                                            class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                                            {{ isEditMode ? 'Guardar Cambios' : 'Agregar' }}
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