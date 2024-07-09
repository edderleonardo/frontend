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
    try {
      token = window.localStorage.getItem("token");
    } catch (error) {
      token = "";
      console.error("stores/auth.js ~ Error en el login:", error);
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
        this.token = response.data.access;
        this.authenticated = true;
        try {
          localStorage.setItem("token", response.data.access);
        } catch (error) {
          console.error("stores/auth.js ~ Error en el login:", error);
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
        let token = null;
        try {
          localStorage.removeItem("token");
        } catch (error) {
          console.error("stores/auth.js ~ Error en el logout:", error);
        }
      }
    },

    setToken(token) {
      this.token = token;
      this.authenticated = true;
      try {
        localStorage.setItem("token", token);
      } catch (error) {
        console.error("stores/auth.js ~ Error en el setToken:", error);
      }
    },
  },
});
