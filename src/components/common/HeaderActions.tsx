import { Button } from "../ui/button";

import React from "react";
import clsx from "clsx";
import { useNavigate } from "react-router";
interface HeaderActionsProps {
  type: string;
  title: string;
  description: string;
  hasButton?: boolean;
  className?: string;
}
const HeaderActions = ({
  className,
  type,
  title,
  description,
  hasButton,
}: HeaderActionsProps) => {
  const navigate = useNavigate()
  return (
    <div
      className={clsx(
        className ? `${className}` : "",
        "hidden gap-4 px-2 md:grid md:py-16 lg:grid-cols-2 lg:px-0",
      )}
    >
      <div>
        <h1 className="text-7xl">
          {(type === "portfolio" && "Welcome to") ||
            (type === "ongoing" && "Dive Into the Action with") ||
            (type === "upcoming" && "Explore")}
        </h1>
        <p className="text-7xl font-bold">{title}</p>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-xl leading-7 text-primary">{description}</p>
        <Button onClick={() => navigate('/addAuction')} className="max-w-[130px] text-white">Start an auction</Button>
      </div>
    </div>
  );
};

export default HeaderActions;
