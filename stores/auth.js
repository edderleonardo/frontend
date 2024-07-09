import axios from "axios";
import { defineStore } from "pinia";

const client = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("🚀 ~ defineNuxtRouteMiddleware ~ window: 3", window)

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: import.meta.client ? window?.localStorage : localStorage.getItem("token") || "", 
    authenticated: import.meta.client && window?.localStorage ? !!localStorage.getItem("token") : false,
  }),

  actions: {
    async login(email, password) {
      try {
        const response = await client.post("login/", {
          email,
          password,
        });
        this.token = response.data.access;
        this.authenticated = true;
        if (import.meta.client) {
          window?.localStorage ? localStorage.setItem("token", response.data.access) : "";
        }
      } catch (error) {
        console.log("Error en el login:", error);
        throw error;
      }
    },

    logout() {
      this.token = "";
      this.authenticated = false;
      if (import.meta.client) {
        localStorage.removeItem("token");
      }
    },

    setToken(token) {
      this.token = token;
      this.authenticated = true;
      if (import.meta.client) {
        window?.localStorage ? localStorage.setItem("token", token) : "";
      }
    }

  },
});