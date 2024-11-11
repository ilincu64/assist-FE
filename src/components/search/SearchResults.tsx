import { HiMiniListBullet, HiOutlineSquares2X2 } from "react-icons/hi2";
import { Dispatch, SetStateAction, useState } from "react";
import clsx from "clsx";
import Pagination from "../common/PaginationComponent";
import { AuctionType } from "../../types";
import { useSearchParams } from "react-router-dom";
import OperationsBar from "../common/OperationsBar";
import { ceilMaxPage } from "../../utils/functions";
import AuctionCard from "../auction/AuctionCard";
const viewOptions = [
  {
    type: "grid",
    style: "grid-cols-2",
    icon: <HiOutlineSquares2X2 />,
  },
  {
    type: "list",
    style: "grid-cols-1",
    icon: <HiMiniListBullet />,
  },
];

type Props = {
  data: {
    count: number;
    page: number;
    pageSize: number;
    auctions: AuctionType[];
  };
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

export default function SearchResults({
  data,
  currentPage,
  setCurrentPage,
}: Props) {
  const [viewType, setViewType] = useState<number>(1);
  const [searchParams] = useSearchParams();

  function sortData(type: string | null) {
    if (!data?.auctions) return;

    if (type === "alphabetically") {
      return data.auctions.sort((a, b) => a.title.localeCompare(b.title));
    }

    return data.auctions.sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    );
  }

  console.log(data);

  return (
    <div className="flex h-full flex-col rounded-2xl bg-white px-3 py-4 sm:px-6 sm:py-8">
      <div className="mb-6">
        <OperationsBar
          viewOptions={viewOptions}
          setViewType={setViewType}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <div className={clsx(viewOptions[viewType].style, "mb-6 grid gap-14")}>
        {sortData(searchParams.get("sort"))?.map((auction) => (
          <AuctionCard
            key={auction.id}
            col={false}
            auction={auction}
            favorite
          />
        ))}
      </div>

      <div className="mt-auto border-t pt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={ceilMaxPage(data.count, 4)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
