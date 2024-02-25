interface ListItemEchangeRateInterface {
  buy: number;
}

export interface ListItemInterface {
  currency: string;
  nameI18N?: string;
  exchangeRate?: ListItemEchangeRateInterface;
}
