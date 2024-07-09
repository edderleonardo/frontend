import axios from "axios";

let token = "";
try {
  token = window.localStorage.getItem("token") || "";
} catch (error) {
  console.error("services/api.js ~ Error en el login:", error);
  token = "";
}

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

// Persons
export const getPersonRequest = async () => {
  try {
    const response = await apiClient.get("civils/");
    return response.data;
  } catch (error) {
    console.log("Error en getPersonRequest:", error);
    throw error;
  }
};

export const postPersonRequest = async (data) => {
  try {
    const response = await apiClient.post("civils/", data);
    return response.data;
  } catch (error) {
    console.log("Error en postPersonRequest:", error);
    throw error;
  }
};

export const updatePersonRequest = async (id, data) => {
  try {
    const response = await apiClient.put(`civils/${id}/`, data);
    console.log("🚀 ~ updatePersonRequest ~ response:", response);
    return response.data;
  } catch (error) {
    console.log("Error en updatePersonRequest:", error);
    throw error;
  }
};

export const deletePersonRequest = async (id) => {
  try {
    const response = await apiClient.delete(`civils/${id}/`);
    return response.data;
  } catch (error) {
    console.log("Error en deletePersonRequest:", error);
    throw error;
  }
};

// Cars
export const getCarRequest = async (person_id) => {
  try {
    const response = await apiClient.get(`cars/by-owner/${person_id}/`);
    console.log("🚀 ~ getCarRequest ~ response:", response);
    return response.data;
  } catch (error) {
    console.log("Error en getCarRequest:", error);
    throw error;
  }
};

export const postCarRequest = async (data) => {
  try {
    const response = await apiClient.post("cars/", data);
    return response.data;
  } catch (error) {
    console.log("Error en postCarRequest:", error);
    throw error;
  }
};

export const updateCarRequest = async (id, data) => {
  try {
    const response = await apiClient.put(`cars/${id}/`, data);
    return response.data;
  } catch (error) {
    console.log("Error en updateCarRequest:", error);
    throw error;
  }
};

export const deleteCarRequest = async (id) => {
  try {
    const response = await apiClient.delete(`cars/${id}/`);
    return response.data;
  } catch (error) {
    console.log("Error en deleteCarRequest:", error);
    throw error;
  }
};

export const getInfringementRequest = async (car_id) => {
  try {
    const response = await apiClient.get(`infringements/by-car/${car_id}/`);
    return response.data;
  } catch (error) {
    console.log("Error en getInfringementRequest:", error);
    throw error;
  }
};
