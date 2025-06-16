import { api } from "./Api";

export const getDashboardData = async () => {
    try {
        const response = await api.get("/dashboard");
        return response;
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw error;
    }
};

export const laporanPerBulan = async () => {
    try {
        const response = await api.get("/laporan");
        return response;
    } catch (error) {
        console.error("Error fetching laporan per bulan:", error);
        throw error;
    }
};