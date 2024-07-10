import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) {
    const authStore = useAuthStore();
    let token = null;
    let refreshToken = null;

    try {
      token = window.localStorage.getItem("token") || "";
      refreshToken = window.localStorage.getItem("refreshToken") || "";
    } catch (error) {
      console.error("Error al obtener tokens del localStorage:", error);
    }

    if (token && refreshToken) {
      authStore.setTokens(token, refreshToken);
    }

    if (!authStore.authenticated) {
      // Intenta refrescar el token si hay un refresh token
      if (refreshToken) {
        try {
          await authStore.refreshAccessToken();
        } catch (error) {
          console.error("Error al refrescar el token:", error);
          return navigateTo("/login");
        }
      } else {
        return navigateTo("/login");
      }
    }
  }
});