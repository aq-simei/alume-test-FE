import { Home } from "@/pages/App/Home/Home";
import { render, screen } from "../../../lib/test-utils/test-utils";

describe("Home Component Visual Checks", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("Contains page title and description", () => {
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Buckle Up For Your Next Space Adventure"
    );
    expect(
      screen.getByText(
        "Experience the thrill of space travel with our exclusive SpaceX partnership. Select your destination and embark on the journey of a lifetime."
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Why Choose Space Dash?"
    );
  });

  it("Contains the booking form", () => {
    expect(screen.getByText("Book Your Space Flight")).toBeInTheDocument();
    expect(screen.getByText("Full Name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByTestId("select-trigger")).toHaveTextContent(
      "Pick your mission"
    );
  });

  it("Contains the features section", () => {
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Why Choose Space Dash?"
    );
    expect(
      screen.getByRole("heading", { level: 4, name: /Expert Crew/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 4,
        name: /Cutting-Edge Technology/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 4, name: /Flexible Scheduling/i })
    ).toBeInTheDocument();
  });
});
