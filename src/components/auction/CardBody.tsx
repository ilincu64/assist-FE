import clsx from "clsx";
import { Dot } from "lucide-react";
import React from "react";
import CardStatus from "./CardStatus";
import { AuctionType } from "../../types";
import CardButtons from "./CardButtons";
import { useNavigate } from "react-router";

interface CardBodyProps {
  col: boolean;
  auction: AuctionType;
  owner: boolean;
  admin?: boolean;
}

const CardBody = ({ col, auction, owner, admin }: CardBodyProps) => {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <CardStatus
        status={auction?.status}
        startPrice={auction?.startingPrice}
        startingTime={auction?.startTime}
      />
      <p className="text-2xl font-bold">{auction?.title}</p>
      <p className={clsx(col ? "hidden" : "md:flex", "hidden")}>
        {auction?.descriptionDetails}
      </p>
      <div className="flex items-center justify-start gap-2 pt-4 font-thin">
        <p>{auction?.firstName}</p>
        <p>{auction?.lastName}</p>
        <Dot />
        <p>{new Date().toDateString()}</p>
      </div>
      <div className={clsx(col ? "hidden" : "sm:flex", "hidden")}>
        <CardButtons
          admin={admin}
          owner={owner}
          id={auction?.id}
          status={auction?.status}
          email={auction?.email}
        />
      </div>
    </div>
  );
};

export default CardBody;
