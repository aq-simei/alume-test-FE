import { BookingContext } from "@/contexts/BookingContext";
import { useContext } from "react";

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
};

// Mock implementation for testing
export const mockUseBookingContext = () => ({
  flightId: "123",
  userName: "John Doe",
  userAge: 30,
  flightNumber: "AB123",
  healthComplications: false,
  flightData: {
    id: "123",
    name: "Mars Mission",
    flight_number: "AB123",
    date_utc: "2023-10-01T00:00:00Z",
    details: "A mission to Mars.",
    links: {
      patch: {
        small: "/path/to/patch.png",
      },
    },
    launchpad: "Launch Complex 39A",
  },
});
