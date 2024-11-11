import { Link } from "react-router-dom";
import { useAuctionsByStatus } from "../../api/AuctionApi";
import { AuctionType } from "../../types";
import AuctionCard from "../auction/AuctionCard";

export default function JustStartedSection() {
  const { data } = useAuctionsByStatus("ACCEPTED");

  return (
    <div className="flex w-full flex-col gap-4 px-8 lg:gap-6">
      {data === undefined ? (
        <></>
      ) : (
        <>
          <h2 className="text-2xl font-medium md:text-3xl">Just started</h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {data?.auctions
              ?.map((auction: AuctionType) => (
                <AuctionCard
                  key={auction.id}
                  col={false}
                  auction={auction}
                  favorite={false}
                />
              ))
              .slice(0, 4)}
          </div>
          <Link to="/" className="self-end border-b border-primary">
            View all latest
          </Link>
        </>
      )}
    </div>
  );
}
