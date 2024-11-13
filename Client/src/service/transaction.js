import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const createTransaction = async ({ userId, projectId, amount }) => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/v1/payment/verify`, {
      userId,
      projectId,
      amount,
    });

    if (!response.ok) {
      // const errorText = await response.text(); // Retrieve error message from the response
      throw new Error(`Failed to fetch collection: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in getCollection:", error);
    throw error;
  }
};
