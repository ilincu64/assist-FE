import { MoveLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export const UpcomingNavigator = () => {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <Link to="/" className="flex flex-row items-center gap-4">
        <MoveLeft />
        <p>Go back to Homepage</p>
      </Link>
      <Link to="/addAuction">
        <Button variant="outline">Start an auction</Button>
      </Link>
    </div>
  );
};
