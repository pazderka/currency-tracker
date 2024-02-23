import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { type ReadonlyURLSearchParams } from "next/navigation";

export const createSearchParamsGetMock = (value: string | null) => ({
  ...jest.requireActual("next/navigation").useSearchParams(),
  get: () => value,
});

export const createSwrResponseMock = <T>(
  data: T | null = null,
  error: string | null = null
) => ({
  ...jest.requireActual("swr"),
  data,
  error: error ? new Error(error) : undefined,
  isLoading: false,
});

export const createRouterMock = (push: jest.Mock, replace: jest.Mock) =>
  ({
    push,
    replace,
  } as unknown as AppRouterInstance);

export const createSearchParamsGetPartialMock = (value: null | string) =>
  ({
    get: jest.fn().mockReturnValue(value),
  } as unknown as ReadonlyURLSearchParams);
