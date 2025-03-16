import {
  Calendar,
  Clock,
  Download,
  Heart,
  Info,
  Loader2,
  MapPin,
  Rocket,
  Share2,
  User,
  UsersRound,
} from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { UpcomingFlight } from "@/@types/UpcomingFlight";
import { formatDate } from "@/lib/formatDate";
import { handleShare } from "@/lib/shareLink";
import { useState } from "react";

type ConfirmationCardProps = {
  flightId: string;
  userName: string;
  userAge: number;
  flightNumber: string;
  healthComplications: boolean;
  flightData: UpcomingFlight;
};

export const ConfirmationCard = ({
  flightId,
  userName,
  userAge,
  flightNumber,
  healthComplications,
  flightData,
}: ConfirmationCardProps) => {
  const [isSharing, setIsSharing] = useState(false);

  return (
    /** Confirmation Card */
    <Card className="w-full md:w-fit overflow-hidden border-2 border-primary/20 bg-card/80 backdrop-blur-sm motion-opacity-in-0 motion-preset-wiggle motion-duration-700 motion-delay-1000">
      <div className="absolute top-0 right-0 left-0 h-1 bg-primary motion-scale-in-0 motion-duration-1000 motion-delay-2500"></div>
      <CardHeader className="relative pb-0">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="motion-scale-in motion-delay-2000 motion-duration-1000">
            <div className="inset-0 bg-primary/20 rounded-full blur-md"></div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="relative bg-card p-4 rounded-full border border-border motion-opacity-in-0 motion-rotate-in-180 motion-duration-1000 motion-delay-3000"
                    data-testid="mission-badge"
                  >
                    {flightData && flightData?.links?.patch?.small ? (
                      <img
                        src={
                          (flightData.links.patch.small as string) ||
                          "/placeholder.svg"
                        }
                        aria-label="Mission Badge"
                        className="w-24 h-24 object-contain"
                      />
                    ) : (
                      <Rocket
                        size={64}
                        className="w-24 h-24 text-primary"
                        aria-label="Mission Badge"
                      />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{flightData?.name || "Unknown"} mission badge</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex-1 text-center md:text-left motion-safe:animate-fade-in motion-delay-800 motion-duration-700">
            <CardTitle className="text-2xl md:text-3xl mb-2 motion-safe:animate-slide-in-right motion-duration-700 motion-delay-900">
              <h2 data-testid="card-title">{flightData?.name || "Space Journey"}</h2>
            </CardTitle>
            <CardDescription className="text-base">
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-2 motion-safe:animate-fade-in motion-safe:animate-slide-in-right motion-delay-1000 motion-duration-500">
                  <Rocket className="w-4 h-4 text-primary motion-safe:animate-pulse motion-duration-2000" />
                  <span>Flight: {flightData?.flight_number || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2 motion-safe:animate-fade-in motion-safe:animate-slide-in-right motion-delay-1100 motion-duration-500">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Launch: {formatDate(flightData?.date_utc)}</span>
                </div>
                {flightData?.details && (
                  <div className="flex items-start gap-2 mt-1 motion-safe:animate-fade-in motion-safe:animate-slide-in-right motion-delay-1200 motion-duration-500">
                    <Info className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <span className="text-xs text-muted-foreground line-clamp-2">
                      {flightData.details}
                    </span>
                  </div>
                )}
              </div>
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <Separator className="my-6 bg-border motion-safe:animate-width-expand motion-duration-700 motion-delay-1300" />

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Passenger Details Section */}
        <div className="space-y-4 motion-safe:animate-fade-in motion-safe:animate-slide-in-left motion-delay-1400 motion-duration-700">
          <h3 className="text-sm font-bold uppercase text-muted-foreground tracking-wider">
            Passenger Details
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3 motion-safe:animate-fade-in motion-delay-1500 motion-duration-500">
              <div className="bg-primary/10 p-2 rounded-full motion-safe:animate-scale-in motion-delay-1500 motion-duration-500">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-muted-foreground">
                  Passenger Name
                </p>
                <p className="font-bold">{userName || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 motion-safe:animate-fade-in motion-delay-1600 motion-duration-500">
              <div className="bg-primary/10 p-2 rounded-full motion-safe:animate-scale-in motion-delay-1600 motion-duration-500">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-bold">
                  Passenger Age
                </p>
                <p className="font-bold">{userAge || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 motion-safe:animate-fade-in motion-delay-1700 motion-duration-500">
              <div className="bg-primary/10 p-2 rounded-full motion-safe:animate-scale-in motion-delay-1700 motion-duration-500">
                <Heart
                  className={`w-5 h-5 ${
                    healthComplications ? "text-destructive" : "text-success"
                  } ${
                    healthComplications
                      ? "motion-safe:animate-pulse motion-duration-2000"
                      : ""
                  }`}
                />
              </div>
              <div>
                <p className="text-sm font-bold text-muted-foreground">
                  Health Status
                </p>
                <p className="font-bold">
                  {healthComplications
                    ? "Special Attention Required"
                    : "All Clear for Space Travel"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 motion-safe:animate-fade-in motion-safe:animate-slide-in-right motion-delay-1400 motion-duration-700">
          <h3 className="text-sm uppercase text-muted-foreground tracking-wider">
            Mission Details
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3 motion-safe:animate-fade-in motion-delay-1500 motion-duration-500">
              <div className="bg-secondary/10 p-2 rounded-full motion-safe:animate-scale-in motion-delay-1500 motion-duration-500">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-bold">
                  Launch Site
                </p>
                <p className="font-bold">{flightData?.launchpad || "TBD"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 motion-safe:animate-fade-in motion-delay-1600 motion-duration-500">
              <div className="bg-secondary/10 p-2 rounded-full motion-safe:animate-scale-in motion-delay-1600 motion-duration-500">
                <Rocket className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rocket</p>
                <p className="font-bold">
                  {flightData?.name || "Advanced Spacecraft"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 motion-safe:animate-fade-in motion-delay-1700 motion-duration-500">
              <div className="bg-secondary/10 p-2 rounded-full motion-safe:animate-scale-in motion-delay-1700 motion-duration-500">
                <Info className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-bold">
                  Flight ID
                </p>
                <p className="font-bold text-sm truncate max-w-[200px]">
                  {flightId || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col md:flex-row md:justify-center gap-4 pt-6 motion-opacity-in-0 motion-scale-in-0 motion-delay-3000 motion-duration-1000">
        {/* copy home link to clipboard */}
        <Button
          className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 motion-safe:animate-scale-in motion-delay-1900 motion-duration-500"
          onClick={() => navigator.clipboard.writeText(window.location.href)}
        >
          <UsersRound className="mr-2 h-4 w-4" /> Invite Your Friends
        </Button>
        <Button
          variant="outline"
          className="w-full sm:w-auto border-primary/30 hover:bg-primary/10 "
          onClick={() =>
            handleShare(
              setIsSharing,
              userName,
              userAge,
              flightNumber,
              flightData
            )
          }
        >
          {isSharing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Share2 className="mr-2 h-4 w-4" />
          )}
          Share Your Journey
        </Button>
      </CardFooter>
    </Card>
  );
};
