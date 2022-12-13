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
    <div className="flex flex-col">
      <div className="flex gap-3 items-center justify-center">
        <button
          onClick={onPrevious}
          className="cursor-pointer bg-blue-600 p-3 text-white rounded"
        >
          Prev
        </button>
        <span className="text-[18px] font-bold">
          {currentPage} / {totalCount ? totalCount : 1}
        </span>
        <button
          onClick={onNext}
          className="cursor-pointer bg-blue-600 p-3 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};
