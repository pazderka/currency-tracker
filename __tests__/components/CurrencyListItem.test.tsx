import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CurrencyListItem from "../../app/_components/CurrencyListItem";
import {
  fxMockResponseWithRate,
  fxMockResponseWithoutRate,
} from "../utils/TestObject";

describe("CurrencyListItem", () => {
  test("renders properly - rate and name available", () => {
    render(
      <CurrencyListItem
        imgPath="/flags/us.png"
        listItem={fxMockResponseWithRate}
      />
    );

    const rate = screen.getByText("1 EUR");
    const name = screen.getByText("US Dollar (USD)");
    expect(rate).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });

  test("renders properly - rate and name not available", () => {
    render(
      <CurrencyListItem
        imgPath="/flags/us.png"
        listItem={fxMockResponseWithoutRate}
      />
    );

    const notAvailable = screen.getByText("Not available");
    const currency = screen.getByText("USD");
    expect(notAvailable).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
  });
});
