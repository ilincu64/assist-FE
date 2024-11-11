import clsx from "clsx";
import { useState } from "react";
import { HiMiniListBullet, HiOutlineSquares2X2 } from "react-icons/hi2";
import Pagination from "../common/PaginationComponent";
import { ceilMaxPage } from "../../utils/functions";
import { useAuctions, usePortfolioAuctions } from "../../api/AuctionApi";
import AuctionCard from "../auction/AuctionCard";
import { useSearchParams } from "react-router-dom";
import OperationsBar from "../common/OperationsBar";
import Loader from "../common/Loader";
import { AuctionType } from "../../types";

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

const PortfolioMainContainer = () => {
  const MAX_AUCTIONS_PER_PAGE = 4;
  const [searchParams] = useSearchParams();
  // const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const status = searchParams.get("filter");

  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const [viewType, setViewType] = useState(1);

  const { data, isLoading } = usePortfolioAuctions(
    currentPaginationPage,
    MAX_AUCTIONS_PER_PAGE,
  );

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  // to do fetch logic based on pages

  return (
    <div className="flex h-auto w-full flex-1 flex-col rounded-2xl bg-white p-4">
      <OperationsBar
        viewOptions={viewOptions}
        setViewType={setViewType}
        setCurrentPage={setCurrentPage}
      />

      <div className={clsx(viewOptions[viewType].style, "grid gap-10 p-6")}>
        {data?.auctions?.map((auction: AuctionType) => (
          <AuctionCard
            auction={auction}
            col={false}
            key={auction.id}
            favorite={false}
          />
        ))}
      </div>
      {data && (
        <div className="mt-auto">
          <Pagination
            totalPages={ceilMaxPage(data?.count, MAX_AUCTIONS_PER_PAGE)}
            currentPage={currentPaginationPage}
            onPageChange={setCurrentPaginationPage}
          />
        </div>
      )}
    </div>
  );
};

export default PortfolioMainContainer;
