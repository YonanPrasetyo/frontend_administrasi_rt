import { api } from "./Api";

export const getRumahList = async () => {
  try {
    const response = await api.get("/rumah");
    return response.data;
  } catch (error) {
    console.error("Error fetching rumah:", error);
    throw error;
  }
};

export const getRumahDetail = async (id) => {
  try {
    const response = await api.get(`/rumah/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching rumah ${id}:`, error);
    throw error;
  }
};

export const createRumah = async (data) => {
  try {
    const response = await api.post("/rumah", data);
    return response.data;
  } catch (error) {
    console.error("Error creating rumah:", error);
    throw error;
  }
};

export const updateRumah = async (id, data) => {
  try {
    const response = await api.put(`/rumah/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating rumah ${id}:`, error);
    throw error;
  }
};

export const deleteRumah = async (id) => {
  try {
    const response = await api.delete(`/rumah/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting rumah ${id}:`, error);
    throw error;
  }
};

export const addPenghuni = async (id, data) => {
  try {
    const response = await api.post(`/rumah/${id}/tambah_penghuni`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating penghuni:", error);
    throw error;
  }
};

export const removePenghuni = async (id, data) => {
  try {
    const response = await api.post(`/rumah/${id}/hapus_penghuni`, data);
    return response.data;
  } catch (error) {
    console.error("Error removing penghuni:", error);
    throw error;
  }
};


export const getHistoryByRumah = async (id) => {
  try {
    const response = await api.get(`/rumah-history/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching history for rumah ${id}:`, error);
    throw error;
  }
};