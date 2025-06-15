import { data } from "react-router-dom";
import api from "./Api";

export const getPembayaranList = async () => {
    try {
        const response = await api.get("/pembayaran");
        return response.data;
    } catch (error) {
        console.error("Error fetching pembayaran:", error);
        throw error;
    }
};

export const createPembayaran = async (data) => {
    try {
        const response = await api.post("/pembayaran", data);
        return response.data;
    } catch (error) {
        console.error("Error creating pembayaran:", error);
        throw error;
    }
}

export const deletePembayaran = async (id) => {
    try {
        const response = await api.delete(`/pembayaran/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting pembayaran ${id}:`, error);
        throw error;
    }
}