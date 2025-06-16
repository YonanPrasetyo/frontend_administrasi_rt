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