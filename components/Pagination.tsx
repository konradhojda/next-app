interface IPagination {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (value: number) => void;
}

export const Pagination = ({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
}: IPagination) => {
  const onNext = () => {
    if (totalCount !== currentPage) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };
  return (
    <>
      <div className="flex gap-3">
        <button onClick={onPrevious} className="cursor-pointer">
          Prev
        </button>
        <span>{currentPage}</span>
        <button onClick={onNext} className="cursor-pointer">
          Next
        </button>
      </div>
      <p className="mt-3">Number of pages {totalCount}</p>
    </>
  );
};
