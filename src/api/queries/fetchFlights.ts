import { api } from "../axios";

export const fetchSpaceXFlights = async () => {
    try {
      const response = await api.get("/launches/upcoming");
        return response.data
    } catch (error) {
      console.error(error);
    }
  };

