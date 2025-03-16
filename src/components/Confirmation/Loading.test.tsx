import { render, screen } from "@testing-library/react";
import { ConfirmationLoading } from "./Loading";

describe("ConfirmationLoading", () => {
  it("should render the loading spinner", () => {
    render(<ConfirmationLoading />);
    expect(screen.getByTestId("confirmation-loading-spinner")).toBeInTheDocument();
  });

  it("should render the loading message", () => {
    render(<ConfirmationLoading />);
    expect(screen.getByText("Preparing your space journey...")).toBeInTheDocument();
  });
});
