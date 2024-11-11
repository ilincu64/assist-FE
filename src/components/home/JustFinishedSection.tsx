import { useAuctionsByStatus } from "../../api/AuctionApi";
import { AuctionType } from "../../types";
import AuctionCard from "../auction/AuctionCard";

export default function JustFinishedSection() {
  const { data } = useAuctionsByStatus("FINISHED");
  return (
    <div className="flex w-full flex-col gap-4 px-8 lg:gap-6">
      {data === undefined ? (
        <></>
      ) : (
        <>
          <h2 className="text-2xl font-medium md:text-3xl">Just finished</h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {data?.auctions
              ?.map((auction: AuctionType) => (
                <AuctionCard
                  key={auction.id}
                  col
                  auction={auction}
                  favorite={false}
                />
              ))
              .slice(0, 3)}
          </div>
        </>
      )}
    </div>
  );
}
