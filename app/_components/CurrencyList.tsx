"use client";

import useSWR from "swr";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import CurrencyListItem from "@/_components/CurrencyListItem";
import { fetcher, getImgPath } from "@/_utils/fetcher";
import { type ListItemInterface } from "@/_types";
import { URLS } from "@/_urls";

export default function CurrencyList() {
  const searchParams = useSearchParams();
  const [filteredData, setFilteredData] = useState([]);
  const { data, error, isLoading } = useSWR(URLS.currencyDataUrl(), fetcher);
  const originalQuery = searchParams.get("query");
  const query = originalQuery?.trim().toLowerCase() ?? "";

  useEffect(() => {
    // Prevent running twice because of subsequent rerender
    if (!data) {
      return;
    }

    const searchResults = data.fx.filter(
      (fx: ListItemInterface) =>
        fx.currency.toLowerCase().includes(query) ||
        fx.nameI18N?.toLowerCase().includes(query)
    );
    setFilteredData(searchResults);
  }, [originalQuery, data, query]);

  const currencySection = isLoading ? (
    <div>Data is loading...</div>
  ) : (
    filteredData.map((fx: ListItemInterface, index: number) => (
      <CurrencyListItem
        listItem={fx}
        imgPath={getImgPath(fx.currency)}
        key={index}
      />
    ))
  );
  const errorSection = error && error.message;

  return (
    <article>
      {errorSection}
      {currencySection}
    </article>
  );
}
