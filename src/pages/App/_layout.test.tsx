import { AppLayout } from "./_layout";
import { render, screen } from "@/lib/test-utils/test-utils";

describe("AppLayout", () => {
  it("renders the Navbar and footer", () => {
    render(<AppLayout />);

    // Check if Navbar is rendered
    expect(screen.getByRole("navigation")).toBeDefined();
    expect(screen.getByTestId("navbar")).toBeDefined();
    // Check if background stars are rendered
    expect(screen.getByTestId('background-stars')).toBeDefined();

    // Check if footer is rendered
    expect(screen.getByTestId("app-footer")).toBeDefined();
    expect(screen.getByText("Space Dash")).toBeDefined ();
    expect(screen.getByText(/Space Dash. All rights reserved. In partnership with SpaceX./i)).toBeDefined();
  });
});
