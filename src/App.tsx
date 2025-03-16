import { RouterProvider } from "react-router";
import { router } from "./router/routes";
import { ThemeProvider } from "./components/theme/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";
import { BookingProvider } from "./contexts/BookingContext";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        <BookingProvider>
          <Toaster />
          <RouterProvider router={router} />
        </BookingProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
