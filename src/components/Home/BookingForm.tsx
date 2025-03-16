import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFetchFlights } from "@/hooks/useFetchFlights";
import {
  BookFlightFormSchema,
  BookFlightFormValues,
} from "@/schemas/BookFlightSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Rocket, Star } from "lucide-react";
import { useForm } from "react-hook-form";
import CustomSelect from "@/components/ui/CustomSelect";

type BookingFormProps = {
  handleSubmitForm: (data: BookFlightFormValues) => void;
};

export const BookingForm = ({ handleSubmitForm }: BookingFormProps) => {
  const form = useForm<BookFlightFormValues>({
    resolver: zodResolver(BookFlightFormSchema),
    defaultValues: {
      healthIssues: false,
      name: "",
    },
  });

  const { flightData, isError } = useFetchFlights();
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onError = (error: any) => {
    console.log(form.getValues());
    console.error(error);
  };
  return (
    <Card
      className="max-w-2xl mx-auto mb-24 border-primary/20 bg-card/80 backdrop-blur-sm motion-preset-fade-lg motion-duration-1000 motion-delay-500"
      data-testid="booking-form"
    >
      <CardContent className="p-6">
        <Form {...form}>
          <form
            className="space-y-6 flex flex-col w-full"
            onSubmit={handleSubmit(handleSubmitForm, onError)}
          >
            <FormDescription className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 motion-preset-pulse-sm motion-ease-bounce" />
              Book Your Space Flight
            </FormDescription>

            <FormField
              name="flightId"
              data-testid="flight-select"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Select Your Mission
                  </FormLabel>
                  <FormControl>
                    <CustomSelect
                      isError={isError}
                      options={
                        flightData?.map((flight: any) => ({
                          value: flight.id,
                          label: flight.name,
                        })) || []
                      }
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full bg-background/50 border-primary/20"
                      data-testid="flight-select"
                    />
                  </FormControl>
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
                    <FormLabel
                      htmlFor="fullName"
                      className="text-lg font-semibold"
                    >
                      Full Name
                    </FormLabel>
                    <Input
                      {...field}
                      id="fullName"
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
                    <FormLabel className="text-lg font-semibold" htmlFor="age">
                      Age
                    </FormLabel>
                    <Input
                      id="age"
                      type="number"
                      accept="number"
                      min={0}
                      className="bg-background/50 border-primary/20"
                      placeholder="Enter your age"
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value, 10))
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
                  <FormLabel
                    htmlFor="healthIssues"
                    className="text-lg font-semibold"
                  >
                    Health Considerations
                  </FormLabel>
                  <Checkbox
                    data-testid="health-considerations"
                    id="healthIssues"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="w-6 h-6 border-primary/20"
                  />
                </FormItem>
              )}
            />

            <Button
              aria-label="Submit Booking"
              type="submit"
              size="lg"
              name="submit"
              className="md:w-2/5 w-full bg-primary font-bold text-primary-foreground self-center motion-safe:animate-scale-in motion-delay-700 hover:bg-background hover:border-2 hover:border-border hover:text-primary"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Buy Ticket
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
