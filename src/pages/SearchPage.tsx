import useSWR from "swr";
import { useSearchParams } from "react-router-dom";

import Loader from "../components/common/Loader";
import SearchResults from "../components/search/SearchResults";
import SearchOverview from "../components/search/SearchOverview";
import SearchNotFound from "../components/search/SearchNotFound";

import { AuctionApi } from "../api/AuctionApi";
import { useState } from "react";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const url = `?page=${currentPage}&page_size=${4}${searchParams.get("s") ? `&title=${searchParams.get("s")?.toLowerCase()}` : ""}${searchParams.get("status") ? `&status=${searchParams.get("status")?.toUpperCase()}` : ""}`;
  const { data, isLoading, error } = useSWR(
    url ? url : null,
    AuctionApi.searchAuction,
  );

  if (isLoading) {
    return (
      <div className="flex h-auto w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error)
    return (
      <div className="flex h-auto w-full items-center justify-center">
        Something went wrong...
      </div>
    );

  return (
    <div
      key={searchParams.size}
      className="flex h-auto w-full flex-col px-4 py-4 sm:py-8 md:px-8 lg:px-12"
    >
      {data && (
        <div className="flex h-full w-full flex-col">
          <div className="mb-6">
            <SearchOverview
              isFound={
                data.auctions.length > 0 || searchParams.get("status")
                  ? true
                  : false
              }
              result={
                data.auctions.length > 0 || searchParams.get("status")
                  ? data.auctions.length
                  : searchParams.get("s")
              }
            />
          </div>
          {data.count > 0 || searchParams.get("status") ? (
            <SearchResults
              data={data}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          ) : (
            <SearchNotFound />
          )}
        </div>
      )}
    </div>
  );
}
