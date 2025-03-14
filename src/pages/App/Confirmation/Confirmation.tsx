"use client";

import type { UpcomingFlight } from "@/@types/UpcomingFlight";
import { api } from "@/api/axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBookingContext } from "@/hooks/useBookingContext";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Heart,
  Info,
  Loader2,
  MapPin,
  Rocket,
  Share2,
  User,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";

export const Confirmation: React.FC = () => {
  const { flightId } = useParams<{ flightId: string }>();
  const { userName, userAge, flightNumber, healthComplications } =
    useBookingContext();
  const [isSharing, setIsSharing] = useState(false);

  const fetchFlightData = async () => {
    const response = await api.get(`/launches/${flightId}`);
    return response.data as UpcomingFlight;
  };

  const { data: flightData, isLoading } = useQuery({
    queryKey: ["flightData", flightId],
    queryFn: () => fetchFlightData(),
  });

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Space Flight Confirmation: ${
            flightData?.name || "Space Journey"
          }`,
          text: `I'm going to space on flight ${flightNumber}! Launch date: ${
            flightData?.date_utc
              ? new Date(flightData.date_utc).toLocaleDateString()
              : "Coming soon"
          }`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Booking link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    } finally {
      setIsSharing(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <Loader2 className="w-12 h-12 text-primary motion-preset-spin mb-4" />
        <p className="text-xl motion-opacity-in-0 motion-duration-1000">
          Preparing your space journey...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 px-4 overflow-hidden h-auto">
      <div className="relative motion-preset-pulse-sm motion-duration-2000">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-20 animate-pulse"></div>
        <CheckCircle className="w-20 h-20 text-green-600 relative z-10  motion-translate-y-in-50 motion-opacity-in-0 motion-duration-1000" />
      </div>
      <h1 className="font-bold text-4xl text-primary mb-2 motion-safe:motion-preset-expand motion-duration-1000 motion-delay-1000">
        Journey Confirmed!
      </h1>
      <p className="text-xl font-semibold text-muted-foreground motion-opacity-in-0 motion-duration-1000 motion-delay-1000">
        Prepare for your cosmic adventure
      </p>
      <Card className="w-full md:w-fit overflow-hidden border-2 border-primary/20 bg-card/80 backdrop-blur-sm motion-opacity-in-0 motion-preset-wiggle motion-duration-1000 motion-delay-1500">
        <div className="absolute top-0 right-0 left-0 h-1 bg-primary motion-scale-in-0 motion-duration-1000 motion-delay-2500"></div>

        <CardHeader className="relative pb-0">
          <div className="absolute top-[-25px] right-0 p-4 motion-opacity-in-0 motion-delay-1000 motion-duration-500">
            <Badge
              variant="outline"
              className="bg-background/30 backdrop-blur-sm border-primary/50 font-bold"
            >
              {flightData?.success === false ? "Simulation" : "Confirmed"}
            </Badge>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="motion-scale-in motion-delay-2000 motion-duration-1000">
              <div className="inset-0 bg-primary/20 rounded-full blur-md"></div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative bg-card p-4 rounded-full border border-border motion-opacity-in-0 motion-rotate-in-180 motion-duration-1000 motion-delay-3000">
                      {flightData && flightData?.links?.patch?.small ? (
                        <img
                          src={
                            (flightData.links.patch.small as string) ||
                            "/placeholder.svg"
                          }
                          alt="Mission Badge"
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
                {flightData?.name || "Space Journey"}
              </CardTitle>
              <CardDescription className="text-base">
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex items-center gap-2 motion-safe:animate-fade-in motion-safe:animate-slide-in-right motion-delay-1000 motion-duration-500">
                    <Rocket className="w-4 h-4 text-primary motion-safe:animate-pulse motion-duration-2000" />
                    <span>Flight: {flightNumber || "N/A"}</span>
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

        <CardFooter className="flex flex-col sm:flex-row gap-4 pt-6 motion-opacity-in-0 motion-scale-in-0 motion-delay-3000 motion-duration-1000">
          <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 motion-safe:animate-scale-in motion-delay-1900 motion-duration-500">
            <Download className="mr-2 h-4 w-4" /> Download Boarding Pass
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto border-primary/30 hover:bg-primary/10 "
            onClick={handleShare}
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

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl motion-preset-blur-down motion-delay-3500 motion-duration-1000 items-center justify-center">
        <Button
          variant="ghost"
          asChild
          className="motion-safe:animate-scale-in motion-delay-2200 motion-duration-500"
        >
          <Link to="/bookings">
            <span className="flex items-center gap-2">
              <Rocket className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
              View All Bookings
            </span>
          </Link>
        </Button>

        <Button
          variant="ghost"
          asChild
          className="group motion-safe:animate-scale-in motion-delay-2300 motion-duration-500"
        >
          <Link to="/">
            <span className="flex items-center gap-2">
              <Rocket className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
              Book Another Flight
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
};
