import { ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface NavigationComponentProps {
  home: boolean;
}

const NavigationComponent = ({ home }: NavigationComponentProps) => {
  return (
    <div className="flex flex-row gap-4">
      <Link className="underline" to="/">
        Home
      </Link>
      {!home ? (
        <>
          <ChevronRight />
          <Link className="underline" to="/portfolio">
            Lists
          </Link>
        </>
      ) : (
        <></>
      )}
      <ChevronRight />
      <p>Auction Page</p>
    </div>
  );
};

export default NavigationComponent;
