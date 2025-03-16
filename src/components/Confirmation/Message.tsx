import { CheckCircle } from "lucide-react";

export const ConfirmationMessage = () => {
  return (
    <>
      <div
        className="relative motion-preset-pulse-sm motion-duration-2000"
        data-testid="confirmation-icon"
      >
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-20 animate-pulse"></div>
        <CheckCircle className="w-20 h-20 text-green-600 relative z-10  motion-translate-y-in-50 motion-opacity-in-0 motion-duration-1000" />
      </div>
      <h1 className="font-bold text-4xl text-primary mb-2 motion-safe:motion-preset-expand motion-duration-1000 motion-delay-1000">
        Journey Confirmed!
      </h1>
      <p className="text-xl font-semibold text-muted-foreground motion-opacity-in-0 motion-duration-1000 motion-delay-1000">
        Prepare for your cosmic adventure
      </p>
    </>
  );
};
