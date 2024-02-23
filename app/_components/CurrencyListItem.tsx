import Image from "next/image";

import { type ListItemInterface } from "@/_types";

interface ListItemPropsInterface {
  listItem: ListItemInterface;
  imgPath: string;
}

export default function CurrencyListItem({
  listItem,
  imgPath,
}: ListItemPropsInterface) {
  const { currency, nameI18N } = listItem;
  const rate = listItem.exchangeRate?.buy;

  const itemEurRate = rate ? (
    <div className="text-right">{rate} EUR</div>
  ) : (
    <>Not available</>
  );
  const itemDescription = nameI18N ? (
    <>
      {nameI18N} ({currency})
    </>
  ) : (
    currency
  );

  return (
    <>
      <section className="border border-black my-2 py-4 px-2 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image
            className="w-auto h-auto"
            src={imgPath}
            alt={currency}
            width={50}
            height={50}
          />
          {itemDescription}
        </div>
        {itemEurRate}
      </section>
    </>
  );
}
