type Props = {
  isFound: boolean;
  result: string | number | null;
};

export default function SearchOverview({ isFound, result }: Props) {
  return (
    <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
      <h2 className="text-xl font-medium lg:text-2xl">
        {isFound
          ? `We found ${result} result matching your search.`
          : `We haven’t found anything to match "${result}"`}
      </h2>
      <p className="">
        {isFound
          ? "Try another keywords if you did not find what you need or browse our upcoming auctions."
          : "Try another keywords or browse our upcoming auctions."}
      </p>
    </div>
  );
}
