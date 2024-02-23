import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import fetchMock from "fetch-mock-jest";

import CurrencyList from "@/_components/CurrencyList";
import { URLS } from "@/_urls";
import { createSearchParamsGetMock, createSwrResponseMock } from "../utils";
import { fxMockResponse } from "../utils/TestObject";

jest.mock("swr");
jest.mock("next/navigation");
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

describe("CurrencyList", () => {
  beforeEach(() => {
    const mockedUseSearchParams = useSearchParams as jest.MockedFunction<
      typeof useSearchParams
    >;
    const mockedSwrResponse = useSWR as jest.MockedFunction<typeof useSWR>;
    mockedUseSearchParams.mockImplementation(() =>
      createSearchParamsGetMock(null)
    );
    mockedSwrResponse.mockReturnValue(createSwrResponseMock(fxMockResponse));
    fetchMock.get(URLS.currencyDataUrl(), fxMockResponse);
  });

  afterEach(() => {
    fetchMock.mockReset();
  });

  test("displays correct data - no search query", async () => {
    const mockedUseSearchParams = useSearchParams as jest.MockedFunction<
      typeof useSearchParams
    >;
    mockedUseSearchParams.mockImplementation(() =>
      createSearchParamsGetMock(null)
    );
    await act(async () => {
      render(<CurrencyList />);
    });

    const usdElement = screen.getByText("US Dollar (USD)");
    const euroElement = screen.getByText("Euro (EUR)");

    expect(usdElement).toBeInTheDocument();
    expect(euroElement).toBeInTheDocument();
  });

  test("displays correct data - search query provided", async () => {
    const mockedUseSearchParams = useSearchParams as jest.MockedFunction<
      typeof useSearchParams
    >;
    mockedUseSearchParams.mockImplementation(() =>
      createSearchParamsGetMock("US Dollar")
    );
    await act(async () => {
      render(<CurrencyList />);
    });

    const article = screen.getByRole("article");
    const usdElement = screen.getByText("US Dollar (USD)");
    expect(usdElement).toBeInTheDocument();
    expect(article.children.length).toBe(1);
  });

  test("displays correct data - error occurred", async () => {
    const mockedSwrResponse = useSWR as jest.MockedFunction<typeof useSWR>;
    mockedSwrResponse.mockReturnValue(
      createSwrResponseMock(null, "Something went wrong")
    );

    await act(async () => {
      render(<CurrencyList />);
    });

    const error = screen.getByText("Something went wrong");
    expect(error).toBeInTheDocument();
  });
});
