import { render, screen, fireEvent } from "@testing-library/react";
import { ConfirmationCard } from "./Card";
import { UpcomingFlight } from "@/@types/UpcomingFlight";
import { formatDate } from "@/lib/formatDate";
import * as shareLink from "@/lib/shareLink";

const mockFlightData: UpcomingFlight = {
  flight_number: 123,
  name: "Test Flight",
  date_utc: "2023-10-10T10:00:00Z",
  details: "This is a test flight.",
  launchpad: "Test Launchpad",
  links: {
    patch: {
      small: "/test-patch.png",
      large: "/test-patch.png",
    },
  },
} as UpcomingFlight;

vi.mock("@/lib/shareLink");

describe("ConfirmationCard", () => {
  it("renders the form heading", () => {
    render(
      <ConfirmationCard
        flightId="flight123"
        userName="John Doe"
        userAge={30}
        flightNumber="123"
        healthComplications={false}
        flightData={mockFlightData}
      />
    );
    expect(screen.getByRole("heading", { name: /Test Flight/i })).toBeDefined();
    expect(screen.getByText("Flight: 123")).toBeDefined();
    expect(
      screen.getByText("Launch: " + formatDate(mockFlightData.date_utc))
    ).toBeDefined();
    expect(screen.getByTestId("mission-badge")).toBeDefined();
  });

  it("renders all data displays correctly", () => {
    render(
      <ConfirmationCard
        flightId="flight123"
        userName="John Doe"
        userAge={30}
        flightNumber="123"
        healthComplications={false}
        flightData={mockFlightData}
      />
    );
    expect(screen.getByText(/passenger details/i)).toBeDefined();
    expect(screen.getByText(/mission details/i)).toBeDefined();
    expect(screen.getByText(/passenger name/i)).toBeDefined();
    expect(screen.getByText(/passenger age/i)).toBeDefined();
    expect(screen.getByText(/health status/i)).toBeDefined();
    expect(screen.getByText(/launch site/i)).toBeDefined();
    expect(screen.getByText(/rocket/i)).toBeDefined();
    expect(screen.getByText(/Flight ID/i)).toBeDefined();
  });

  it("renders both action buttons on the card footer", () => {
    render(
      <ConfirmationCard
        flightId="flight123"
        userName="John Doe"
        userAge={30}
        flightNumber="123"
        healthComplications={false}
        flightData={mockFlightData}
      />
    );

    expect(screen.getByText("Share Your Journey")).toBeDefined();
    expect(screen.getByText("Invite Your Friends")).toBeDefined();
  });

  it("renders correctly with given props", () => {
    render(
      <ConfirmationCard
        flightId="flight122"
        userName="John Doe"
        userAge={29}
        flightNumber="122"
        healthComplications={false}
        flightData={mockFlightData}
      />
    );

    expect(
      screen.getByRole("heading", { name: /Test Flight/i })
    ).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("29")).toBeInTheDocument();
    expect(screen.getByText("All Clear for Space Travel")).toBeInTheDocument();
    expect(screen.getByText("Test Launchpad")).toBeInTheDocument();
  });
  it("handles sharing button click", () => {
    const mockHandleShare = vi.spyOn(shareLink, "handleShare");

    render(
      <ConfirmationCard
        flightId="flight123"
        userName="John Doe"
        userAge={30}
        flightNumber="123"
        healthComplications={false}
        flightData={mockFlightData}
      />
    );

    const shareButton = screen.getByText("Share Your Journey");
    fireEvent.click(shareButton);

    expect(mockHandleShare).toHaveBeenCalledTimes(1);

    expect(mockHandleShare).toHaveBeenCalledWith(
      expect.any(Function), // sharing state callback, any fn in test
      "John Doe",
      30,
      "123",
      mockFlightData
    );
  });
});
