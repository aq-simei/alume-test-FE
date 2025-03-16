import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BookingForm } from "./BookingForm";
import { useFetchFlights } from "@/hooks/useFetchFlights";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/lib/test-utils/test-utils";

// Mock the custom hook
vi.mock("@/hooks/useFetchFlights", () => ({
  useFetchFlights: vi.fn(),
}));

// Mock data
const mockFlights = [
  { id: "flight-1", name: "Mars Explorer" },
  { id: "flight-2", name: "Moon Base Alpha" },
  { id: "flight-3", name: "Venus Odyssey" },
];
function createMockPointerEvent(
  type: string,
  props: PointerEventInit = {}
): PointerEvent {
  const event = new Event(type, props) as PointerEvent;
  Object.assign(event, {
    button: props.button ?? 0,
    ctrlKey: props.ctrlKey ?? false,
    pointerType: props.pointerType ?? "mouse",
  });
  return event;
}

// Assign the mock function to the global window object
window.PointerEvent = createMockPointerEvent as any;

// Mock HTMLElement methods
Object.assign(window.HTMLElement.prototype, {
  scrollIntoView: vi.fn(),
  releasePointerCapture: vi.fn(),
  hasPointerCapture: vi.fn(),
});
describe("BookingForm", () => {
  const handleSubmitFormMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock implementation
    (useFetchFlights as any).mockReturnValue({
      flightData: mockFlights,
      isError: false,
      isSuccess: true,
    });
  });

  it("renders the form correctly", () => {
    render(<BookingForm handleSubmitForm={handleSubmitFormMock} />);

    // Check for main elements
    expect(screen.getByText("Book Your Space Flight")).toBeInTheDocument();
    expect(screen.getByText("Select Your Mission")).toBeInTheDocument();
    expect(screen.getByText("Full Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Health Considerations")).toBeInTheDocument();
    expect(screen.getByText("Buy Ticket")).toBeInTheDocument();
    // check for input fields
    expect(
      screen.getByPlaceholderText("Enter your full name")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your age")).toBeInTheDocument();
    // check for checkbox
    expect(screen.getByRole("checkbox")).toBeInTheDocument;
    // check for select dropdown
    expect(screen.getByText("Pick your mission")).toBeInTheDocument();

    // Check form is loaded with correct testid
    expect(screen.getByTestId("booking-form")).toBeInTheDocument();
  });

  it("displays flight options when dropdown is clicked", async () => {
    render(<BookingForm handleSubmitForm={handleSubmitFormMock} />);

    // Open the select dropdown
    const selectTrigger = screen.getByText("Pick your mission");
    fireEvent.click(selectTrigger);

    // Check all flight options are displayed
    expect(screen.getByRole("option", { name: "Mars Explorer" })).toBeDefined();
    expect(
      screen.getByRole("option", { name: "Moon Base Alpha" })
    ).toBeDefined();
    expect(screen.getByRole("option", { name: "Venus Odyssey" })).toBeDefined();
  });

  it("shows an error message when flights fail to load", () => {
    // Mock error state
    (useFetchFlights as any).mockReturnValue({
      flightData: [],
      isError: true,
      isSuccess: false,
    });

    render(<BookingForm handleSubmitForm={handleSubmitFormMock} />);

    // Open the select dropdown
    const selectTrigger = screen.getByText("Pick your mission");
    fireEvent.click(selectTrigger);

    // Check error message
    expect(
      screen.getByText("Error: Could Not Find Flights")
    ).toBeInTheDocument();
  });

  it("shows validation errors when form is submitted empty", async () => {
    render(<BookingForm handleSubmitForm={handleSubmitFormMock} />);

    // Submit the form without filling in any fields
    const submitButton = screen.getByText("Buy Ticket");
    fireEvent.click(submitButton);

    // Check for validation error messages
    expect(await screen.findByText(/Flight id required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Age is required/i)).toBeInTheDocument();

    // Verify that the submit handler was not called
    expect(handleSubmitFormMock).not.toHaveBeenCalled();
  });

  it("submits the form with valid data", async () => {
    render(<BookingForm handleSubmitForm={handleSubmitFormMock} />);
    // 1. Select flight
    const selectTrigger = screen.getByText(/Pick your mission/i);
    fireEvent.click(selectTrigger);
    fireEvent.click(await waitFor(() => screen.getByText("Mars Explorer")));
    // 2. Enter name
    const nameInput = screen.getByPlaceholderText(/Enter your full name/i);
    fireEvent.change(nameInput, {
      target: { value: "John Doe" },
    });
    // 3. Enter age
    const ageInput = screen.getByPlaceholderText(
      "Enter your age"
    ) as HTMLInputElement;
    fireEvent.change(ageInput, {
      target: { value: 30 },
    });

    // 4. Check health considerations
    const healthCheckbox = screen.getByTestId("health-considerations");
    fireEvent.click(healthCheckbox);


    // Submit the form
    const submitButton = screen.getByText("Buy Ticket");
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Check that the form was submitted with the correct data
    const firstCallArgs = handleSubmitFormMock.mock.calls[0][0];
    expect(firstCallArgs).toEqual({
      flightId: "flight-1",
      name: "John Doe",
      age: 30,
      healthIssues: true,
    });

    // Verify the number of calls
    expect(handleSubmitFormMock).toHaveBeenCalledTimes(1);
  });

  it("handles age validation correctly", async () => {
    render(<BookingForm handleSubmitForm={handleSubmitFormMock} />);

    // Fill in the form with an invalid age (negative)
    const ageInput = screen.getByPlaceholderText(
      "Enter your age"
    ) as HTMLInputElement;
    fireEvent.change(ageInput, { target: { value: 12 } });

    // Submit the form
    const submitButton = screen.getByText("Buy Ticket");
    fireEvent.click(submitButton);

    // Check for age validation error message
    expect(
      await screen.findByText(/You must be at least 18 years old./i)
    ).toBeInTheDocument();
  });

  it("toggles the health considerations checkbox", async () => {
    render(<BookingForm handleSubmitForm={handleSubmitFormMock} />);

    const healthCheckbox = screen.getByRole("checkbox") as HTMLInputElement;

    // Initial state should be unchecked
    console.log(healthCheckbox.ariaChecked);
    expect(healthCheckbox.ariaChecked).toBe("false");

    // Click to check
    await userEvent.click(healthCheckbox);
    expect(healthCheckbox.ariaChecked).toBe("true");

    // Click to uncheck
    await userEvent.click(healthCheckbox);
    expect(healthCheckbox.ariaChecked).toBe("false");
  });
});
