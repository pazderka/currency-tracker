import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/_components/Navbar";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { createRouterMock, createSearchParamsGetPartialMock } from "../utils";

describe("Navbar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
    const mockedUsePathname = usePathname as jest.MockedFunction<
      typeof usePathname
    >;

    mockedUseRouter.mockReturnValue(createRouterMock(jest.fn(), jest.fn()));
    mockedUsePathname.mockReturnValue("/");
  });

  test("renders properly - without query parameter", () => {
    const mockedUseSearchParams = useSearchParams as jest.MockedFunction<
      typeof useSearchParams
    >;

    mockedUseSearchParams.mockReturnValue(
      createSearchParamsGetPartialMock(null)
    );

    render(<Navbar />);

    const searchInput = screen.getByLabelText("Search") as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toBe("");
  });

  test("renders properly - with query parameter", () => {
    const mockedUseSearchParams = useSearchParams as jest.MockedFunction<
      typeof useSearchParams
    >;

    mockedUseSearchParams.mockReturnValue(
      createSearchParamsGetPartialMock("dollar")
    );

    render(<Navbar />);

    const searchInput = screen.getByLabelText("Search") as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.value).toBe("dollar");
  });

  test("method onSearchChange updates router properly", () => {
    const mockPush = jest.fn();
    const mockReplace = jest.fn();

    const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
    mockedUseRouter.mockReturnValue(createRouterMock(mockPush, mockReplace));

    render(<Navbar />);

    const searchInput = screen.getByLabelText("Search");
    fireEvent.change(searchInput, { target: { value: "test" } });
    fireEvent.change(searchInput, { target: { value: "" } });

    expect(mockPush).toHaveBeenNthCalledWith(1, "?query=test");
    expect(mockReplace).toHaveBeenNthCalledWith(1, "/");
  });

  test("scroll updates isSticky state properly", () => {
    render(<Navbar />);

    const blackHeaderAfterScroll = screen.getByText("Search").closest("header");
    expect(blackHeaderAfterScroll).not.toHaveClass("sticky");

    fireEvent.scroll(window, { target: { scrollY: 100 } });
    const blackHeaderBeforeScroll = screen
      .getByText("Search")
      .closest("header");
    expect(blackHeaderBeforeScroll).toHaveClass("sticky");
  });
});
