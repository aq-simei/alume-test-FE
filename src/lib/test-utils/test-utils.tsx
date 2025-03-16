// test-utils.tsx
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BookingContext } from "@/contexts/BookingContext";
import { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "@/components/theme/provider"; // Import ThemeProvider
import { BrowserRouter as Router } from "react-router-dom"; // Import Router
import { Mock } from "vitest";
// Create a new QueryClient instance for testing
const queryClient = new QueryClient();
// Define a custom wrapper that includes all providers

let mockUpdateFlightNumber: Mock;
let mockUpdateHealthComplications: Mock;
let mockUpdateUserAge: Mock;
let mockUpdateUserName: Mock;
mockUpdateFlightNumber = vi.fn();
mockUpdateHealthComplications = vi.fn();
mockUpdateUserAge = vi.fn();
mockUpdateUserName = vi.fn();

export const AllProviders = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="theme">
          <BookingContext.Provider
            value={{
              updateFlightNumber: mockUpdateFlightNumber,
              updateHealthComplications: mockUpdateHealthComplications,
              updateUserAge: mockUpdateUserAge,
              updateUserName: mockUpdateUserName,
              flightNumber: "1",
              healthComplications: false,
              userAge: 25,
              userName: "John Doe",
            }}
          >
            <Router>{children}</Router>
          </BookingContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

// Custom render function
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) =>
  render(ui, {
    wrapper: (props) => (
      <AllProviders {...props} />
    ),
    ...options,
  });

export * from "@testing-library/react";
// Override the default render with our custom render
export { customRender as render };
export { mockUpdateFlightNumber, mockUpdateHealthComplications, mockUpdateUserAge, mockUpdateUserName };
