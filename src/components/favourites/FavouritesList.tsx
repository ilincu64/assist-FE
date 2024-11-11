import { ReactNode } from "react";
import clsx from "clsx";

import Loader from "../common/Loader";

import { AuctionType } from "../../types";
import AuctionCard from "../auction/AuctionCard";

type Props = {
  error: string;
  isLoading: boolean;
  data: AuctionType[] | undefined;
  viewType: number;
  viewOptions: { type: string; style: string; icon: ReactNode }[];
};

export default function FavouritesList({
  error,
  isLoading,
  data,
  viewType,
  viewOptions,
}: Props) {
  if (isLoading || data === undefined) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        Something went wrong...
      </div>
    );
  }

  return (
    <div className={clsx(viewOptions[viewType].style, "mb-6 grid gap-14")}>
      {data.map((auction) => (
        <AuctionCard key={auction.id} col={false} auction={auction} favorite />
      ))}
    </div>
  );
}
