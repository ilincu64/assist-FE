import React, { useEffect, useState } from "react";
import { AuctionType } from "../../types";
import { Share2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import api from "../../config/api";
import toast from "react-hot-toast";

interface BidFormProps {
  auction: AuctionType;
  auctionId: string;
}

const BidForm = ({ auction, auctionId }: BidFormProps) => {
  const [price, setPrice] = useState<number>(auction.startingPrice);

  const handleSubmitBid = () => {
    auction.startingPrice = price;
    setPrice(auction.startingPrice);
    api
      .post(`/auctions/bids`, { auctionId, amount: price })
      .then((data) => {
        if (data) {
          toast.success(data.data);
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  useEffect(() => {
    setPrice(auction.startingPrice);
  }, [auction.startingPrice]);

  return (
    <div className="h-full w-full gap-4 rounded-xl border-2 border-gray-200 bg-white p-4 font-onest sm:p-8">
      <div className="mb-4 flex w-full flex-col justify-between sm:flex-row">
        <p>Closes in 3h:34m</p>
        <div className="flex flex-row gap-4">
          <p>Share</p>
          <Share2 />
        </div>
      </div>
      <h1 className="pb-4 text-2xl sm:text-4xl">{auction.title}</h1>
      <div className="h-full w-full">
        <p className="font-bold text-orange-400">
          Your bid was overthrown by 100$
        </p>
        <div className="mb-4 flex flex-row items-center gap-1">
          <p className="border-r-2 border-gray-400 pr-4 text-gray-400">
            Latest bid
          </p>
          <p className="p-2 text-lg font-bold">${price}</p>
        </div>
        <div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <p
                className="cursor-pointer rounded-lg border-2 border-gray-200 px-4"
                onClick={() => setPrice(price + 10)}
              >
                ${price + 10}
              </p>
              <p
                className="cursor-pointer rounded-lg border-2 border-gray-200 px-4"
                onClick={() => setPrice(price + 20)}
              >
                ${price + 20}
              </p>
              <p
                className="cursor-pointer rounded-lg border-2 border-gray-200 px-4"
                onClick={() => setPrice(price + 30)}
              >
                ${price + 30}
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex w-full">
                <Input
                  type="number"
                  placeholder={`${price} or up`}
                  className="pl-12"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
                <p className="absolute left-0 top-0 border-r-2 border-gray-100 p-2">
                  $$
                </p>
              </div>
              <Button variant="outline" onClick={handleSubmitBid}>
                Place Bid
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidForm;
