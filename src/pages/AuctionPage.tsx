import { useLocation, useParams } from "react-router";
import NavigationComponent from "../components/auction/NavigationComponent";

import { useAuctionById } from "../api/AuctionApi";
import Loader from "../components/common/Loader";
import Recomandations from "../components/auction/Recomandations";
import BidForm from "../components/auction/BidForm";
import { CreditCard, Headphones, Star } from "lucide-react";
import {
  notLoadedImage,
  undefinedAuction,
} from "../components/common/TestData";

const AuctionPage = () => {
  const { id } = useParams();
  const { data: auction } = useAuctionById(id as string);
  const location = useLocation();
  const { state } = location ?? {};

  const prev = () => {
    if (state === null) {
      return true;
    }
    if (state.previous === "/") {
      return true;
    }
    return false;
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 bg-bgWhite p-4 font-onest">
      <NavigationComponent home={prev()} />
      {auction === undefined ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <></>
      )}
      <div className="flex h-full w-full flex-col gap-4 pt-4 md:flex-row">
        <div className="flex h-full max-h-[903px] w-full max-w-[729px] flex-col justify-center gap-4 md:grid md:grid-cols-3 md:grid-rows-3">
          <div className="relative col-span-3 row-span-2 flex h-full w-full">
            <img
              src={
                auction?.imageUrls[0] ? auction?.imageUrls[0] : notLoadedImage
              }
              alt=""
              className="rounded-lg object-cover"
              height="100%"
              width="100%"
            />
          </div>
          <div className="relative flex h-full w-full">
            <img
              src={
                auction?.imageUrls[1] ? auction?.imageUrls[1] : notLoadedImage
              }
              alt=""
              className="rounded-lg object-cover"
              height="100%"
              width="100%"
            />
          </div>
          <div className="relative flex h-full w-full">
            <img
              src={
                auction?.imageUrls[2] ? auction?.imageUrls[2] : notLoadedImage
              }
              alt=""
              className="rounded-lg object-cover"
              height="100%"
              width="100%"
            />
          </div>
          <div className="relative flex h-full w-full">
            <img
              src={
                auction?.imageUrls[3] ? auction?.imageUrls[3] : notLoadedImage
              }
              alt=""
              className="rounded-lg object-cover"
              height="100%"
              width="100%"
            />
          </div>
        </div>
        <div className="flex h-full max-h-[907px] w-full max-w-[520px] flex-col gap-8">
          <BidForm
            auctionId={id as string}
            auction={auction ? auction : undefinedAuction}
          />
          <div className="flex flex-col gap-4 rounded-xl bg-white p-4">
            <p className="font-bold">Description</p>
            <p>{auction?.descriptionDetails}</p>
            <div className="broder-bgWhite flex flex-col border-t-2 pt-4">
              <p className="pb-4 font-bold">Shipping</p>
              <div className="flex flex-row gap-2">
                <p className="font-bold">Courier: </p>
                <p className="text-gray-600"> 2 - 4 days, free shipping</p>
              </div>
              <div className="flex flex-row gap-2">
                <p className="font-bold">Local shipping: </p>
                <p className="text-gray-600"> up to one week, $19.00</p>
              </div>
              <div className="flex flex-row gap-2">
                <p className="font-bold">Unishop Global Export: </p>
                <p className="text-gray-600"> 3 - 4 days, $39.00</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-4">
                <Star />
                <p>Item and seller verified</p>
              </div>
              <div className="flex flex-row gap-4">
                <Headphones />
                <p>24/7 Customer support</p>
              </div>
              <div className="flex flex-row gap-4">
                <CreditCard />
                <p>24/7 Customer support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Recomandations id={id as string} />
    </div>
  );
};

export default AuctionPage;
