import { Loader2 } from "lucide-react";

export const ConfirmationLoading = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[70vh]"
      data-testid="confirmation-loading"
    >
      <div data-testid="confirmation-loading-spinner">
        <Loader2 className="w-12 h-12 text-primary motion-preset-spin mb-4" />
      </div>
      <p className="text-xl motion-opacity-in-0 motion-duration-1000">
        Preparing your space journey...
      </p>
    </div>
  );
};
