import axios from "axios";

const baseUrl = "http://localhost:3000/api/events";

export const getAllEvents = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEventByLocationId = async (locationId) => {
  try {
    const response = await axios.get(`${baseUrl}/${locationId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
