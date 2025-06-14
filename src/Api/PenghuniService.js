import api from "./Api";

export const getPenghuniList = async () => {
  try {
    const response = await api.get("/penghuni");
    return response.data;
  } catch (error) {
    console.error("Error fetching penghuni:", error);
    throw error;
  }
};

export const getPenghuniDetail = async (id) => {
  try {
    const response = await api.get(`/penghuni/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching penghuni ${id}:`, error);
    throw error;
  }
};

export const createPenghuni = async (data) => {
  try {
    const response = await api.post("/penghuni", data);
    return response.data;
  } catch (error) {
    console.error("Error creating penghuni:", error);
    throw error;
  }
};

export const updatePenghuni = async (id, data) => {
  try {
    const response = await api.put(`/penghuni/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating penghuni ${id}:`, error);
    throw error;
  }
};

export const deletePenghuni = async (id) => {
  try {
    const response = await api.delete(`/penghuni/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting penghuni ${id}:`, error);
    throw error;
  }
};
