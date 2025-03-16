import { render, screen } from "@testing-library/react";
import { FeaturesSection } from "./FeaturesSection";

describe("FeaturesSection", () => {
  it("renders the section title", () => {
    render(<FeaturesSection />);
    const titleElement = screen.getByText(/Why Choose Space Dash?\?/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the correct number of feature cards", () => {
    render(<FeaturesSection />);

    const featureCards = screen.getByTestId("feature-collection");
    expect(featureCards.children.length).toBe(3);
    expect(featureCards).toBeInTheDocument();
  });

  it("renders each feature with correct title and description", () => {
    render(<FeaturesSection />);
    const features = [
      {
        title: "Cutting-Edge Technology",
        description:
          "Experience space travel with SpaceX's latest spacecraft technology and safety systems.",
      },
      {
        title: "Expert Crew",
        description:
          "Our missions are staffed by experienced astronauts and SpaceX engineers.",
      },
      {
        title: "Flexible Scheduling",
        description:
          "Choose from multiple launch dates to fit your schedule and preferences.",
      },
    ];

    features.forEach((feature) => {
      const titleElement = screen.getByText(feature.title);
      const descriptionElement = screen.getByText(feature.description);
      expect(titleElement).toBeInTheDocument();
      expect(descriptionElement).toBeInTheDocument();
    });
  });
});
