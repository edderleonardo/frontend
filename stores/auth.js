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
    let refreshToken = null;
    if (import.meta.client) {
      try {
        token = window.localStorage.getItem("token");
        refreshToken = window.localStorage.getItem("refreshToken");
      } catch (error) {
        console.error("stores/auth.js ~ Error al obtener tokens:", error);
      }
    }
    return {
      token,
      refreshToken,
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
        this.setTokens(response.data.access, response.data.refresh);
      } catch (error) {
        console.log("Error en el login:", error);
        throw error;
      }
    },
    logout() {
      this.setTokens("", "");
    },
    setTokens(token, refreshToken) {
      this.token = token;
      this.refreshToken = refreshToken;
      this.authenticated = !!token;
      if (import.meta.client) {
        try {
          if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
          }
        } catch (error) {
          console.error("stores/auth.js ~ Error en el setTokens:", error);
        }
      }
      this.updateAxiosClient();
    },
    updateAxiosClient() {
      client.defaults.headers.common['Authorization'] = this.token ? `Bearer ${this.token}` : '';
    },
    async refreshAccessToken() {
      console.log("Refrescando token...");
      try {
        const response = await client.post("token/refresh/", {
          refresh: this.refreshToken,
        });
        this.setTokens(response.data.access, this.refreshToken);
        return response.data.access;
      } catch (error) {
        console.error("Error al refrescar el token:", error);
        this.logout();
        throw error;
      }
    },
  },
});