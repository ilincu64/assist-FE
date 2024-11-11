import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function HomeHeader() {
  return (
    <div className="mb-12 flex flex-col items-center lg:mb-16">
      <h1 className="mb-2 text-center text-5xl text-white lg:text-6xl">
        Experience{" "}
        <span className="font-extrabold">the Thrill of Auctions</span>
      </h1>
      <p className="font-medium">Have something to sell or bid on?</p>
      <p className="mb-6 font-medium">
        Start your auction or explore and bid now!
      </p>
      <Button asChild className="text-white">
        <Link to="/addAuction">Start an auction</Link>
      </Button>
    </div>
  );
}
