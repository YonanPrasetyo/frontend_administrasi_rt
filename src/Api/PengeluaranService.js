import { api } from "./Api";

export const getPengeluaranList = async () => {
    try {
        const response = await api.get("/pengeluaran");
        return response.data;
    } catch (error) {
        console.error("Error fetching pengeluaran:", error);
        throw error;
    }
};

export const getPengeluaranDetail = async (id) => {
    try {
        const response = await api.get(`/pengeluaran/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching pengeluaran ${id}:`, error);
        throw error;
    }
};

export const createPengeluaran = async (data) => {
    try {
        const response = await api.post("/pengeluaran", data);
        return response.data;
    } catch (error) {
        console.error("Error creating pengeluaran:", error);
        throw error;
    }
};

export const updatePengeluaran = async (id, data) => {
    try {
        const response = await api.put(`/pengeluaran/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating pengeluaran ${id}:`, error);
        throw error;
    }
};

export const deletePengeluaran = async (id) => {
    try {
        const response = await api.delete(`/pengeluaran/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting pengeluaran ${id}:`, error);
        throw error;
    }
};