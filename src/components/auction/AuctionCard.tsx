import clsx from "clsx";
import CardImage from "./CardImage";
import CardBody from "./CardBody";
import { AuctionType } from "../../types";
import { useTokenStore } from "../../store/tokenStore";
import { jwtDecode } from "jwt-decode";

interface AuctionCardType {
  auction: AuctionType;
  col: boolean;
  favorite: boolean;
  admin?: boolean;
}

const AuctionCard = ({ col, auction, favorite, admin }: AuctionCardType) => {
  const token = useTokenStore((state) => state.token);
  const jwt = jwtDecode(token);
  const owner = jwt.sub === auction?.email ? true : false;

  return (
    <div
      className={clsx(
        col ? "" : "md:h-[189px] md:max-w-[1216px] md:flex-row md:gap-4",
        "relative flex h-[329px] w-full max-w-[385px] flex-col gap-4 font-onest",
      )}
    >
      <CardImage
        auction={auction}
        owner={owner}
        col={col}
        image={auction?.imageUrls?.[0]}
        favorite={favorite}
      />
      <CardBody admin={admin} owner={owner} col={col} auction={auction} />
    </div>
  );
};

export default AuctionCard;
