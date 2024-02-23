import { URLS } from "@/_urls";

export const fetcher = async (url: string) => {
  const errorMessage = "Something went wrong, please try again later.";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Probably a network error
      throw new Error(errorMessage);
    }
    return await response.json();
  } catch {
    throw new Error(errorMessage);
  }
};

export const getImgPath = (currency: string) => {
  return URLS.currencyFlagUrl(currency.slice(0, -1).toLowerCase());
};
