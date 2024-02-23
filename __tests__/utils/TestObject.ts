import { type ListItemInterface } from "@/_types";

export const fxMockResponse: Readonly<{
  fx: ReadonlyArray<ListItemInterface>;
}> = {
  fx: [
    { currency: "USD", nameI18N: "US Dollar" },
    { currency: "EUR", nameI18N: "Euro" },
  ],
};

export const fxMockResponseWithRate: Readonly<ListItemInterface> = {
  currency: "USD",
  nameI18N: "US Dollar",
  exchangeRate: {
    buy: 1,
  },
};

export const fxMockResponseWithoutRate: Readonly<ListItemInterface> = {
  currency: "USD",
};
