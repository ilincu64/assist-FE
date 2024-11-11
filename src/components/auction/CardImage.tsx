import clsx from "clsx";
import { Heart } from "lucide-react";
import { useRef, useState } from "react";
import { AuctionType } from "../../types";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { AuctionApi } from "../../api/AuctionApi";
import useSWR from "swr";

interface CardImageProps {
  col: boolean;
  image: string;
  owner: boolean;
  favorite: boolean;
  auction: AuctionType;
}

const CardImage = ({
  col,
  image,
  owner,
  favorite,
  auction,
}: CardImageProps) => {
  const [isAddedToFavourites, setIsAddedToFavourites] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const isPressed = useRef<boolean>(false);
  // const url = `?page_size=${4}&page=${1}${searchParams.get("status") ? `&status=${searchParams.get("status")?.toUpperCase()}` : ""}`;
  const { data, isLoading, error, mutate } = useSWR(
    `/favourites`,
    AuctionApi.getFavourites,
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNavigate = () => {
    navigate(`/auctions/${auction?.id}`, {
      state: {
        previous: pathname,
      },
    });
  };

  function handleFavourites(e: any) {
    e.stopPropagation();
    if (!data || isLoading || error) return;

    if (
      !data.auctions.find((favourite) => favourite.id === auction.id) &&
      !isPressed.current
    ) {
      isPressed.current = true;
      AuctionApi.addToFavourites(auction.id).then(() => {
        mutate({ ...data, auctions: [...data.auctions, auction] });
        setIsAddedToFavourites(true);
        isPressed.current = false;
      });
    }

    if (
      data.auctions.find((favourite) => favourite.id === auction.id) &&
      !isPressed.current
    ) {
      isPressed.current = true;
      AuctionApi.deleteFromFavourites(auction.id).then(() => {
        mutate({
          ...data,
          auctions: [
            ...data.auctions.filter((favourite) => favourite.id !== auction.id),
          ],
        });
        setIsAddedToFavourites(false);
        isPressed.current = false;
      });
    }
  }

  return (
    <div
      className={clsx(
        col ? "" : "md:h-[189px] md:w-[236px]",
        "relative flex h-[180px] w-full max-w-[384px] cursor-pointer",
      )}
      onClick={handleNavigate}
    >
      <img
        src={image}
        alt=""
        className={clsx(
          col ? "" : "md:h-[189px]",
          "h-[180px] overflow-hidden rounded-lg object-cover",
        )}
        width="100%"
      />
      {data && (
        <Heart
          onClick={handleFavourites}
          className={`absolute right-2 top-2 h-8 w-8 cursor-pointer rounded-lg bg-gray-200 p-2 hover:bg-gray-300 ${
            owner || auction?.status === "FINISHED" ? "hidden" : ""
          }`}
          style={
            isAddedToFavourites ||
            data.auctions.find((favourite) => favourite.id === auction.id)
              ? { fill: "red", stroke: "none" }
              : {}
          }
        />
      )}
    </div>
  );
};

export default CardImage;
