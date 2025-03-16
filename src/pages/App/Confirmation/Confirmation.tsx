import { useBookingContext } from "@/hooks/useBookingContext";
import { useNavigate, useParams } from "react-router-dom";
import { ConfirmationMessage } from "@/components/Confirmation/Message";
import { ConfirmationLoading } from "@/components/Confirmation/Loading";
import { useFetchFlight } from "@/hooks/useFetchFlight";
import { ConfirmationCard } from "@/components/Confirmation/Card";
import { ConfirmationActions } from "@/components/Confirmation/Actions";

export const Confirmation: React.FC = () => {
  const { flightId } = useParams<{ flightId: string }>();
  const { userName, userAge, flightNumber, healthComplications } =
    useBookingContext();
  const navigate = useNavigate();
  const { flightData, isLoading } = useFetchFlight(flightId as string);

  if (isLoading) {
    return <ConfirmationLoading />;
  }

  return (
    <>
      <title>Confirmation | Space Dash</title>
      <div className="flex flex-col items-center justify-center space-y-8 px-4 overflow-hidden h-auto">
        {/* Confirmation Message */}
        <ConfirmationMessage />
        {/* Confirmation Card */}
        {flightData && (
          <ConfirmationCard
            flightData={flightData}
            flightId={flightId as string}
            flightNumber={flightNumber}
            userName={userName}
            userAge={userAge}
            healthComplications={healthComplications as boolean}
          />
        )}
        {/* Action || Nav Buttons */}
        <ConfirmationActions navigate={navigate} userAge={userAge} userName={userName}/>
      </div>
    </>
  );
};
