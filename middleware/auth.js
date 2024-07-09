import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const authStore = useAuthStore();
    console.log('middleware/auth.js ~ window', window)
    
    let token = null
    if (import.meta.client) {
      try {
        token = window.localStorage.getItem("token") || "";
      } catch (error) {
        console.error("middleware/auth.js ~ Error en el login:", error);
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
