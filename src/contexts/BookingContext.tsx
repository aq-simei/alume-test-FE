import { createContext, ReactNode } from "react";

interface BookingContextType {
  userName: string;
  userAge: number;
  flightNumber: string;
  healthComplications: boolean;
}

export const BookingContext = createContext<BookingContextType | undefined>(
  undefined
);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  return (
    <BookingContext.Provider
      value={{
        userName: "John Doe",
        userAge: 30,
        flightNumber: "BA123",
        healthComplications: false,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
