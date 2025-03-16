import { UpcomingFlight } from "@/@types/UpcomingFlight";
import { api } from "../axios";

export const fetchFlightData = async (flightId: string) => {
  const response = await api.get(`/launches/${flightId}`);
  return response.data as UpcomingFlight;
};
