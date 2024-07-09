import { defineStore } from "pinia";

import {
  getCarRequest,
  postCarRequest,
  updateCarRequest,
  deleteCarRequest,
  getInfringementRequest,
} from "@/services/api_requests";

export const useCarsStore = defineStore("car", {
  state: () => ({
    cars: [],
    owner: {},
    fullname: "",
    loading: false,
  }),

  actions: {
    async fetchCarsbyPerson(person_id) {
      console.log("person_id:", person_id);

      this.loading = true;
      try {
        const response = await getCarRequest(person_id);
        console.log("🚀 ~ fetchCars ~ response", response);
        this.cars = response.cars;
        this.owner = response.owner;
      } catch (error) {
        console.log("Error en getPersons:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createCar(data) {
      console.log("data", data);

      this.loading = true;
      try {
        await postCarRequest(data);
        await this.fetchCarsbyPerson(data.owner);
      } catch (error) {
        console.log("Error en createPerson:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateCar(id, data) {
      this.loading = true;
      try {
        await updateCarRequest(id, data);
        await this.fetchCarsbyPerson(data.owner);
      } catch (error) {
        console.log("Error en updatePerson:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteCar(id, idPerson) {
      this.loading = true;
      try {
        await deleteCarRequest(id);
        await this.fetchCarsbyPerson(idPerson);
      } catch (error) {
        console.log("Error en deletePerson:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchInfringements() {
      this.loading = true;
      try {
        const response = await getInfringementRequest();
        console.log("🚀 ~ fetchInfringements ~ response", response);
        this.infringements = response;
      } catch (error) {
        console.log("Error en getInfringements:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

  },
});
