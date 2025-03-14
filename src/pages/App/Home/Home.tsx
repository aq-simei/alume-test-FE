import { Calendar, Rocket, Users } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form"; // Added useFormField import
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
  BookFlightFormValues,
} from "@/schemas/BookFlightSchema";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/axios";
import { UpcomingFlight } from "@/@types/UpcomingFlight";
import { Button } from "@/components/ui/button";

export const Home = () => {
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
    toast.info("You submitted the following values:" + data);
  };

  const onError = (error: any) => {
    console.error(error);
  };

  const { data, isError, error, isSuccess } = useQuery({
    queryKey: ["upcomingFlights"],
    queryFn: fetchSpaceXFlights,
  });

  const {
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<BookFlightFormValues>({
    resolver: zodResolver(BookFlightFormSchema),
    defaultValues: {
      healthIssues: false,
    },
  });

  return (
    <main className="w-full items-center justify-center flex-col">
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
      <div className="flex flex-col justify-center items-center">
        <div className="flex lg:flex-row justify-center items-center space-x-2 sm:flex-col max-sm:flex-col md:flex-col">
          <h1 className="text-3xl font-bold text-purple-700 motion-preset-fade-lg text-center">
            Buckle Up For Your Next Space Adventure
          </h1>
          <>
            <Rocket
              size={30}
              className="text-purple-700 motion-preset-slide-left-l motion-preset-fade-lg text-center"
            />
          </>
        </div>
        <span className="text-lg font-semibold w-3/5 motion-preset-fade-lg motion-preset-rebound-down text-center">
          Experience the thrill of space travel with our exclusive SpaceX
          partnership. Select your destination and embark on the journey of a
          lifetime.
        </span>
        <h2 className="text-2xl font-semibold text-blue-200 my-4 w-2/5 text-start">
          Book a flight now:
        </h2>
        <form
          className="flex w-3/5 flex-col space-y-4 p-4 rounded-2xl shadow-zinc-600 shadow-sm items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex-col flex w-fit space-x-2">
            <div className="flex-row flex w-fit space-x-2">
              <Label className="font-bold text-lg">Select the flight: </Label>
              <Select
                defaultValue=""
                onValueChange={(value) => setValue("flightId", value)}
              >
                <SelectTrigger className="w-fit font-bold">
                  <SelectValue placeholder="Pick a flight" />
                </SelectTrigger>
                <SelectContent>
                  {isError && <span className="p-4">Error:  Could Not Find Flights</span>}
                  {data &&
                    data.map((flight: any) => (
                      <SelectItem key={flight.id} value={flight.id}>
                        {flight.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            {errors.flightId?.message && (
              <span className="text-red-500 text-sm text-center">
                * {errors.flightId?.message}
              </span>
            )}
          </div>
          <Input<BookFlightFormValues>
            name="name"
            label="Full name"
            className="w-2/5"
            onChange={(e) => setValue("name", e.target.value)}
            placeholder="Your full name"
            error={errors.name?.message}
          />
          <div className="flex-row flex w-fit space-x-2">
            <Input<BookFlightFormValues>
              label="Age"
              name="age"
              onChange={(e) => setValue("age", parseInt(e.target.value))}
              placeholder="How old are you?"
              className="text-center w-3/5"
              error={errors.age?.message}
            />
          </div>
          <div className="flex-row flex w-fit space-x-2 justify-center items-center">
            <Input<BookFlightFormValues>
              type="checkbox"
              label="Health Issues / Clinic conditions"
              onChange={(e) => setValue("healthIssues", e.target.checked)}
              title="Do you have any health issues ?"
              name="healthIssues"
              className="w-6 h-6"
              error={errors.healthIssues?.message}
            />
          </div>
          <Button
            onClick={handleSubmit(onSubmit, onError)}
            type="submit"
            variant={"outline"}
            className="border-2 font-bold hover:cursor-pointer hover:shadow-sm hover:bg-border  hover:shadow-border hover:text-primary transition-all duration-400 ease-in-out"
          >
            Buy Ticket
          </Button>
        </form>
      </div>
      <section className="py-12 bg-background">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose SpaceVoyager?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We partner with SpaceX to provide the safest and most advanced space
            travel experience available to civilians.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Rocket className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Cutting-Edge Technology</h3>
            <p className="text-gray-400">
              Experience space travel with SpaceX's latest spacecraft technology
              and safety systems.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Expert Crew</h3>
            <p className="text-gray-400">
              Our missions are staffed by experienced astronauts and SpaceX
              engineers.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Flexible Scheduling</h3>
            <p className="text-gray-400">
              Choose from multiple launch dates to fit your schedule and
              preferences.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
