import { render, screen } from "@testing-library/react";
import { HomeHero } from "./Hero";

describe("HomeHero", () => {
  it("renders the hero section with correct text and icons", () => {
    render(<HomeHero />);

    // Check for the main heading (only one heading ad it is the Buckle uo text)
    expect(screen.getByRole("heading")).toBe(
      screen.getByText("Buckle Up For Your Next Space Adventure")
    );
    expect(
      screen.getByText("Buckle Up For Your Next Space Adventure")
    ).toBeInTheDocument();

    // Check for the paragraph text
    expect(
      screen.getByText(/Experience the thrill of space travel/i)
    ).toBeInTheDocument();
  });
});
