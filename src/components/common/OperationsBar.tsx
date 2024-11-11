import { useLocation, useSearchParams } from "react-router-dom";
import { Dispatch, ReactNode, SetStateAction } from "react";

import Organize from "../common/Organize";
import ViewChoice from "../common/ViewChoice";

const statusOptions = [
  { value: "all", content: "All statuses" },
  { value: "pending", content: "Pending" },
  { value: "rejected", content: "Rejected" },
  { value: "ongoing", content: "Ongoing" },
  { value: "finished", content: "Finished" },
  { value: "sold", content: "Sold" },
];

const sortOptions = [
  { value: "time", content: "Time" },
  { value: "alphabetically", content: "Alphabetically" },
];

const locationOptions = [
  { value: "all", content: "All locations" },
  { value: "location1", content: "Location 1" },
  { value: "location2", content: "Location 2" },
  { value: "location3", content: "Location 3" },
  { value: "location4", content: "Location 4" },
];

const priceOptions = [
  { value: "all", content: "All prices" },
  { value: "0-1000", content: "0 - 1000" },
  { value: "1000-2000", content: "1000 - 2000" },
  { value: "2000-3000", content: "2000 - 3000" },
  { value: "3000-4000", content: "3000 - 4000" },
  { value: "4000-5000", content: "4000 - 5000" },
];

type Props = {
  viewOptions: { type: string; style: string; icon: ReactNode }[];
  setViewType: Dispatch<SetStateAction<number>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

export default function OperationsBar({
  viewOptions,
  setViewType,
  setCurrentPage,
}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  function onChange(value: string, type: string) {
    if (value === "all" || value === "time") {
      searchParams.delete(type);
      return setSearchParams(searchParams);
    }

    searchParams.delete(type);
    searchParams.append(type, value);
    setSearchParams(searchParams);
    setCurrentPage(1);
  }

  function deleteParams() {
    for (let key of Array.from(searchParams.keys())) {
      if (key === "s") continue;
      searchParams.delete(key);
      setSearchParams(searchParams);
    }
  }

  return (
    <div
      key={searchParams.size}
      className="flex flex-col items-center gap-2 text-sm sm:flex-row sm:justify-between sm:gap-8"
    >
      <div className="flex items-center gap-4 sm:gap-8">
        <p className="shrink-0 font-medium text-textGraySecondary">
          Filter by:
        </p>
        {location.pathname === "/favourites" ||
        location.pathname === "/portfolio" ||
        location.pathname === "/search" ? (
          <Organize
            type="status"
            defaultValue={searchParams.get("status") || "all"}
            onChange={onChange}
            options={statusOptions}
          />
        ) : (
          <>
            <Organize
              type="location"
              defaultValue={searchParams.get("location") || "all"}
              onChange={onChange}
              options={locationOptions}
            />
            <Organize
              type="price"
              defaultValue={searchParams.get("price") || "all"}
              onChange={onChange}
              options={priceOptions}
            />
          </>
        )}
        {!!searchParams.size && (
          <button onClick={deleteParams} className="font-medium">
            Clear
          </button>
        )}
      </div>

      <div className="flex items-center gap-8">
        <p className="shrink-0 font-medium text-textGraySecondary">Sort by:</p>
        <Organize
          type="sort"
          defaultValue={searchParams.get("sort") || "time"}
          onChange={onChange}
          options={sortOptions}
        />
        <ViewChoice options={viewOptions} onClick={setViewType} />
      </div>
    </div>
  );
}
