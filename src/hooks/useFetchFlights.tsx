import { UpcomingFlight } from "@/@types/UpcomingFlight";
import { fetchSpaceXFlights } from "@/api/queries/fetchFlights";
import { useQuery } from "@tanstack/react-query";

export const useFetchFlights = () => {
  const { data, isError, isSuccess } = useQuery({
    queryKey: ["upcomingFlights"],
    queryFn: fetchSpaceXFlights,
  });

  let flightData: UpcomingFlight[] = [];
  if (isSuccess) {
    flightData = data.map((flight: UpcomingFlight) => {
      if (!flight.id || !flight.name || !flight.date_utc || !flight.upcoming) {
        return null;
      }
      return {
        id: flight.id,
        number: flight.flight_number,
        name: flight.name,
        date_utc: flight.date_utc,
      };
    });
  }
  return {
    flightData,
    isError,
    isSuccess,
  };
};
