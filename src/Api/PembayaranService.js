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