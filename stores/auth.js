import axios from "axios";
import { defineStore } from "pinia";

const client = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const useAuthStore = defineStore("auth", {
  state: () => {
    let token = null;
    if (import.meta.client) {
      try {
        token = window.localStorage.getItem("token");
      } catch (error) {
        token = "";
        console.error("stores/auth.js ~ Error en el login:", error);
      }
    }
    return {
      token,
      authenticated: !!token,
    };
  },
  actions: {
    async login(email, password) {
      try {
        const response = await client.post("login/", {
          email,
          password,
        });
        this.setToken(response.data.access);
      } catch (error) {
        console.log("Error en el login:", error);
        throw error;
      }
    },
    logout() {
      this.setToken("");
    },
    setToken(token) {
      this.token = token;
      this.authenticated = !!token;
      if (import.meta.client) {
        try {
          if (token) {
            localStorage.setItem("token", token);
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("stores/auth.js ~ Error en el setToken:", error);
        }
      }
      // Actualizar el cliente axios con el nuevo token
      this.updateAxiosClient();
    },
    updateAxiosClient() {
      client.defaults.headers.common['Authorization'] = this.token ? `Bearer ${this.token}` : '';
    },
  },
});