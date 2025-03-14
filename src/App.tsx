import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router";
import { router } from "./router/routes";
import { ThemeProvider } from "./components/theme/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="theme">
        <HelmetProvider>
          <Toaster />
          <Helmet titleTemplate="%s | Space Dash" />
          <RouterProvider router={router} />
        </HelmetProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
