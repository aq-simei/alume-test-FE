const baseURL = "";

const fillFormCompletely = () => {
  cy.get("[data-testid='select-trigger']").click();
  cy.get("[data-testid='select-item-Starlink 4-36 (v1.5)']").click();
  cy.get("input[placeholder='Enter your full name']").type("John Doe");
  cy.get("[data-testid='health-considerations']").click();
  cy.get("input[placeholder='Enter your age']").type("30");
};

describe("Home Page Flow", () => {
  beforeEach(() => {
    // Mock the request for fetching upcoming flights
    cy.intercept("GET", "https://api.spacexdata.com/v4/launches/upcoming", {
      fixture: "upcoming_flights.json",
    }).as("getUpcomingFlights");

    // Mock the request for fetching a specific flight
    cy.intercept("GET", "https://api.spacexdata.com/v4/launches/1", {
      fixture: "flight_data.json",
    }).as("getFlightData");
  });

  it("Shows validation errors for form fields", () => {
    cy.visit("/");
    cy.wait("@getUpcomingFlights");

    // submit incomplete form
    cy.get("button[type=submit]").click();

    // check for validation errors messages
    cy.get("p").should("contain.text", "Flight id required");
    cy.get("p").should("contain.text", "Name is required");
    cy.get("p").should("contain.text", "Age is required");
  });
  it("Shows custom validation errors for age", () => {
    cy.visit("/");
    // Wait for the mocked upcomingFlights
    cy.wait("@getUpcomingFlights");

    // enter invalid age
    cy.get("input[placeholder='Enter your age']").type("16");

    cy.get("button[type=submit]").click();
    cy.get("p").should("contain.text", "Flight id required");
    cy.get("p").should("contain.text", "Name is required");
    cy.get("p").should("contain.text", "You must be at least 18 years old.");
  });

  it("Fill and submit the form and then navigates to success page", () => {
    cy.visit("/");
    // Wait for the mocked requests to complete
    cy.wait("@getUpcomingFlights");

    // Interactions: interact with form elements
    cy.get("input").should("have.length", 3);
    fillFormCompletely();
    // click buy ticket
    cy.get("button[type=submit]").click();
    // Wait for the mocked request to complete
    cy.wait("@getFlightData");

    // Assertions: check for navigation to success page
    cy.url().should("include", "/success/1");
    cy.get("h1").should("contain.text", "Journey Confirmed!");
    cy.get("p").should("contain.text", "Prepare for your cosmic adventure");
  });
});
