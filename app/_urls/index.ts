export const URLS: Readonly<Record<string, (...args: string[]) => string>> = {
  currencyFlagUrl: (flagShortcut: string) => `/flags/${flagShortcut}.png`,
  currencyDataUrl: () => "/fx.json",
};
