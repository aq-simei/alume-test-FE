// test-utils.tsx
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BookingContext, BookingContextType } from "@/contexts/BookingContext";
import { ReactElement, ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async"; // Import HelmetProvider
import { ThemeProvider } from "@/components/theme/provider"; // Import ThemeProvider

// Create a new QueryClient instance for testing
const queryClient = new QueryClient();

// Define a custom wrapper that includes all providers
const AllProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        {" "}
        {/* Add ThemeProvider */}
        <HelmetProvider>
          {" "}
          {/* Add HelmetProvider */}
          <BookingContext.Provider value={{} as BookingContextType}>
            {children}
          </BookingContext.Provider>
        </HelmetProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

// Custom render function
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
// Override the default render with our custom render
export { customRender as render };
