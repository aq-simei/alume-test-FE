import { useFetchFlight } from "./useFetchFlight";
import { useQuery } from "@tanstack/react-query";
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

describe("useFetchFlight", () => {
  it("should return flight data on success", async () => {
    const mockFlight = {
      id: "1",
      flight_number: 1,
      name: "Flight 1",
      date_utc: "2023-10-01T00:00:00Z",
      upcoming: true,
    };

    (useQuery as Mock).mockReturnValue({
      data: mockFlight,
      isLoading: false,
      isError: false,
    });

    const { result } = renderHook(() => useFetchFlight("1"), {
      wrapper: AllProviders,
    });

    await waitFor(() => !result.current.isLoading);

    expect(result.current.flightData).toEqual(mockFlight);
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle loading state", async () => {
    (useQuery as Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    const { result } = renderHook(() => useFetchFlight("1"), {
      wrapper: AllProviders,
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.flightData).toBe(null);
    expect(result.current.isError).toBe(false);
  });
  it("should handle error state", async () => {
    (useQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    const { result } = renderHook(() => useFetchFlight("1"), {
      wrapper: AllProviders,
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.flightData).toBe(null);
    expect(result.current.isError).toBe(true);
  });
});
