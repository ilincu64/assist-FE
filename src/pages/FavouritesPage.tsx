import { useState } from "react";
import useSWR from "swr";
import { HiMiniListBullet, HiOutlineSquares2X2 } from "react-icons/hi2";

import OperationsBar from "../components/common/OperationsBar";
import FavouritesList from "../components/favourites/FavouritesList";
import Pagination from "../components/common/PaginationComponent";

import { AuctionApi } from "../api/AuctionApi";
import { useSearchParams } from "react-router-dom";
import { ceilMaxPage } from "../utils/functions";

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

export default function FavouritesPage() {
  const [viewType, setViewType] = useState<number>(1);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isLoading, error } = useSWR(
    `/favourites`,
    AuctionApi.getFavourites,
  );

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

  return (
    <div className="h-auto w-full px-4 py-4 sm:py-8 md:px-8 lg:px-12">
      <div className="flex h-full w-full flex-col rounded-2xl bg-white px-6 py-8">
        <div className="mb-6">
          <OperationsBar
            viewOptions={viewOptions}
            setViewType={setViewType}
            setCurrentPage={setCurrentPage}
          />
        </div>

        <FavouritesList
          error={error}
          isLoading={isLoading}
          data={sortData(searchParams.get("sort"))}
          viewOptions={viewOptions}
          viewType={viewType}
        />

        {data && data.auctions.length > 0 && (
          <div className="mt-auto border-t pt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={ceilMaxPage(data.count, 4)}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
