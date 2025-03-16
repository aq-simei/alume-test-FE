import { fetchFlightData } from "@/api/queries/fetchFlight";
import { useQuery } from "@tanstack/react-query";

export const useFetchFlight = (flightId: string) => {
  const { data: flightData, isLoading, isError } = useQuery({
    queryKey: ["flightData", flightId],
    queryFn: () => fetchFlightData(flightId),
    enabled: !!flightId,
  });


  return { flightData, isLoading, isError };
};
