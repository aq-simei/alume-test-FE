import { Calendar, Rocket, Users, Star } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  BookFlightFormSchema,
  type BookFlightFormValues,
} from "@/schemas/BookFlightSchema";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/axios";
import type { UpcomingFlight } from "@/@types/UpcomingFlight";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useBookingContext } from "@/hooks/useBookingContext";
import { Card, CardContent } from "@/components/ui/card";

export const Home = () => {
  const navigate = useNavigate();
  const {
    updateFlightNumber,
    updateHealthComplications,
    updateUserAge,
    updateUserName,
  } = useBookingContext();

  const fetchSpaceXFlights = async () => {
    try {
      const response = await api.get("/launches/upcoming");
      if (response.status === 200) {
        const flightData = response.data.map((flight: UpcomingFlight) => {
          if (
            !flight.id ||
            !flight.name ||
            !flight.date_utc ||
            !flight.upcoming
          ) {
            return null;
          }
          return {
            id: flight.id,
            number: flight.flight_number,
            name: flight.name,
            date_utc: flight.date_utc,
          };
        });
        return flightData;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (data: BookFlightFormValues) => {
    toast.info("Form Submitted Successfully", { position: "top-center" });
    updateFlightNumber(data.flightId);
    updateHealthComplications(data.healthIssues);
    updateUserAge(data.age);
    updateUserName(data.name);
    navigate(`/success/${data.flightId}`);
  };

  const onError = (error: any) => {
    console.log(form.getValues());
    console.error(error);
  };

  const { data, isError } = useQuery({
    queryKey: ["upcomingFlights"],
    queryFn: fetchSpaceXFlights,
  });

  const form = useForm<BookFlightFormValues>({
    resolver: zodResolver(BookFlightFormSchema),
    defaultValues: {
      healthIssues: false,
      name: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const features = [
    {
      icon: Rocket,
      title: "Cutting-Edge Technology",
      description:
        "Experience space travel with SpaceX's latest spacecraft technology and safety systems.",
    },
    {
      icon: Users,
      title: "Expert Crew",
      description:
        "Our missions are staffed by experienced astronauts and SpaceX engineers.",
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description:
        "Choose from multiple launch dates to fit your schedule and preferences.",
    },
  ];

  return (
    <main className="w-full min-h-screen relative">
      <Helmet title="Home">
        <meta
          name="description"
          content="Experience the thrill of space travel with our exclusive SpaceX partnership. Select your destination and embark on the journey of a lifetime."
        />
        <meta
          name="keywords"
          content="space travel, SpaceX, space adventure, space tourism"
        />
        <meta property="og:title" content="Home - Space Board" />
        <meta
          property="og:description"
          content="Experience the thrill of space travel with our exclusive SpaceX partnership. Select your destination and embark on the journey of a lifetime."
        />
        <meta property="og:image" content="URL_to_image" />
        <meta property="og:url" content="URL_to_your_site" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Home - Space Board" />
        <meta
          name="twitter:description"
          content="Experience the thrill of space travel with our exclusive SpaceX partnership. Select your destination and embark on the journey of a lifetime."
        />
        <meta name="twitter:image" content="URL_to_image" />
      </Helmet>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col justify-center items-center text-center mb-16">
          <div className="relative mb-6">
            <Star className="absolute -top-8 -left-8 w-6 h-6 text-primary/60 motion-preset-pulse-md" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent mb-4 motion-preset-expand">
              Buckle Up For Your Next Space Adventure
            </h1>
            <Star className="absolute -bottom-8 -right-8 w-6 h-6 text-primary/60" />
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 motion-preset-expand">
            Experience the thrill of space travel with our exclusive SpaceX
            partnership. Select your destination and embark on the journey of a
            lifetime.
          </p>
          <Rocket className="w-12 h-12 text-primary motion-opacity-in-0 motion-delay-500" />
        </div>

        <Card className="max-w-2xl mx-auto mb-24 border-primary/20 bg-card/80 backdrop-blur-sm motion-preset-fade-lg motion-duration-1000 motion-delay-500">
          <CardContent className="p-6">
            <Form {...form}>
              <form
                className="space-y-6 flex flex-col w-full"
                onSubmit={handleSubmit(onSubmit, onError)}
              >
                <FormDescription className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6 motion-preset-pulse-sm motion-ease-bounce" />
                  Book Your Space Flight
                </FormDescription>

                <FormField
                  name="flightId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Select Your Mission
                      </FormLabel>
                      <Select defaultValue="" onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-full bg-background/50 border-primary/20">
                            <SelectValue placeholder="Choose your destination" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-60">
                          {isError ? (
                            <div className="p-4 text-destructive">
                              Error: Could Not Find Flights
                            </div>
                          ) : (
                            data?.map((flight: any) => (
                              <SelectItem
                                key={flight.id}
                                value={flight.id}
                                className="hover:bg-primary/10"
                              >
                                {flight.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      {errors.flightId?.message && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.flightId.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <div className="flex flex-col w-full md:flex-row gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-lg font-semibold">
                          Full Name
                        </FormLabel>
                        <Input
                          {...field}
                          className="bg-background/50 border-primary/20"
                          placeholder="Enter your full name"
                        />
                        {errors.name?.message && (
                          <p className="text-destructive text-sm mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-lg font-semibold">
                          Age
                        </FormLabel>
                        <Input
                          type="number"
                          className="bg-background/50 border-primary/20"
                          placeholder="Enter your age"
                          onChange={(e) =>
                            field.onChange(Number.parseInt(e.target.value))
                          }
                        />
                        {errors.age?.message && (
                          <p className="text-destructive text-sm mt-1">
                            {errors.age.message}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="healthIssues"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-4 self-center">
                      <FormLabel className="text-lg font-semibold">
                        Health Considerations
                      </FormLabel>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="w-6 h-6 border-primary/20"
                      />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="md:w-2/5 w-full bg-primary font-bold text-primary-foreground self-center motion-safe:animate-scale-in motion-delay-700 hover:bg-background hover:border-2 hover:border-border hover:text-primary"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Buy Ticket
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <section className="py-16 motion-preset-fade-lg motion-duration-1000 motion-delay-500">
          <div className="text-center mb-16 motion-safe:animate-fade-in motion-delay-700">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Why Choose SpaceVoyager?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We partner with SpaceX to provide the safest and most advanced
              space travel experience available to civilians.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="border-primary/10 bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 motion-safe:animate-fade-in motion-safe:animate-slide-in-bottom"
                style={{
                  animationDelay: `${(index + 1) * 200}ms`,
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 motion-safe:animate-scale-in motion-delay-1000">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
