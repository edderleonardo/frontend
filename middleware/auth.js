import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  console.log("🚀 ~ defineNuxtRouteMiddleware ~ window:", window)
  
  if (import.meta.client) {
    console.log("🚀 ~ defineNuxtRouteMiddleware ~ window 2:", window)
    const authStore = useAuthStore();
    console.log('window?.localStorage ?', window?.localStorage ? localStorage.getItem("token") : "");
    
    const token = window?.localStorage ? localStorage.getItem("token") : "";
    if (token) {
      authStore.setToken(token);
    }

    if (!authStore.authenticated) {
      return navigateTo("/login");
    }
  }
});
