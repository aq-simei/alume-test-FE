import { render, screen } from "@testing-library/react";
import { ConfirmationMessage } from "./Message";

describe("ConfirmationMessage", () => {
  it("should render the confirmation icon", () => {
    render(<ConfirmationMessage />);
    expect(screen.getByTestId("confirmation-icon")).toBeInTheDocument();
  });

  it("should render the confirmation heading", () => {
    render(<ConfirmationMessage />);
    expect(screen.getByText("Journey Confirmed!")).toBeInTheDocument();
  });

  it("should render the confirmation message", () => {
    render(<ConfirmationMessage />);
    expect(screen.getByText("Prepare for your cosmic adventure")).toBeInTheDocument();
  });
});
