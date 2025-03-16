const fillDataFlowFormCompletely = () => {
  cy.get("[data-testid='select-trigger']").click();
  cy.get("[data-testid='select-item-Starlink 4-36 (v1.5)']").click();
  cy.get("input[placeholder='Enter your full name']").type("John Doe");
  cy.get("[data-testid='health-considerations']").click();
  cy.get("input[placeholder='Enter your age']").type("30");
};

describe("Data Flow", () => {
  beforeEach(() => {
    // Mock upcoming request
    cy.intercept("GET", "https://api.spacexdata.com/v4/launches/upcoming", {
      fixture: "upcoming_flights.json",
    }).as("getUpcomingFlights");

    // Mock flight fetching request
    cy.intercept("GET", "https://api.spacexdata.com/v4/launches/1", {
      fixture: "flight_data.json",
    }).as("getFlightData");
  });

  it("Fills the form and checks for rendered data on the success page", () => {
    cy.visit("/");
    // Wait for the mocked requests to complete
    cy.wait("@getUpcomingFlights");

    //  fill form
    fillDataFlowFormCompletely();
    // click buy ticket (has type submit on it)
    cy.get("button[type=submit]").click();
    // Wait mocked flightData request
    cy.wait("@getFlightData");

    // check navigation route: success + flightId
    cy.url().should("include", "/success/1");
    cy.get("h1").should("contain.text", "Journey Confirmed!");
    cy.get("p").should("contain.text", "Prepare for your cosmic adventure");

    // check for data fields
    cy.get("h3").should("contain.text", "Passenger Details");
    cy.get("h3").should("contain.text", "Mission Details");
    cy.get("p").should("contain.text", "Passenger Name");
    cy.get("p").should("contain.text", "Passenger Age");
    cy.get("p").should("contain.text", "Health Status");
    cy.get("p").should("contain.text", "Launch Site");
    // check for data values
    cy.get("p").should("contain.text", "Starlink 4-36 (v1.5)");
    cy.get("p").should("contain.text", "John Doe");
    cy.get("p").should("contain.text", "Special Attention Required");
    cy.get("p").should("contain.text", "30");
    cy.get("p").should("contain.text", "Flight ID");
    cy.get("p").should("contain.text", "1");
  });
});
