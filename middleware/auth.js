import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const authStore = useAuthStore();
    
    let token = null
    if (import.meta.client) {
      try {
        token = window.localStorage.getItem("token") || "";
      } catch (error) {
        token = "";
      }
    }
    if (token) {
      authStore.setToken(token);
    }

    if (!authStore.authenticated) {
      return navigateTo("/login");
    }
  }
});
