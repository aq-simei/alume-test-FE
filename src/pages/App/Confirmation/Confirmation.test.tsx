import { useFetchFlight } from "@/hooks/useFetchFlight";
import { useParams } from "react-router-dom";
import { Mock } from "vitest";
import { Confirmation } from "./Confirmation";
import { render, screen } from "@/lib/test-utils/test-utils";
import { UpcomingFlight } from "@/@types/UpcomingFlight";

vi.mock("@/hooks/useFetchFlight");
vi.mock(import("react-router-dom"), async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    useParams: vi.fn(),
  };
});

const mockFlightData: UpcomingFlight = {
  id: "123",
  name: "Mars Mission",
  flight_number: 123,
  date_utc: "2023-10-01T00:00:00Z",
  details: "A mission to Mars.",
  links: {
    patch: {
      small: "/path/to/patch.png",
      large: null,
    },
  },
  launchpad: "Launch Complex 39A",
} as UpcomingFlight;

describe("Confirmation Component", () => {
  beforeEach(() => {
    (useFetchFlight as Mock).mockReturnValue({
      flightData: mockFlightData,
      isLoading: false,
      isError: false,
    });
    (useParams as Mock).mockReturnValue({ flightId: "123" });
  });

  it("renders flight data correctly", async () => {
    render(<Confirmation />);

    // check for icon
    expect(screen.getByTestId("confirmation-icon")).toBeInTheDocument();

    // Check for main titles
    expect(screen.getByText("Journey Confirmed!")).toBeInTheDocument();
    expect(
      screen.getByText("Prepare for your cosmic adventure")
    ).toBeInTheDocument();

    // Check for flight details
    expect(screen.getByTestId("card-title")).toHaveTextContent("Mars Mission");
    expect(screen.getByText("Flight: 123")).toBeInTheDocument();

    // Check for passenger details section
    expect(screen.getByText(/passenger details/i)).toBeInTheDocument();
    expect(screen.getByText("Passenger Name")).toBeInTheDocument();
    expect(screen.getByText("Passenger Age")).toBeInTheDocument();
    expect(screen.getByText("Health Status")).toBeInTheDocument();

    // Check for mission details section
    expect(screen.getByText("Launch Site")).toBeInTheDocument();
    expect(screen.getByText("Flight ID")).toBeInTheDocument();

    // Check for action buttons on card
    expect(screen.getByText("Invite Your Friends")).toBeInTheDocument();
    expect(screen.getByText("Share Your Journey")).toBeInTheDocument();

    // check for book another flight button
    expect(screen.getByText("Book Another Flight")).toBeInTheDocument();
  });

  it("Shows a loading spinner when fetching flight data", async () => {
    (useFetchFlight as Mock).mockReturnValue({
      flightData: null,
      isLoading: true,
      isError: false,
    });

    render(<Confirmation />);
    expect(
      screen.getByText("Preparing your space journey...")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("confirmation-loading-spinner")
    ).toBeInTheDocument();
  });
});
