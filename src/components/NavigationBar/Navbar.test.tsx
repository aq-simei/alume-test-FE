import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  test("renders Navbar component", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  test("renders Home link", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
