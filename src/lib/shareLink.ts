import { UpcomingFlight } from "@/@types/UpcomingFlight";
import { Dispatch, SetStateAction } from "react";

export const handleShare = async (
  shareStateCallback: Dispatch<SetStateAction<boolean>>,
  userName: string,
  userAge: number,
  flightData: UpcomingFlight
) => {
  shareStateCallback(true);
  try {
    await navigator.clipboard.writeText(
      window.location.href +
        `?flightId=${flightData.id}?userName=${userName}?userAge=${userAge}`
    );
    alert("Booking link copied to clipboard!");
  } catch (error) {
    console.error("Error sharing:", error);
  } finally {
    shareStateCallback(false);
  }
};
