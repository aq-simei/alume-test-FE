import { createContext, ReactNode, useMemo, useState } from "react";

interface BookingContextType {
  userName: string;
  userAge: number;
  flightNumber: string;
  healthComplications: boolean | null;
  updateUserName: (name: string) => void;
  updateUserAge: (age: number) => void;
  updateFlightNumber: (flight: string) => void;
  updateHealthComplications: (complications: boolean) => void;
}

export const BookingContext = createContext<BookingContextType | undefined>(
  undefined
);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState<string>("");
  const [userAge, setUserAge] = useState<number>(0);
  const [flightNumber, setFlightNumber] = useState<string>("");
  const [healthComplications, setHealthComplications] = useState<
    boolean | null
  >(null);

  const updateUserName = (name: string) => setUserName(() => name);
  const updateUserAge = (age: number) => setUserAge(() => age);
  const updateFlightNumber = (flight: string) => setFlightNumber(() => flight);
  const updateHealthComplications = (complications: boolean) =>
    setHealthComplications(() => complications);
  const bookingData = useMemo(
    () => ({
      userName,
      userAge,
      flightNumber,
      healthComplications,
      updateUserName,
      updateUserAge,
      updateFlightNumber,
      updateHealthComplications,
    }),
    [
      flightNumber,
      healthComplications,
      userName,
      userAge,
    ]
  );

  return (
    <BookingContext.Provider value={bookingData}>
      {children}
    </BookingContext.Provider>
  );
};
