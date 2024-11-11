import useSWR from "swr";
import { AuctionApi } from "../../api/AuctionApi";
import { NavLink } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi2";
import clsx from "clsx";

export default function Favourites() {
  const { data, isLoading, error } = useSWR(
    "/favourites",
    AuctionApi.getFavourites,
  );

  return (
    <NavLink to="/favourites" className="flex items-center gap-4 font-medium">
      <div className="relative">
        <HiOutlineHeart className="stroke-2 text-xl" />
        {data && !isLoading && !error && (
          <div
            className={clsx(
              data.auctions.length > 100 && "w-7",
              "absolute right-0 top-[-50%] flex h-4 w-4 translate-x-[50%] translate-y-[50%] items-center justify-center rounded-full bg-red-500 text-xs text-white",
            )}
          >
            {data.count}
          </div>
        )}
      </div>
      Favourites
    </NavLink>
  );
}
