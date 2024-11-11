import { useAuctionsByStatus } from "../../api/AuctionApi";
import { AuctionType } from "../../types";
import Loader from "../common/Loader";
import AuctionCard from "./AuctionCard";

interface RecomandationsProps {
  id?: string;
}

const Recomandations = ({ id }: RecomandationsProps) => {
  const { data } = useAuctionsByStatus("ONGOING");

  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-xl bg-white p-4">
      {data === undefined ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-row items-center justify-between">
        <p className="text-3xl">We also recommend</p>
        <a className="text-primary underline" href="/">
          View all recommendations
        </a>
      </div>
      <div className="flex h-full w-full flex-col gap-16 pb-12 md:flex-row md:gap-4 md:pb-4">
        {data?.auctions
          ?.filter((auction: AuctionType) => auction.id !== Number(id))
          .map((auction: AuctionType) => (
            <AuctionCard
              key={auction.id}
              col
              auction={auction}
              favorite={false}
            />
          ))
          .slice(0, 3)}
      </div>
    </div>
  );
};

export default Recomandations;
