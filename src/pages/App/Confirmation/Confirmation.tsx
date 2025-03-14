import { useBookingContext } from "@/hooks/useBookingContext";
import { CheckCircle } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";

export const Confirmation: React.FC = () => {
  const { flightId } = useParams<{ flightId: string }>();
  const { userName, userAge, flightNumber, healthComplications } =
    useBookingContext();
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <CheckCircle className="w-8 h-8 text-green-500" />
      <h1 className="font-bold text-3xl">Purchase Confirmed !</h1>
      <p>Here is your purchase information:</p>
      <div className="flex flex-col items-center justify-center space-y-2">
        <p>
          <span className="font-bold">Flight ID:</span> {flightId}
        </p>
        <p>
          <span className="font-bold">Name:</span> {userName}
        </p>
        <p>
          <span className="font-bold">Age:</span> {userAge}
        </p>
        <p>
          <span className="font-bold">Flight Number:</span> {flightNumber}
        </p>
        <p>
          <span className="font-bold">Health Complications:</span>{" "}
          {healthComplications ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
};
