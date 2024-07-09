import { defineStore } from "pinia";

import {
  getInfringementsByCar,
  postInfringementRequest,
} from "@/services/api_requests";

export const useInfringementsStore = defineStore("infringements", {
  state: () => ({
    infringements: [],
    car: {},
    officer: {},
    loading: false,
  }),

  actions: {
    async fetchInfringementsByCar(car_id) {
      this.loading = true;
      try {
        const response = await getInfringementsByCar(car_id);
        this.infringements = response.infringements;
        this.car = response.car;
        this.officer = response.infringements[0].officer;
      } catch (error) {
        console.log("Error en fetchInfringementsByCar:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createInfringement(data, car_id) {
      this.loading = true;
      try {
        await postInfringementRequest(data);
        await this.fetchInfringementsByCar(car_id);
        console.log("Agregado");
      } catch (error) {
        console.log("Error en createInfringement:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
