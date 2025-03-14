import { expect, it } from "vitest";
import { render, screen } from "./test-utils"; // Ensure screen is imported

const TestComponent = () => {
  return <div>Hello, World!</div>;
};

describe("TestSetupComponent", () => {
  it("renders without crashing", () => {
    render(<TestComponent />);
    expect(screen.getByText("Hello, World!")).toBeDefined();
  });
});
