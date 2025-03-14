import { z } from "zod";

const BookFlightFormSchema = z.object({
  flightId: z.string({ message: "Flight id required" }), // it is a hash string with 24 characters
  name: z.string({ message: "Name is required" }).max(100),
  age: z
    .number({ message: "Age is required" })
    .int({ message: "Age must be a whole number" })
    .min(18, { message: "You must be at least 18 years old." }),
  healthIssues: z.boolean({
    required_error: "Please provide this information.",
  }),
});

type BookFlightFormValues = z.infer<typeof BookFlightFormSchema>;

export { BookFlightFormValues, BookFlightFormSchema };
