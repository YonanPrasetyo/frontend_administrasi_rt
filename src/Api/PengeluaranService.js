import api from "./Api";

export const getPengeluaranList = async () => {
    try {
        const response = await api.get("/pengeluaran");
        return response.data;
    } catch (error) {
        console.error("Error fetching pengeluaran:", error);
        throw error;
    }
};