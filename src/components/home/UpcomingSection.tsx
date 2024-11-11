import { Link } from "react-router-dom";
import { AuctionType } from "../../types";
import { useAuctionsByStatus } from "../../api/AuctionApi";
import Loader from "../common/Loader";
import AuctionCard from "../auction/AuctionCard";

export default function UpcomingSection() {
  const { data } = useAuctionsByStatus("ACCEPTED");

  return (
    <div className="m-auto flex h-full w-full flex-col gap-6 rounded-b-[16px] rounded-t-[48px] bg-bgWhite px-8 pb-4 pt-8">
      {data === undefined ? (
        <div className="flex h-screen justify-center">
          <Loader />
        </div>
      ) : (
        <>
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

          <div className="flex items-center justify-between">
            <p className="">Take a look into the coolest recent auctions!</p>
            <Link to="/" className="border-b border-primary">
              View all upcoming!
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
