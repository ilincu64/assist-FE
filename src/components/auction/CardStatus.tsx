import React from "react";

interface CardStatusProps {
  status: string;
  startingTime?: Date;
  startPrice?: number;
}

const CardStatus = ({ status, startingTime, startPrice }: CardStatusProps) => {
  const now = new Date();

  const statusValue = () => {
    switch (status) {
      case "FINISHED":
        return (
          <p className="rounded-full bg-gray-800 px-4 text-white">FINISHED</p>
        );
      case "REJECTED":
        return <p className="rounded-full bg-gray-200 px-4">REJECTED</p>;
      case "PENDING":
        return (
          <p className="rounded-full bg-orange-400 px-4 text-white">PENDING</p>
        );
      case "ONGOING":
        return (
          <p className="rounded-full bg-blue-700 px-4 text-white">ONGOING</p>
        );
      case "ACCEPTED":
        return (
          <p className="rounded-full bg-pink-700 px-4 text-white">UPCOMING</p>
        );

      default:
        return <p></p>;
    }
  };
  return (
    <div className="flex h-6 w-full flex-row justify-between">
      {statusValue()}
      <p>Starting at ${startPrice}</p>
    </div>
  );
};

export default CardStatus;
