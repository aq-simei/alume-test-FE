import { Button } from "../ui/button";
import { Rocket } from "lucide-react";

type ConfirmationActionsProps = {
  navigate: (path: string) => void;
  userName: string;
  userAge: number;
};

export const ConfirmationActions = ({
  navigate,
  userAge,
  userName,
}: ConfirmationActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl motion-preset-blur-down motion-delay-3500 motion-duration-1000 items-center justify-center">
      <Button
        variant="ghost"
        asChild
        className="group motion-safe:animate-scale-in motion-delay-2300 motion-duration-500"
        onClick={() => navigate(`/?userName=${userName}&userAge=${userAge}`)}
      >
        <span className="flex items-center gap-2">
          <Rocket className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
          Book Another Flight
        </span>
      </Button>
    </div>
  );
};
