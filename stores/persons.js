import { defineStore } from "pinia";

import {
  getPersonRequest,
  postPersonRequest,
  updatePersonRequest,
  deletePersonRequest,
} from "@/services/api";

export const usePersonStore = defineStore("person", {
  state: () => ({
    persons: [],
    loading: false,
  }),

  actions: {
    async fetchPersons() {
      this.loading = true;
      try {
        const response = await getPersonRequest();
        const sorted = response.sort((a, b) => a.id - b.id);
        this.persons = sorted;
      } catch (error) {
        console.log("Error en getPersons:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createPerson(data) {
      this.loading = true;
      try {
        await postPersonRequest(data);
        await this.fetchPersons();
      } catch (error) {
        console.log("Error en createPerson:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updatePerson(id, data) {
      this.loading = true;
      try {
        await updatePersonRequest(id, data);
        await this.fetchPersons();
      } catch (error) {
        console.log("Error en updatePerson:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deletePerson(id) {
      this.loading = true;
      try {
        await deletePersonRequest(id);
        await this.fetchPersons();
      } catch (error) {
        console.log("Error en deletePerson:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
