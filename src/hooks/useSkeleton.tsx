import GameCardSkeleton from "@/elements/gameCardSkeleton/gameCardSkeleton";

const useSkeleton = (amount: number): JSX.Element[] => {
  const skeletons = [...Array(amount)].map((_, id) => (
    // eslint-disable-next-line react/no-array-index-key
    <GameCardSkeleton key={id} />
  ));

  return skeletons;
};

export default useSkeleton;
