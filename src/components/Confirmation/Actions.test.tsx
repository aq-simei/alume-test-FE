import { render, screen, fireEvent } from "@testing-library/react";
import { ConfirmationActions } from "./Actions";
import { BrowserRouter as Router } from "react-router-dom";

describe("ConfirmationActions", () => {
  const mockNavigate = vi.fn();

  const renderComponent = () =>
    render(
      <Router>
        <ConfirmationActions
          navigate={mockNavigate}
          userName="JohnDoe"
          userAge={30}
        />
      </Router>
    );

  it("should render the button with correct text", () => {
    renderComponent();
    expect(screen.getByText("Book Another Flight")).toBeInTheDocument();
  });

  it("should call navigate with correct parameters when button is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByText("Book Another Flight"));
    expect(mockNavigate).toHaveBeenCalledWith("/?userName=JohnDoe&userAge=30");
  });
});
