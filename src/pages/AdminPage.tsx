import React, { useState } from "react";
import { useAuctionsByStatus } from "../api/AuctionApi";
import AuctionCard from "../components/auction/AuctionCard";
import { AuctionType } from "../types";
import clsx from "clsx";
import Pagination from "../components/common/PaginationComponent";
import { ceilMaxPage } from "../utils/functions";
import { HiMiniListBullet, HiOutlineSquares2X2 } from "react-icons/hi2";

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

const AdminPage = () => {
  const { data } = useAuctionsByStatus("PENDING");
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const [viewType, setViewType] = useState(1);
  return (
    <div className="flex h-auto w-full flex-1 flex-col rounded-2xl bg-white p-4">
      <div className={clsx(viewOptions[viewType].style, "grid gap-10 p-6")}>
        {data?.auctions?.map((auction: AuctionType) => (
          <AuctionCard
            auction={auction}
            col={false}
            key={auction.id}
            favorite={false}
            admin
          />
        ))}
      </div>
      <div className="mt-auto">
        <Pagination
          totalPages={ceilMaxPage(data?.count, 5)}
          currentPage={currentPaginationPage}
          onPageChange={setCurrentPaginationPage}
        />
      </div>
    </div>
  );
};

export default AdminPage;
