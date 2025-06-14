import api from "./Api";

export const getRumahList = async () => {
  try {
    const response = await api.get("/rumah");
    return response.data;
  } catch (error) {
    console.error("Error fetching rumah:", error);
    throw error;
  }
};
