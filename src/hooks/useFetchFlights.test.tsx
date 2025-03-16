import { useFetchFlights } from "./useFetchFlights";
import { useQuery } from "@tanstack/react-query";
import { UpcomingFlight } from "@/@types/UpcomingFlight";
import { renderHook, waitFor } from "@testing-library/react";
import { AllProviders } from "@/lib/test-utils/test-utils";
import { Mock } from "vitest";

vi.mock(import("@tanstack/react-query"), async (importOriginal) => {
  const reactQuery = await importOriginal();
  return {
    ...reactQuery,
    useQuery: vi.fn(),
  };
});

describe("useFetchFlights", () => {
  it("should return flight data on success", async () => {
    const mockFlights: UpcomingFlight[] = [
      {
        id: "1",
        flight_number: 1,
        name: "Flight 1",
        date_utc: "2023-10-01T00:00:00Z",
        upcoming: true,
      } as UpcomingFlight,
      // ...other mock flights...
    ];

    (useQuery as Mock).mockReturnValue({
      data: mockFlights,
      isSuccess: true,
      isError: false,
    });

    const { result } = renderHook(() => useFetchFlights(), {
      wrapper: AllProviders,
    });

    waitFor(() => result.current.isSuccess);

    expect(result.current.flightData).toEqual([
      {
        id: "1",
        number: 1,
        name: "Flight 1",
        date_utc: "2023-10-01T00:00:00Z",
      },
    ]);
    expect(result.current.isError).toBe(false);
    expect(result.current.isSuccess).toBe(true);
  });

  it("should return an error state on failure", async () => {
    (useQuery as Mock).mockReturnValue({
      data: null,
      isSuccess: false,
      isError: true,
    });

    const { result } = renderHook(() => useFetchFlights(), {
      wrapper: AllProviders,
    });

    await waitFor(() => result.current.isError);

    expect(result.current.isError).toBe(true);
    expect(result.current.flightData).toEqual([]);
    expect(result.current.isSuccess).toBe(false);
  });
});
