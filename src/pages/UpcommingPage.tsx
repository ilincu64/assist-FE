import React from "react";
import { UpcomingNavigator } from "../components/auction/UpcomingNavigator";
import PortfolioMainContainer from "../components/portfolio/PortfolioMainContainer";

const UpcommingPage = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4 p-4 pt-8 font-onest sm:p-0 sm:pt-8">
      <UpcomingNavigator />
      <div className="flex h-full w-full flex-col p-4 sm:grid sm:grid-cols-2 sm:p-0">
        <p className="w-full text-6xl">
          Explore <p className="font-bold">Upcoming Auction</p>
        </p>
        <div className="flex w-full flex-col gap-4 text-justify">
          <p>
            From rare collectibles to exclusive items, find out what’s on the
            horizon and prepare to place your bids.
          </p>
          <p>
            Don’t miss your chance to score unique treasures and amazing deals.
            Mark your calendar and get ready for the excitement!
          </p>
        </div>
      </div>
      <PortfolioMainContainer />
    </div>
  );
};

export default UpcommingPage;
